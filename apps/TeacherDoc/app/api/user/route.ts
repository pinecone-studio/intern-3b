import prismaClient from '@/lib/prismaClient';
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

const prisma = prismaClient;

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        lessonId: true,
        schoolId: true,
        number: true,
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error('Fetch Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, lessonId, password, schoolId, number } = body;

    if (!name || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        role,
        lessonId,
        password,
        schoolId,
        number: number ? parseInt(number.toString()) : null,
      },
    });

    return NextResponse.json(
      { data: newUser, message: 'User created successfully' },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error('User Create Error:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'This number is already registered!' },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 },
    );
  }
}
