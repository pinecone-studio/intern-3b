import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.careerOpportunity.findMany({
      include: { Major: true },
    });
    return Response.json(items);
  } catch {
    return Response.json(
      { error: 'Failed to fetch career opportunities' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body?.title;
    const level = body?.level;
    const type = body?.type;
    const salaryMN = body?.salaryMN;
    const salaryINT = body?.salaryINT;
    const majorId = body?.majorId;

    if (
      ![title, level, type, salaryMN, salaryINT, majorId].every(
        (v) => typeof v === 'string' && v.length > 0,
      )
    ) {
      return Response.json(
        {
          error:
            'title, level, type, salaryMN, salaryINT, majorId are required',
        },
        { status: 400 },
      );
    }

    const allowed = ['FREELANCE', 'REMOTE', 'STARTUP'];
    if (!allowed.includes(type)) {
      return Response.json(
        { error: `type must be one of ${allowed.join(', ')}` },
        { status: 400 },
      );
    }

    const created = await prisma.careerOpportunity.create({
      data: { title, level, type, salaryMN, salaryINT, majorId },
    });
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json(
      { error: 'Failed to create career opportunity' },
      { status: 500 },
    );
  }
}
