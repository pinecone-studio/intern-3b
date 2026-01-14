import { prisma } from '@/lib/prisma';

export async function GET(
  _: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await ctx.params;
    const item = await prisma.careerOpportunity.findUnique({
      where: { id },
      include: { Major: true },
    });
    if (!item) return Response.json({ error: 'Not Found' }, { status: 404 });
    return Response.json(item);
  } catch {
    return Response.json(
      { error: ' Failed to fetch career opportunity' },
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
    if (typeof body?.level === 'string') data.level = body.level;
    if (typeof body?.salaryMN === 'string') data.salaryMN = body.salaryMN;
    if (typeof body?.salaryINT === 'string') data.salaryINT = body.salaryINT;
    if (typeof body?.majorId === 'string') data.majorId = body.majorId;

    if (typeof body?.type === 'string') {
      const allowed = ['FREELANCE', 'REMOTE', 'STARTUP'];
      if (!allowed.includes(body.type)) {
        return Response.json(
          { error: `type must be one of ${allowed.join(', ')}` },
          { status: 400 },
        );
      }
      data.type = body.type;
    }

    const updated = await prisma.careerOpportunity.update({
      where: { id },
      data,
    });
    return Response.json(updated);
  } catch {
    return Response.json(
      { error: 'Failed to update career opportunity' },
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
    const deleted = await prisma.careerOpportunity.delete({ where: { id } });
    return Response.json(deleted);
  } catch {
    return Response.json(
      { error: 'Failed to delete career opportunity' },
      { status: 500 },
    );
  }
}
