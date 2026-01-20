import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    const major = await prisma.major.findUnique({
      where: { id },
      include: {
        Skill: {
          include: {
            Lesson: true,
          },
        },
      },
    });

    if (!major) {
      return NextResponse.json({ error: 'Major not found' }, { status: 404 });
    }

    return NextResponse.json(major);
  } catch (err) {
    console.error('LEARN API ERROR ❌', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
