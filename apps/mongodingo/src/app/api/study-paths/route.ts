import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const items = await prisma.studyPath.findMany({
      orderBy: { id: 'desc' },
      include: { Major: true },
    });
    return Response.json(items);
  } catch {
    return Response.json(
      { error: 'Failed to fetch study paths' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { id, title, location, duration, requirements, majorId } =
      await req.json();

    const created = await prisma.studyPath.create({
      data: {
        id,
        title,
        location,
        duration,
        requirements,
        majorId,
      },
    });

    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
