import { Button } from '@intern-3b/shadcn';
import { Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const TicketButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.replace('/ticket-history')}
      className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/30 hover:bg-accent/50 active:bg-accent transition-colors"
    >
      <Ticket className="h-4 w-4 text-foreground" />
      <span className="text-sm font-semibold text-foreground">
        44
        {/* {currentTickets} */}
      </span>
    </Button>
  );
};

export default TicketButton;
