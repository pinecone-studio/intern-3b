'use client';
import { redirect } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';
import { TicketHistoryItemRow } from './_components/TicketHistoryItemRow';
import { calculateTotalTickets, mockTicketHistory } from '@/lib/constants';

export default function TicketHistory() {
  const totalTickets = calculateTotalTickets(mockTicketHistory);

  const handleBack = () => {
    redirect('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 bg-card border-b border-border">
        <button
          onClick={handleBack}
          className="p-2 -ml-2 rounded-lg hover:bg-accent active:bg-accent/80 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-semibold text-foreground">
          Үнэлгээний тасалбар
        </h1>
        <button
          onClick={handleBack}
          className="p-2 -mr-2 rounded-lg hover:bg-accent active:bg-accent/80 transition-colors"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>
      </header>

      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <span className="text-sm text-foreground">Миний тасалбарын түүх</span>
        <span className="text-sm text-muted-foreground">
          Нийт тасалбар{' '}
          <span className="font-semibold text-primary">{totalTickets}</span>
        </span>
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border">
          {mockTicketHistory.map((item) => (
            <TicketHistoryItemRow key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
}
