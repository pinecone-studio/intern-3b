import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'no file uploaded' }, { status: 400 });
    }

    const urls: string[] = [];

    for (const f of files) {
      if (!f || f.size === 0) continue;
      if (!f.type.startsWith('image/')) continue;

      const blob = await put(`docs/${crypto.randomUUID()}-${f.name}`, f, {
        access: 'public',
        contentType: f.type,
      });

      urls.push(blob.url);
    }

    return NextResponse.json({ urls }, { status: 200 });
  } catch (error) {
    console.error(error, ':Error');
    return NextResponse.json({ error: 'upload failed' }, { status: 500 });
  }
}
