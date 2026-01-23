import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    console.log('Login request body:', body);

    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { error: 'Имэйл болон нууц үгээ оруулна уу' },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('User not found:', email);
      return Response.json(
        { error: 'Имэйл эсвэл нууц үг буруу' },
        { status: 401 },
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.log('Password mismatch for user:', email);
      return Response.json(
        { error: 'Имэйл эсвэл нууц үг буруу' },
        { status: 401 },
      );
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    console.log('Login success:', { userId: user.id });
    return Response.json({ token, userId: user.id });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
};
