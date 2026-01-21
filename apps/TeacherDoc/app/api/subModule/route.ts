import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const subModules = await prisma.subModule.findMany();
    return NextResponse.json(subModules, { status: 200 });
  } catch (error) {
    console.error('Fetch SubModules Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submodules' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { moduleId, name } = await req.json();

    if (!moduleId || !name) {
      return NextResponse.json({ error: "moduleId болон name шаардлагатай" }, { status: 400 });
    }

    const newSubModule = await prisma.subModule.create({
      data: {
        name,
        moduleId,
      },
    });

    return NextResponse.json(newSubModule);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "subModule нэмэхэд алдаа гарлаа" }, { status: 500 });
  }
}
