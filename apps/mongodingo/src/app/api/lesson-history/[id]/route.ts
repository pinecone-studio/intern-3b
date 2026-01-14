import { prisma } from '@/lib/prisma';

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const item = await prisma.lessonHistory.findUnique({
      where: { id },
      include: {
        User: { select: { id: true, email: true } },
        Lesson: true,
      },
    });
    if (!item) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(item);
  } catch {
    return Response.json(
      { error: 'Failed to fetch lesson history' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const deleted = await prisma.lessonHistory.delete({ where: { id } });
    return Response.json(deleted);
  } catch {
    return Response.json(
      { error: 'Failed to delete lesson history' },
      { status: 500 },
    );
  }
}
