"use client"

import { Review } from "@/lib/types"
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
