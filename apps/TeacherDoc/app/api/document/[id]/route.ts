import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';


export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedDocument = await prisma.document.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      { data: updatedDocument, message: 'Document updated successfully' },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Update Document Error:', error);
    return NextResponse.json(
      { error: 'Failed to update document' },
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

    const deletedDocument = await prisma.document.delete({
      where: { id },
    });

    return NextResponse.json(
      { data: deletedDocument, message: 'Document deleted successfully' },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Delete Document Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: 'Document not found' },
          { status: 404 },
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 },
    );
  }
}
