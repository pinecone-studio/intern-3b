"use client"

import { Button } from "@intern-3b/shadcn"
import { ChevronDown } from "lucide-react"

interface SortDropdownProps {
  value: "recent" | "likes"
  open: boolean
  onToggle: () => void
  onSelect: (sort: "recent" | "likes") => void
}

export function SortDropdown({ value, open, onToggle, onSelect }: SortDropdownProps) {
  return (
    <div className="relative">
      <Button
        onClick={onToggle}
        className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-muted text-foreground rounded-lg"
      >
        <span>{value === "recent" ? "Огноо" : "Таалагдсан"}</span>
        <ChevronDown className="h-3 w-3" />
      </Button>
      {open && (
        <div className="absolute right-0 mt-1 w-32 bg-card border border-border rounded-lg shadow-lg z-20">
          <Button onClick={() => onSelect("recent")} className="w-full px-3 py-2 text-xs text-left hover:bg-muted">
            Огноо
          </Button>
          <Button onClick={() => onSelect("likes")} className="w-full px-3 py-2 text-xs text-left hover:bg-muted">
            Таалагдсан
          </Button>
        </div>
      )}
    </div>
  )
}
