"use client"


import { Review } from "../../course-detail/type"
import { ReviewItem } from "./ReviewItem"



interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="divide-y divide-border">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}
