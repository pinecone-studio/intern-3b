import prismaClient from '@/lib/prismaClient';
import { NextResponse } from 'next/server';



const prisma = prismaClient;

export async function GET() {

  try {
    const modules = await prisma.module.findMany();
    return NextResponse.json(modules, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, semesterId, lessonId, gradeId } = body;
    const newModule = await prisma.module.create({
      data: {
      name,
      semesterId,
      lessonId,
      gradeId
      }
    })
return NextResponse.json(newModule, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
  }}
