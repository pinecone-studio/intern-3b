import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Lesson name is required' },
        { status: 400 },
      );
    }

    // 404 шалгалт
    const exists = await prisma.lesson.findUnique({ where: { id } });
    if (!exists) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

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
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;

    // 404 шалгалт
    const exists = await prisma.lesson.findUnique({ where: { id } });
    if (!exists) {
      return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
    }

    const deletedLesson = await prisma.lesson.delete({
      where: { id },
    });

    return NextResponse.json(
      { data: deletedLesson, message: 'Lesson deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Delete Lesson Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete lesson' },
      { status: 500 },
    );
  }
}
