import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const skills = await prisma.skill.findMany();
    return Response.json({ skills }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, name, level, majorId } = await req.json();

    const skill = await prisma.skill.create({
      data: {
        id,
        name,
        level,
        majorId,
      },
    });

    return NextResponse.json(skill);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const deleted = await prisma.skill.delete({ where: { id } });
    return Response.json({ deleted }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'failed to delete the skil' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, name, level, majorId } = await req.json();

    const updaded = await prisma.skill.update({
      where: { id },
      data: { name, level, majorId },
    });
    return Response.json({ updaded }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: 'failed to updade the skill' },
      { status: 500 },
    );
  }
}
