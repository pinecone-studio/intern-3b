import { prisma } from '@/lib/prisma';

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const item = await prisma.studyPath.findUnique({
      where: { id },
      include: { Major: true },
    });
    if (!item) return Response.json({ error: 'Not Found' }, { status: 404 });
    return Response.json(item);
  } catch {
    return Response.json(
      { error: 'Failed to fetch study path' },
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
    if (typeof body?.title === 'string') data.title = body.title;
    if (typeof body?.location === 'string') data.location = body.location;
    if (typeof body?.duration === 'string') data.duration = body.duration;
    if (typeof body?.requirements === 'string')
      data.requirements = body.requirements;
    if (typeof body?.majorId === 'string') data.majorId = body.majorId;

    const updated = await prisma.studyPath.update({ where: { id }, data });
    return Response.json(updated);
  } catch {
    return Response.json(
      { error: 'Failed to update study path' },
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
    const deleted = await prisma.studyPath.delete({ where: { id } });
    return Response.json(deleted);
  } catch {
    return Response.json(
      { error: 'Failed to delete study path' },
      { status: 500 },
    );
  }
}
