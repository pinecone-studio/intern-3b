import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const deleteModule = await prisma.module.delete({
      where: { id },
    });
    return NextResponse.json(deleteModule, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete module' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await request.json();

    const updateModule = await prisma.module.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updateModule, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update module' },
      { status: 500 },
    );
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const module = await prisma.module.findUnique({
      where: { id },
      include: { subModules: true },
    });
    return NextResponse.json(module);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch module' }, { status: 500 });
  }
}
