import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export const runtime = 'nodejs';

type HealthPayload = {
  ok: boolean;
  service: string;
  database: 'connected' | 'unavailable';
  checkedAt: string;
  departmentCount?: number;
  error?: string;
};

export async function GET() {
  const checkedAt = new Date().toISOString();

  try {
    const departmentCount = await prisma.department.count();
    const body: HealthPayload = {
      ok: true,
      service: 'docsprint',
      database: 'connected',
      checkedAt,
      departmentCount,
    };

    return NextResponse.json(body, { status: 200 });
  } catch (error) {
    const body: HealthPayload = {
      ok: false,
      service: 'docsprint',
      database: 'unavailable',
      checkedAt,
      error: error instanceof Error ? error.message : 'Unknown database error',
    };

    return NextResponse.json(body, { status: 503 });
  }
}
