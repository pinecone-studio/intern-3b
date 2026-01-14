import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.progress.findMany({
      include: { User: { select: { id: true, email: true } }, Skill: true },
    });
    return Response.json(items);
  } catch {
    return Response.json(
      { error: 'Failed to fetch progress' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body?.userId;
    const skillId = body?.skillId;
    const percent = body?.percent;

    if (typeof userId !== 'string' || typeof skillId !== 'string') {
      return Response.json(
        { error: 'userId and skillId are required' },
        { status: 400 },
      );
    }

    const p = typeof percent === 'number' ? percent : 0;
    if (p < 0 || p > 100)
      return Response.json(
        { error: 'percent must be 0...100' },
        { status: 400 },
      );

    const saved = await prisma.progress.upsert({
      where: { userId_skillId: { userId, skillId } },
      update: { percent: p },
      create: { userId, skillId, percent: p },
    });
    return Response.json(saved, { status: 201 });
  } catch (e: any) {
    return Response.json({ error: 'Failed to save progress' }, { status: 500 });
  }
}
