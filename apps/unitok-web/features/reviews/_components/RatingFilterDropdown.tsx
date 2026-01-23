"use client"

import { ChevronDown } from "lucide-react"

interface RatingFilterDropdownProps {
  value: number | null
  open: boolean
  onToggle: () => void
  onSelect: (rating: number | null) => void
}

export function RatingFilterDropdown({ value, open, onToggle, onSelect }: RatingFilterDropdownProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-muted text-foreground rounded-lg"
      >
        <span>{value ? `${value} од` : "Үнэлгээ"}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-28 bg-card border border-border rounded-lg shadow-lg z-20">
          <button onClick={() => onSelect(null)} className="w-full px-3 py-2 text-xs text-left hover:bg-muted">
            Бүгд
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => onSelect(rating)}
              className="w-full px-3 py-2 text-xs text-left hover:bg-muted"
            >
              {rating} од
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
