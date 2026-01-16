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

    const updatedSubModule = await prisma.subModule.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      { data: updatedSubModule, message: 'Submodule updated successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Update SubModule Error:', error);
    return NextResponse.json(
      { error: 'Failed to update submodule' },
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

    const deletedSubModule = await prisma.subModule.delete({
      where: { id },
    });

    return NextResponse.json(
      { data: deletedSubModule, message: 'Submodule deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Delete SubModule Error:', error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        { error: 'Submodule not found' },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { error: 'Failed to delete submodule' },
      { status: 500 },
    );
  }
}
