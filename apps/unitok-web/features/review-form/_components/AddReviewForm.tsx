"use client"

import { AppHeader } from "@/components/AppHeader";
import { useState } from "react"
import { RatingSection } from "./RatingSection";
import { ReviewTextSection } from "./ReviewTextSection";
import { SemesterSelectSection } from "./SemesterSelectSection";
import { ExtraInfoSection } from "./ExtraInfoSection";
import { Button } from "@intern-3b/shadcn";


export function AddReviewForm({ onBack, onSubmit }: { onBack: () => void; onSubmit: () => void }) {
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [semester, setSemester] = useState("")

  const [assignment, setAssignment] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [attendance, setAttendance] = useState("")
  const [examCount, setExamCount] = useState("")

  const [showRules, setShowRules] = useState(false)

  const isValid = rating > 0 && reviewText.trim().length > 0 && semester !== ""

  const handleSubmit = () => {
    if (!showRules) {
      setShowRules(true)
      return
    }
    onSubmit()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader title="Үнэлгээ нэмэх" onBack={onBack} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 py-4 space-y-6">
          <div className="space-y-4">
            <RatingSection rating={rating} setRating={setRating} />

            <ReviewTextSection reviewText={reviewText} setReviewText={setReviewText} />

            <SemesterSelectSection semester={semester} setSemester={setSemester} />
          </div>

          <ExtraInfoSection
            assignment={assignment}
            setAssignment={setAssignment}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            attendance={attendance}
            setAttendance={setAttendance}
            examCount={examCount}
            setExamCount={setExamCount}
          />

          {showRules && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-2">
              <h3 className="text-sm font-semibold text-foreground">Анхааруулга</h3>
              <ul className="space-y-1 text-xs text-muted-foreground leading-relaxed">
                <li>• Үнэлгээ нь бусад оюутнуудад тус болно</li>
                <li>• Хувийн мэдээлэл оруулахгүй байна уу</li>
                <li>• Буруу мэдээлэл устгагдах болно</li>
              </ul>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto px-4 py-3">
        <Button onClick={handleSubmit} size="lg" className="w-full cursor-pointer" disabled={!isValid}>
          {showRules ? "Батлах" : "Үргэлжлүүлэх"}
        </Button>
      </div>
    </div>
  )
}
