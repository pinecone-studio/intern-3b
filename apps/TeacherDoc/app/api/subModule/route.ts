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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, moduleId } = body;

    if (!name || !moduleId) {
      return NextResponse.json(
        { error: 'Missing name or moduleId' },
        { status: 400 },
      );
    }

    const newSubModule = await prisma.subModule.create({
      data: { name, moduleId },
    });

    return NextResponse.json(
      { data: newSubModule, message: 'Submodule created successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Create SubModule Error:', error);
    return NextResponse.json(
      { error: 'Failed to create submodule' },
      { status: 500 },
    );
  }
}
