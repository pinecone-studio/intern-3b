'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/buttton';

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:underline"
    >
      ← Буцах
    </Button>
  );
}
