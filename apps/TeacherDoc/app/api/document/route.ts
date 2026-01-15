import prismaClient from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

const prisma = prismaClient;

export async function GET() {
  try {
    const documents = await prisma.document.findMany();
    return NextResponse.json(documents, { status: 200 });
  } catch (error) {
    console.error('Fetch Documents Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { richText, subModuleId, moduleId, teacherId } = body;

    if (!richText || !subModuleId || !moduleId || !teacherId) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: richText, subModuleId, moduleId, or teacherId',
        },
        { status: 400 },
      );
    }

    const newDocument = await prisma.document.create({
      data: {
        richText,
        subModuleId,
        moduleId,
        teacherId,
      },
    });

    return NextResponse.json(
      { data: newDocument, message: 'Document created successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Create Document Error:', error);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 },
    );
  }
}
