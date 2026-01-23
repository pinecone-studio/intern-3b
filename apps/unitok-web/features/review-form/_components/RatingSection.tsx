"use client"

import { Star } from "lucide-react"

interface RatingSectionProps {
  rating: number
  setRating: (rating: number) => void
}

export function RatingSection({ rating, setRating }: RatingSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-3">Үнэлгээ</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            onClick={() => setRating(num)}
            className="p-1 hover:scale-110 transition-transform"
            type="button"
          >
            <Star
              className={`h-10 w-10 ${
                num <= rating ? "fill-star-yellow text-star-yellow" : "fill-star-gray text-star-gray"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
