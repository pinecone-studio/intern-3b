"use client"

import { QuestionExampleList } from "./QuestionExampleList"



interface ExamOptionalSectionProps {
  strategy: string
  difficulty: string
  questionExamples: string[]
  tips: string
  onStrategyChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onAddQuestion: () => void
  onRemoveQuestion: (index: number) => void
  onQuestionChange: (index: number, value: string) => void
  onTipsChange: (value: string) => void
}

export function ExamOptionalSection({
  strategy,
  difficulty,
  questionExamples,
  tips,
  onStrategyChange,
  onDifficultyChange,
  onAddQuestion,
  onRemoveQuestion,
  onQuestionChange,
  onTipsChange,
}: ExamOptionalSectionProps) {
  return (
    <div className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Бэлтгэх арга</label>
        <textarea
          value={strategy}
          onChange={(e) => onStrategyChange(e.target.value)}
          placeholder="Хэрхэн бэлтгэх, юунд анхаарах тухай..."
          className="w-full min-h-20 p-3 rounded-lg border border-border bg-card text-foreground text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Хүндрэл</label>
        <div className="flex gap-2">
          {["Амархан", "Дунд", "Хэцүү"].map((option) => (
            <button
              key={option}
              onClick={() => onDifficultyChange(option)}
              className={`flex-1 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                difficulty === option
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-accent"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <QuestionExampleList
        questions={questionExamples}
        onAdd={onAddQuestion}
        onRemove={onRemoveQuestion}
        onChange={onQuestionChange}
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Зөвлөмж</label>
        <textarea
          value={tips}
          onChange={(e) => onTipsChange(e.target.value)}
          placeholder="Бусад оюутнуудад өгөх зөвлөгөө..."
          className="w-full min-h-[80px] p-3 rounded-lg border border-border bg-card text-foreground text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  )
}
