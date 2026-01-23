"use client"

import { Button } from "@intern-3b/shadcn"


interface ReviewsFooterProps {
  onAddReview: () => void
}

export function ReviewsFooter({ onAddReview }: ReviewsFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto px-4 py-2">
      <Button onClick={onAddReview} className="w-full cursor-pointer">
        Үнэлгээ нэмэх
      </Button>
    </div>
  )
}
