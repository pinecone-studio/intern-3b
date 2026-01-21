"use client"

interface ExamBasicInfoSectionProps {
  semester: string
  examType: string
  examFormats: string[]
  onSemesterChange: (value: string) => void
  onExamTypeChange: (value: string) => void
  onExamFormatToggle: (format: string) => void
}

export function ExamBasicInfoSection({
  semester,
  examType,
  examFormats,
  onSemesterChange,
  onExamTypeChange,
  onExamFormatToggle,
}: ExamBasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Улирал</label>
        <select
          value={semester}
          onChange={(e) => onSemesterChange(e.target.value)}
          className="w-full h-11 px-3 rounded-lg border border-border bg-card text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Сонгох...</option>
          <option value="2025-1">2025-1</option>
          <option value="2024-2">2024-2</option>
          <option value="2024-1">2024-1</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Шалгалтын төрөл</label>
        <div className="flex gap-2">
          {["Дунд", "Эцсийн"].map((type) => (
            <button
              key={type}
              onClick={() => onExamTypeChange(type)}
              className={`flex-1 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                examType === type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-accent"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Шалгалтын хэлбэр</label>
        <div className="flex flex-wrap gap-2">
          {["Объектив", "Эссэ", "Кодчлол", "Презентаци"].map((format) => (
            <button
              key={format}
              onClick={() => onExamFormatToggle(format)}
              className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                examFormats.includes(format)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-accent"
              }`}
            >
              {format}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Нэг буюу хэд хэдийг сонгох боломжтой</p>
      </div>
    </div>
  )
}
