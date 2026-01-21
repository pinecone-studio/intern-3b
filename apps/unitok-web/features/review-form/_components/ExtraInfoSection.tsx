"use client"

import { Button, Label } from "@intern-3b/shadcn"

interface ExtraInfoSectionProps {
  assignment: string
  setAssignment: (value: string) => void
  difficulty: string
  setDifficulty: (value: string) => void
  attendance: string
  setAttendance: (value: string) => void
  examCount: string
  setExamCount: (value: string) => void
}

export function ExtraInfoSection({
  assignment,
  setAssignment,
  difficulty,
  setDifficulty,
  attendance,
  setAttendance,
  examCount,
  setExamCount,
}: ExtraInfoSectionProps) {
  return (
    <div className="border-t border-border pt-4">
      <div className="mb-3">
        <span className="text-sm font-medium text-foreground">Нэмэлт мэдээлэл</span>
      </div>

      <div className="space-y-3">
        <OptionGroup
          label="Ажлын ачаалал"
          options={["Бага", "Дунд", "Их"]}
          value={assignment}
          onChange={setAssignment}
        />

        <OptionGroup
          label="Хүндрэл"
          options={["Амархан", "Дунд", "Хэцүү"]}
          value={difficulty}
          onChange={setDifficulty}
        />

        <OptionGroup
          label="Ирц"
          options={["Нэр дуудна", "Сайтаар", "Холимог"]}
          value={attendance}
          onChange={setAttendance}
        />

        <OptionGroup
          label="Шалгалтын тоо"
          options={["Байхгүй", "1", "2", "3", "4+"]}
          value={examCount}
          onChange={setExamCount}
          isGrid
        />
      </div>
    </div>
  )
}

function OptionGroup({
  label,
  options,
  value,
  onChange,
  isGrid = false,
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  isGrid?: boolean
}) {
  return (
    <div>
      <Label className="block text-xs text-muted-foreground mb-1.5">{label}</Label>
      <div className={isGrid ? "grid grid-cols-5 gap-1" : "flex gap-1"}>
        {options.map((option) => (
          <Button
            key={option}
            onClick={() => onChange(option)}
            type="button"
            className={`px-2 py-1 rounded border text-xs transition-colors ${
              value === option
                ? "bg-foreground/10 text-foreground border-foreground/20"
                : "bg-transparent text-muted-foreground border-border hover:bg-accent hover:text-foreground"
            } ${!isGrid && "flex-1"}`}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
