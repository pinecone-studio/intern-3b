// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const subModuleId = searchParams.get('subModuleId') || undefined;
//     const moduleId = searchParams.get('moduleId') || undefined;

//     const documents = await prisma.document.findMany({
//       where: {
//         ...(subModuleId ? { subModuleId } : {}),
//         ...(moduleId ? { moduleId } : {}),
//       },
//       orderBy: { id: 'desc' }, // createdAt байхгүй болохоор түр ингэж болно
//     });

//     return NextResponse.json(documents, { status: 200 });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       { error: 'Failed to fetch documents' },
//       { status: 500 },
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const form = await request.formData();

//     const title = String(form.get('title') ?? '').trim();
//     const richText = String(form.get('richText') ?? '').trim();
//     const subModuleId = String(form.get('subModuleId') ?? '').trim();
//     const moduleId = String(form.get('moduleId') ?? '').trim();

//     const teacherIdRaw = form.get('teacherId');
//     const teacherId =
//       typeof teacherIdRaw === 'string' && teacherIdRaw.trim()
//         ? teacherIdRaw.trim()
//         : null;

//     if (!title || !richText || !subModuleId || !moduleId) {
//       return NextResponse.json(
//         {
//           error:
//             'Missing required fields: title, richText, subModuleId, moduleId',
//         },
//         { status: 400 },
//       );
//     }

//     const newDoc = await prisma.document.create({
//       data: { title, richText, subModuleId, moduleId, teacherId, image: [] },
//     });

//     return NextResponse.json({ data: newDoc }, { status: 201 });
//   } catch (e) {
//     console.error(e);
//     return NextResponse.json(
//       { error: 'Failed to create document' },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subModuleId = searchParams.get('subModuleId') || undefined;
    const moduleId = searchParams.get('moduleId') || undefined;

    const documents = await prisma.document.findMany({
      where: {
        ...(subModuleId ? { subModuleId } : {}),
        ...(moduleId ? { moduleId } : {}),
      },
      orderBy: { id: 'desc' }, // createdAt байхгүй болохоор түр ингэж болно
    });

    return NextResponse.json(documents, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const title = String(body.title ?? '').trim();
    const richText = String(body.richText ?? '').trim();
    const subModuleId = String(body.subModuleId ?? '').trim();
    const moduleId = String(body.moduleId ?? '').trim();
    const teacherId = body.teacherId ? String(body.teacherId).trim() : null;

    const images = Array.isArray(body.images) ? body.images : []; // ✅ urls array

    if (!title || !richText || !subModuleId || !moduleId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const newDoc = await prisma.document.create({
      data: {
        title,
        richText,
        subModuleId,
        moduleId,
        teacherId,
        image: images, // ✅ schema чинь String[] байвал шууд болно
      },
    });

    return NextResponse.json({ data: newDoc }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Failed to create document' },
      { status: 500 },
    );
  }
}
