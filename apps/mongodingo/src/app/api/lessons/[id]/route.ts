import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: 'Lesson id missing' }, { status: 400 });
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  if (!lesson) {
    return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
  }

  return NextResponse.json(lesson);
}
