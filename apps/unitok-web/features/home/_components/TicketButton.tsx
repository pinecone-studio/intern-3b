'use client';

import { Button } from '@intern-3b/shadcn';
import { Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const TicketButton = ({ url }: { url: string }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => router.replace(url)}
      className="flex items-center gap-1.5 px-2 py-1 cursor-pointer"
    >
      <Ticket className="h-4 w-4" />
      <span className="text-sm font-semibold">
        {/* {currentTickets} */} 44!!
      </span>
    </Button>
  );
};

export default TicketButton;
