import { prisma } from '@/lib/prisma';

export const GET = async (req: Request) => {
  try {
    const lessons = await prisma.lesson.findMany();
    return Response.json({ lessons }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const { title, content, xp, skillId } = await req.json();
    const lesson = await prisma.lesson.create({
      data: {
        title,
        content,
        xp,
        skillId,
      },
    });
    return Response.json({ lesson }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'failed to post lesson' }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json();
    const deleted = await prisma.lesson.delete({ where: { id } });
    return Response.json({ deleted }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'failed to delete lesson' }, { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const { id, title, content, xp, skillId } = await req.json();
    const updated = await prisma.lesson.update({
      where: { id },
      data: {
        title,
        content,
        xp,
        skillId,
      },
    });
    return Response.json({ updated }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'failed to updade lesson' }, { status: 500 });
  }
};
