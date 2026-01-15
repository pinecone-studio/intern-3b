import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return Response.json({ error: 'Not matching' }, { status: 401 });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
    return Response.json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
};
