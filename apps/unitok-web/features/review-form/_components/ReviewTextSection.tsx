"use client"

interface ReviewTextSectionProps {
  reviewText: string
  setReviewText: (text: string) => void
}

export function ReviewTextSection({ reviewText, setReviewText }: ReviewTextSectionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">Санал сэтгэгдэл</label>
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Хичээлийн талаар бичих..."
        className="w-full min-h-25 p-3 rounded-lg border border-border bg-card text-foreground text-sm resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <p className="mt-2 text-xs text-muted-foreground">Үнэн зөв, тодорхой мэдээлэл бусад оюутнуудад тус болно</p>
    </div>
  )
}
