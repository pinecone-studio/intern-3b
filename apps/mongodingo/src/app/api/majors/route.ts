import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const res = await prisma.major.findMany();
    return Response.json({ res }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      name,
      category,
      description,
      suitableFor,
      advantages,
      challenges,
      demandLevel,
      futureScope,
    } = await req.json();
    const major = await prisma.major.create({
      data: {
        name,
        category,
        description,
        suitableFor,
        advantages,
        challenges,
        demandLevel,
        futureScope,
      },
    });
    return Response.json(major, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
}

export const DELETE = async (req: Request) => {
  const { id } = await req.json();
  try {
    const deleted = await prisma.major.delete({ where: { id } });
    return Response.json({ deleted }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
};

export const PATCH = async (req: Request) => {
  try {
    const {
      id,
      name,
      category,
      description,
      suitableFor,
      advantages,
      challenges,
      demandLevel,
      futureScope,
    } = await req.json();
    const updaded = await prisma.major.update({
      where: { id },
      data: {
        name,
        category,
        description,
        suitableFor,
        advantages,
        challenges,
        demandLevel,
        futureScope,
      },
    });
    return Response.json({ updaded }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error }, { status: 500 });
  }
};
