"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@intern-3b/shadcn"



interface SemesterSelectSectionProps {
  semester: string
  setSemester: (semester: string) => void
}

export function SemesterSelectSection({ semester, setSemester }: SemesterSelectSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Улирал</label>
      <Select value={semester} onValueChange={setSemester}>
        <SelectTrigger className="w-full h-11">
          <SelectValue placeholder="Сонгох..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2025-1">2025-1</SelectItem>
          <SelectItem value="2024-2">2024-2</SelectItem>
          <SelectItem value="2024-1">2024-1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
