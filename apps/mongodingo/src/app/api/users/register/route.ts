import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Register request body:', body);

    const { email, password, majorId } = body;

    if (!email || !password) {
      console.log('Missing fields:', { email, password });
      return NextResponse.json(
        { error: 'Бүх талбарыг бөглөнө үү' },
        { status: 400 },
      );
    }

    // check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Имэйл аль хэдийн бүртгэгдсэн байна' },
        { status: 400 },
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(), // автомат id үүсгэнэ
        email,
        password: hashedPassword,
        majorId: majorId || null,
      },
    });

    console.log('User created:', newUser.id);
    return NextResponse.json({ id: newUser.id, email: newUser.email });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Register failed' }, { status: 500 });
  }
}
