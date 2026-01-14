import { prisma } from '@/lib/prisma';

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const item = await prisma.progress.findUnique({
      where: { id },
      include: { User: { select: { id: true, email: true } }, Skill: true },
    });
    if (!item) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json(item);
  } catch {
    return Response.json(
      { error: 'Failed to fetch progress' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();

    const data: any = {};
    if (typeof body?.percent === 'number') {
      if (body.percent < 0 || body.percent > 100) {
        return Response.json(
          { error: 'percent must be 0..100' },
          { status: 400 },
        );
      }
      data.percent = body.percent;
    }

    const updated = await prisma.progress.update({ where: { id }, data });
    return Response.json(updated);
  } catch {
    return Response.json(
      { error: 'Failed to update progress' },
      { status: 500 },
    );
  }
}
