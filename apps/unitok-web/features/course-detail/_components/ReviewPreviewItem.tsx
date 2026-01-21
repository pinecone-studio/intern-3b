import { Star, ThumbsUp } from 'lucide-react';
import type { Review } from '../type';

interface ReviewPreviewItemProps {
  review: Review;
}

export function ReviewPreviewItem({ review }: ReviewPreviewItemProps) {
  return (
    <div className="pb-2 border-b border-border">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-star-yellow text-star-yellow" />
          <span className="text-sm font-semibold text-star-yellow">
            {review.rating.toFixed(1)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{review.semester}</span>
      </div>
      <p className="text-sm text-foreground leading-snug mb-1">{review.text}</p>
      <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground active:text-primary transition-colors">
        <ThumbsUp className="h-3 w-3" />
        <span>{review.likes}</span>
      </button>
    </div>
  );
}
