import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.careerOpportunity.findMany({
      include: { Major: true },
    });
    return Response.json(items);
  } catch {
    return Response.json(
      { error: 'Failed to fetch career opportunities' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { id, title, level, type, salaryMN, salaryINT, majorId } =
      await req.json();

    const created = await prisma.careerOpportunity.create({
      data: {
        id,
        title,
        level,
        type,
        salaryMN,
        salaryINT,
        majorId,
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}