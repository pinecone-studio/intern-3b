import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '../../../../generated/prisma';
import { prisma } from '../../../../lib/prisma';

export const runtime = 'nodejs';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const deleteUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { data: deleteUser, message: 'User deleted successfully' },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Delete Error:', error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Internal server error during deletion' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // number parse (nullable/required аль нь ч байсан safe)
    if (
      body.number !== undefined &&
      body.number !== null &&
      body.number !== ''
    ) {
      const n = Number(body.number);
      if (!Number.isInteger(n)) {
        return NextResponse.json({ error: 'Invalid number' }, { status: 400 });
      }
      body.number = n;
    } else {
      // Хэрвээ schema дээр number REQUIRED байвал энэ мөрийг УСТГА (null өгч болохгүй)
      delete body.number;
    }

    const updateUser = await prisma.user.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      { data: updateUser, message: 'User updated successfully' },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Update Error:', error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return NextResponse.json(
        { error: 'The provided number is already in use' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: 'Internal server error during update' },
      { status: 500 },
    );
  }
}
