import { Star } from 'lucide-react';
import type { RatingBreakdownItem } from '../type';

interface CourseRatingSummaryProps {
  rating: number;
  reviewCount: number;
  ratingBreakdown: RatingBreakdownItem[];
}

export function CourseRatingSummary({
  rating,
  reviewCount,
  ratingBreakdown,
}: CourseRatingSummaryProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <div className="text-4xl font-bold text-star-yellow mb-0.5">
          {rating.toFixed(1)}
        </div>
        <div className="flex items-center gap-0.5 mb-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-star-yellow text-star-yellow' : 'fill-star-gray text-star-gray'}`}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{reviewCount} үнэлгээ</p>
      </div>

      <div className="flex-1 max-w-50 space-y-1">
        {ratingBreakdown.map((item) => (
          <div key={item.stars} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-3">
              {item.stars}
            </span>
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-foreground/20 rounded-full transition-all"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-xs text-foreground font-medium w-9 text-right">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
