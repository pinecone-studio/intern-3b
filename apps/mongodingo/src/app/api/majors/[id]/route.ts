import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const major = await prisma.major.findUnique({
      where: { id: id },
      include: {
        Skill: {
          include: {
            Lesson: {
              include: {
                _count: {
                  select: { questions: true },
                },
              },
            },
          },
        },
      },
    });

    if (!major) {
      return Response.json({ error: 'Major not found' }, { status: 404 });
    }

    return Response.json({ major }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
