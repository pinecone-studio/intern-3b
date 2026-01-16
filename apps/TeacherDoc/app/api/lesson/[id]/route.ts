import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name } = body;

    const updatedLesson = await prisma.lesson.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(
      { data: updatedLesson, message: 'Lesson updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Update Lesson Error:', error);
    return NextResponse.json(
      { error: 'Failed to update lesson' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const deletedLesson = await prisma.lesson.delete({
      where: { id },
    });

    return NextResponse.json(
      { data: deletedLesson, message: 'Lesson deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Delete Lesson Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 },
    );
  }
}
