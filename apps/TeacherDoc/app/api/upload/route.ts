import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const image = formData.get('file') as File;

    if (!image) {
      return NextResponse.json({ error: 'no file uploaded' });
    }

    const blob = await put(`docs/${crypto.randomUUID()}-${image.name}`, image, {
      access: 'public',
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error(error, ':Error');
  }
};
