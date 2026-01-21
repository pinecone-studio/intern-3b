"use client"

import { Button } from "@intern-3b/shadcn"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ExamOptionalToggleProps {
  open: boolean
  onToggle: () => void
}

export function ExamOptionalToggle({ open, onToggle }: ExamOptionalToggleProps) {
  return (
    <Button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
    >
      <span>Бэлтгэл болон дэлгэрэнгүй (Заавал биш)</span>
      {open ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
    </Button>
  )
}
