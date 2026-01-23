'use client';
import { Button } from '@intern-3b/shadcn';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CloseButton = ({ url }: { url: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.replace(url)}
      className="-mr-2 cursor-pointer"
      aria-label="Хаах"
    >
      <X className="h-5 w-5" />
    </Button>
  );
};

export default CloseButton;
