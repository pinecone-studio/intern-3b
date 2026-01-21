"use client"

import { Input } from "@intern-3b/shadcn"
import { Plus, X } from "lucide-react"


interface QuestionExampleListProps {
  questions: string[]
  onAdd: () => void
  onRemove: (index: number) => void
  onChange: (index: number, value: string) => void
}

export function QuestionExampleList({ questions, onAdd, onRemove, onChange }: QuestionExampleListProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-foreground">Асуултын жишээ</label>
        <button onClick={onAdd} className="text-sm text-primary flex items-center gap-1 font-medium">
          <Plus className="h-4 w-4" />
          Нэмэх
        </button>
      </div>
      {questions.length === 0 ? (
        <button
          onClick={onAdd}
          className="w-full py-3 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          Асуулт нэмэх
        </button>
      ) : (
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={question}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder={`Асуулт ${index + 1}`}
                className="flex-1 h-11 bg-card border-border text-foreground"
              />
              <button
                onClick={() => onRemove(index)}
                className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
