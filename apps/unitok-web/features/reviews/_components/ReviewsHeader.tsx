"use client"
import { Star } from "lucide-react"
import { useState } from "react"
import { RatingFilterDropdown } from "./RatingFilterDropdown"
import { SortDropdown } from "./SortDropdown"
import { Course } from "../../exam-info/type"

interface ReviewsHeaderProps {
  course: Course
  ratingFilter: number | null
  sortBy: "recent" | "likes"
  onRatingChange: (rating: number | null) => void
  onSortChange: (sort: "recent" | "likes") => void
}

export function ReviewsHeader({
  course,
  ratingFilter,
  sortBy,
  onRatingChange,
  onSortChange,
}: ReviewsHeaderProps) {
  const [showRatingDropdown, setShowRatingDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  return (
    <div className="sticky top-14 z-10 bg-card border-b border-border px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-star-yellow text-star-yellow" />
          <span className="text-base font-bold">
            {course.rating.toFixed(1)}
          </span>
          <span className="text-sm text-muted-foreground">
            ({course.reviewCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <RatingFilterDropdown
            value={ratingFilter}
            open={showRatingDropdown}
            onToggle={() => setShowRatingDropdown(v => !v)}
            onSelect={onRatingChange}
          />

          <SortDropdown
            value={sortBy}
            open={showSortDropdown}
            onToggle={() => setShowSortDropdown(v => !v)}
            onSelect={onSortChange}
          />
        </div>
      </div>
    </div>
  )
}
