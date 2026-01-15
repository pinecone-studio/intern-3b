import { prisma } from '@/lib/prisma';

import bcrypt from 'bcrypt';

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });
    return Response.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to create user' }, { status: 500 });
  }
};
