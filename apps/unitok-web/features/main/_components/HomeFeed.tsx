"use client"

import { Star } from "lucide-react"
import { HomeReviewItem } from "./HomeReviewItem"
import { Review } from "../../course-detail/type"
import { Course } from "../../exam-info/type"

interface HomeFeedProps {
  reviews: Review[]
  courses: Course[]
  onSelectCourse: (course: Course) => void
}

export function HomeFeed({ reviews, courses, onSelectCourse }: HomeFeedProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
        <Star className="h-12 w-12 text-muted-foreground/40 mb-3" />
        <h3 className="text-sm font-semibold text-foreground mb-1">Үнэлгээ байхгүй байна</h3>
        <p className="text-xs text-muted-foreground">Эхний үнэлгээг та бичиж болно</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-border">
      {reviews.map((review) => {
        const course = courses.find((c) => c.id === review.courseId)
        if (!course) return null

        return (
          <button
            key={review.id}
            onClick={() => onSelectCourse(course)}
            className="w-full hover:bg-accent/50 transition-colors active:bg-accent"
          >
            <HomeReviewItem review={review} course={course} />
          </button>
        )
      })}
    </div>
  )
}
