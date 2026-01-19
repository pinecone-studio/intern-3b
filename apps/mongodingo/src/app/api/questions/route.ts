import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get('lessonId');

  if (!lessonId) {
    return NextResponse.json({ error: 'lessonId required' }, { status: 400 });
  }

  const questions = await prisma.question.findMany({
    where: { lessonId },
    include: {
      answers: true,
    },
    orderBy: { id: 'asc' },
  });

  return NextResponse.json(questions);
}

export async function POST(req: Request) {
  const { lessonId, question, questionMn, code, answers } = await req.json();

  const created = await prisma.question.create({
    data: {
      lessonId,
      question,
      questionMn,
      code,
      answers: {
        create: answers.map((a: any) => ({
          text: a.text,
          textMn: a.textMn,
          isCorrect: a.isCorrect,
        })),
      },
    },
    include: { answers: true },
  });

  return NextResponse.json(created);
}
