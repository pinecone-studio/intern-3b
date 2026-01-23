"use client"

import { Star } from "lucide-react"

export function ReviewsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
      <Star className="h-12 w-12 text-muted-foreground/40 mb-3" />
      <h3 className="text-sm font-semibold text-foreground mb-1">Үнэлгээ байхгүй байна</h3>
      <p className="text-xs text-muted-foreground">Эхний үнэлгээг та бичиж болно</p>
    </div>
  )
}
