import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { employeeId, docType, generatedById } = await req.json();

  const emp = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: { department: true },
  });
  if (!emp)
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 });

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const title =
    docType === 'EMPLOYMENT_CONTRACT'
      ? 'ХӨДӨЛМӨРИЙН ГЭРЭЭ'
      : docType === 'NDA'
        ? 'НУУЦ ХАДГАЛАХ ГЭРЭЭ'
        : docType === 'HIRING_ORDER'
          ? 'АЖИЛД АВАХ ТУШААЛ'
          : 'АЖЛЫН БАЙРНЫ ТОДОРХОЙЛОЛТ';

  const fullName = `${emp.lastName} ${emp.firstName}`;
  const dept = emp.department?.name ?? '-';

  let y = 780;
  const draw = (t: string) => {
    page.drawText(t, { x: 60, y, size: 12, font });
    y -= 20;
  };

  page.drawText(title, { x: 60, y: 810, size: 18, font });
  draw(`Ажилтан: ${fullName}`);
  draw(`Регистр: ${emp.regNo}`);
  draw(`И-мэйл: ${emp.email}`);
  draw(`Албан тушаал: ${emp.position}`);
  draw(`Хэлтэс: ${dept}`);
  draw(`Эхлэх огноо: ${new Date(emp.startDate).toLocaleDateString()}`);
  draw(`Гэрээний төрөл: ${emp.contractType}`);
  draw(`Цалин: ${emp.salary ?? '-'}`);

  const bytes = await pdf.save();

  const filePath = `generated://${docType}/${emp.id}/${Date.now()}.pdf`;

  const doc = await prisma.generatedDocument.create({
    data: {
      employeeId: emp.id,
      docType,
      filePath,
      generatedById,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: generatedById,
      action: 'DOC_GENERATED',
      entityType: 'GeneratedDocument',
      entityId: doc.id,
      metadata: {
        employeeId: emp.id,
        employeeFirstName: emp.firstName,
        employeeLastName: emp.lastName,
        employeeRegNo: emp.regNo,
        docType,
      },
    },
  });

  return new NextResponse(Buffer.from(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${docType}_${emp.lastName}_${emp.firstName}.pdf"`,
    },
  });
}
