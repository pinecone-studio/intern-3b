import { TicketHistoryItem } from "../types";

interface TicketHistoryItemRowProps {
  item: TicketHistoryItem;
}

function formatTimestamp(date: Date) {
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export function TicketHistoryItemRow({ item }: TicketHistoryItemRowProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span
        className={`text-sm font-semibold w-12 ${item.amount > 0 ? 'text-primary' : 'text-blue-500'}`}
      >
        {item.amount > 0 ? '+' : ''}
        {item.amount}
      </span>
      <span className="flex-1 text-sm text-foreground px-3">{item.reason}</span>
      <span className="text-xs text-muted-foreground">
        {formatTimestamp(item.timestamp)}
      </span>
    </div>
  );
}
