import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.lessonHistory.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        User: { select: { id: true, email: true } },
        Lesson: true,
      },
    });
    return Response.json(items);
  } catch {
    return Response.json(
      { error: 'Failed to fetch lesson history' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = body?.userId;
    const lessonId = body?.lessonId;

    if (typeof userId !== 'string' || typeof lessonId !== 'string') {
      return Response.json(
        { error: 'userId and lessonId are required (string)' },
        { status: 400 },
      );
    }

    // Create or return existing (avoid duplicates)
    const saved = await prisma.lessonHistory.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {}, // no changes needed
      create: { userId, lessonId },
    });

    return Response.json(saved, { status: 201 });
  } catch {
    return Response.json(
      { error: 'Failed to create lesson history' },
      { status: 500 },
    );
  }
}
