'use client';

import { Button } from '@intern-3b/shadcn';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const BackButton = ({ url }: { url: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.replace(url)}
      className="-ml-2 cursor-pointer"
      aria-label="Буцах"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;
