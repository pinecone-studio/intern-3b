
import BackButton from '../../components/buttons/BackButton';
import CloseButton from '../../components/buttons/CloseButton';
import { calculateTotalTickets, mockTicketHistory } from '../../lib/mock-data';
import { TicketHistoryItemRow } from './_components/TicketHistoryItemRow';


export default function TicketsPage() {
  const totalTickets = calculateTotalTickets(mockTicketHistory);

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <header className="sticky top-0 z-10 flex items-center justify-between h-14 px-4 bg-card border-b border-border">
        <BackButton url="/" />
        <h1 className="text-base font-semibold text-foreground">
          Үнэлгээний тасалбар
        </h1>
        <CloseButton url="/" />
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
