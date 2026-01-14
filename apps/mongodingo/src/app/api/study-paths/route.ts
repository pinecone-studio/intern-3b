import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.studyPath.findMany({
      orderBy: { id: 'desc' },
      include: { Major: true },
    });
    return Response.json(items);
  } catch {
    return Response.json(
      { error: 'Failed to fetch study paths' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body?.title;
    const duration = body?.duration;
    const requirements = body?.requirements;
    const majorId = body?.majorId;

    if (
      ![title, location, duration, requirements, majorId].every(
        (v) => typeof v === 'string' && v.length > 0,
      )
    ) {
      return Response.json(
        {
          error:
            'title, location, duration, requirements, majorId are required!',
        },
        { status: 400 },
      );
    }

    const created = await prisma.studyPath.create({
      data: { title, location, duration, requirements, majorId },
    });
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json(
      { error: 'Failed to create study path' },
      { status: 500 },
    );
  }
}
