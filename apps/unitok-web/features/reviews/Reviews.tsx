"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { notFound } from "next/navigation"
import { getCourseById, getReviewsByCourseId } from "@/lib/mock-data"
import { Review } from "@/lib/types"
import { AddReviewForm } from "../review-form/_components/AddReviewForm"
import { ReviewsHeader } from "./_components/ReviewsHeader"
import { ReviewsEmptyState } from "./_components/ReviewsEmptyState"
import { ReviewsList } from "./_components/ReviewsList"
import { ReviewsFooter } from "./_components/ReviewsFooter"

export default function Reviews() {
  const router = useRouter()
  const params = useParams()
  const courseId = Number(params.courseId)

  const course = getCourseById(courseId)
  const reviews = getReviewsByCourseId(courseId)

  const [showAddReview, setShowAddReview] = useState(false)
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<"recent" | "likes">("recent")

  if (!course) {
    notFound()
  }

  const filteredReviews = reviews
    .filter((r: Review) => (ratingFilter === null ? true : r.rating === ratingFilter))
    .sort((a: Review, b: Review) => (sortBy === "likes" ? b.likes - a.likes : b.id - a.id))

  if (showAddReview) {
    return <AddReviewForm onBack={() => setShowAddReview(false)} onSubmit={() => setShowAddReview(false)} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <ReviewsHeader
        course={course}
        ratingFilter={ratingFilter}
        sortBy={sortBy}
        onRatingChange={setRatingFilter}
        onSortChange={setSortBy}
        // onBack={() => router.push(`/courses/${courseId}`)}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {filteredReviews.length === 0 ? <ReviewsEmptyState /> : <ReviewsList reviews={filteredReviews} />}
      </main>

      <ReviewsFooter onAddReview={() => setShowAddReview(true)} />
    </div>
  )
}
