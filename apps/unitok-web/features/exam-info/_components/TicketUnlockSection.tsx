"use client"

import { Button } from "@intern-3b/shadcn"
import { Ticket } from "lucide-react"


type TicketUnlockSectionProps = {
  onUnlock: () => void
}

export function TicketUnlockSection({ onUnlock }: TicketUnlockSectionProps) {
  return (
    <div className="px-4 py-3 border-t border-border/50 bg-muted/20">
      <div className="flex items-center gap-2 mb-1">
        <Ticket className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-semibold text-foreground">5 оноо шаардлагатай</span>
      </div>
      <p className="text-xs text-muted-foreground mb-3">Дэлгэрэнгүй мэдээлэл үзэхэд</p>
      <Button onClick={onUnlock} variant="secondary" size="sm" className="w-full cursor-pointer">
        Нээх
      </Button>
    </div>
  )
}
