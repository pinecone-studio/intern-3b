import prismaClient from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

const prisma = prismaClient;

export async function GET() {
  try {
    const lessons = await prisma.lesson.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(lessons, { status: 200 });
  } catch (error) {
    console.error('Fetch Lessons Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Lesson name is required' },
        { status: 400 },
      );
    }

    const newLesson = await prisma.lesson.create({
      data: { name },
    });

    return NextResponse.json(
      { data: newLesson, message: 'Lesson created successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Create Lesson Error:', error);
    return NextResponse.json(
      { error: 'Failed to create lesson' },
      { status: 500 },
    );
  }
}
