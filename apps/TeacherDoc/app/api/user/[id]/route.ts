import prismaClient from '@/lib/prismaClient';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

const prisma = prismaClient;

// --- DELETE: Delete user by ID ---
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const deleteUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        data: deleteUser,
        message: 'User deleted successfully',
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Delete Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: 'Internal server error during deletion' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.number) {
      body.number = parseInt(body.number.toString());
    }

    const updateUser = await prisma.user.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      {
        data: updateUser,
        message: 'User updated successfully',
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error('Update Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'The provided number is already in use' },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error during update' },
      { status: 500 },
    );
  }
}
