import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const subject = searchParams.get("subject");
    const grade = searchParams.get("grade");
    const term = searchParams.get("term");

    const modules = await prisma.module.findMany({
      where: {
        lessonId: subject || undefined,
        gradeId: grade || undefined,
        semesterId: term || undefined,
      },
      include: {
        subModules: true,
      },
    });

    return NextResponse.json(modules);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch modules" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, lessonId, gradeId, semesterId } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

   
    const newModule = await prisma.module.create({
      data: {
        name,
        lessonId,
        gradeId,
        semesterId,
      },
      include: {
        subModules: true,
      },
    });

    return NextResponse.json(newModule);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to add module" }, { status: 500 });
  }
}