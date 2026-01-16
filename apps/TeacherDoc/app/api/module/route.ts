import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const modules = await prisma.module.findMany();
    return NextResponse.json(modules, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch modules' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, semesterId, lessonId, gradeId } = body;
    const newModule = await prisma.module.create({
      data: {
        name,
        semesterId,
        lessonId,
        gradeId,
      },
    });
    return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create module' },
      { status: 500 },
    );
  }
}
