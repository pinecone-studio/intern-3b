import { Button } from '@intern-3b/shadcn';
import { Ticket } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';

const TicketButton = () => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => redirect('/tickets')}
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
