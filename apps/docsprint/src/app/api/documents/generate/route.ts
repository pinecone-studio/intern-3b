import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { prisma } from '../../../lib/prisma';

export const runtime = 'nodejs';

const DEFAULT_ADMIN_EMAIL = 'admin@docsprint.local';

async function resolveActorId(actorId: unknown) {
  const id = typeof actorId === 'string' ? actorId.trim() : '';

  if (id) {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (existing) return existing.id;
  }

  const defaultUser = await prisma.user.upsert({
    where: { email: DEFAULT_ADMIN_EMAIL },
    update: { isActive: true },
    create: {
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash: 'system-seeded-user',
      role: 'ADMIN',
      isActive: true,
    },
  });

  return defaultUser.id;
}

function toPdfSafe(value: unknown) {
  return String(value ?? '-')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[^\x20-\x7E]/g, '?');
}

function documentTitle(docType: string) {
  switch (docType) {
    case 'EMPLOYMENT_CONTRACT':
      return 'EMPLOYMENT CONTRACT';
    case 'NDA':
      return 'NON-DISCLOSURE AGREEMENT';
    case 'HIRING_ORDER':
      return 'HIRING ORDER';
    case 'JOB_DESCRIPTION':
      return 'JOB DESCRIPTION';
    default:
      return 'EMPLOYEE DOCUMENT';
  }
}

export async function POST(req: NextRequest) {
  const { employeeId, docType = 'EMPLOYMENT_CONTRACT', generatedById } =
    await req.json();

  if (!employeeId) {
    return NextResponse.json({ error: 'employeeId is required' }, { status: 400 });
  }

  const emp = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: { department: true },
  });
  if (!emp) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
  }

  const actorId = await resolveActorId(generatedById);
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);

  const fullName = `${emp.lastName} ${emp.firstName}`.trim();
  const dept = emp.department?.name ?? '-';

  page.drawText(documentTitle(docType), { x: 60, y: 810, size: 18, font });

  let y = 780;
  const draw = (label: string, value: unknown) => {
    page.drawText(`${label}: ${toPdfSafe(value)}`, { x: 60, y, size: 12, font });
    y -= 20;
  };

  draw('Employee', fullName);
  draw('Register No', emp.regNo);
  draw('Email', emp.email);
  draw('Position', emp.position);
  draw('Department', dept);
  draw('Start date', new Date(emp.startDate).toLocaleDateString());
  draw('Contract type', emp.contractType);
  draw('Salary', emp.salary ?? '-');

  const bytes = await pdf.save();
  const filePath = `generated://${docType}/${emp.id}/${Date.now()}.pdf`;

  const doc = await prisma.generatedDocument.create({
    data: {
      employeeId: emp.id,
      docType,
      filePath,
      generatedById: actorId,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: actorId,
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
      'Content-Disposition': `attachment; filename="${docType}_${emp.id}.pdf"`,
    },
  });
}
