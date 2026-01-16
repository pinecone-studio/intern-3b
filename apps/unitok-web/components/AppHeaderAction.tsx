'use client';

import { Search, Ticket } from 'lucide-react';
import { Button } from '@intern-3b/shadcn';

import { Dispatch, SetStateAction } from 'react';
import { ThemeToggleButton } from './ThemeToggleButton';
import { IconButton } from './IconButton';

const AppHeaderAction = ({
  setCurrentPage,
  currentTickets,
}: {
  setCurrentPage: Dispatch<SetStateAction<'home' | 'search' | 'ticketHistory'>>;
  currentTickets: number;
}) => {
  return (
    <>
      <Button
        onClick={() => setCurrentPage('ticketHistory')}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/30 hover:bg-accent/50 active:bg-accent transition-colors"
      >
        <Ticket className="h-4 w-4 text-foreground" />
        <span className="text-sm font-semibold text-foreground">
          {currentTickets}
        </span>
      </Button>
      <ThemeToggleButton />
      <IconButton
        icon={<Search className="h-5 w-5" />}
        label="Хайх"
        onClick={() => setCurrentPage('search')}
      />
    </>
  );
};

export default AppHeaderAction;
