"use client"

import { Review } from "@/lib/types"
import { Star, ThumbsUp, AlertCircle } from "lucide-react"


interface ReviewItemProps {
  review: Review
}

export function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "fill-star-yellow text-star-yellow" : "fill-muted text-muted"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs text-muted-foreground">
            <ThumbsUp className="h-3.5 w-3.5" />
          </button>
          <button className="text-xs text-muted-foreground">
            <AlertCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-1.5">{review.semester}</p>
      <p className="text-sm text-foreground leading-snug mb-2">{review.text}</p>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 text-xs text-muted-foreground">
          <ThumbsUp className="h-3 w-3" />
          <span>{review.likes}</span>
        </button>
      </div>
    </div>
  )
}
