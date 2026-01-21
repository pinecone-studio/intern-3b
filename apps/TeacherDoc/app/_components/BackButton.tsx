'use client';

import { Button } from '@/app/_components/ui/buttton';
import { useRouter } from 'next/navigation';

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
