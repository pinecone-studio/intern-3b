
import { Star, ThumbsUp } from 'lucide-react';
import { Course, Review } from '../lib/types';

interface HomeReviewItemProps {
  review: Review;
  course: Course;
}

export function HomeReviewItem({ review, course }: HomeReviewItemProps) {
  return (
    <div className="w-full px-4 py-3 text-left">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground">{course.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-star-yellow text-star-yellow" />
          <span className="text-sm font-semibold text-star-yellow">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <p className="text-sm text-foreground leading-snug line-clamp-2 mb-2">
        {review.text}
      </p>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span>{review.semester}</span>
        <span>•</span>
        <div className="flex items-center gap-1">
          <ThumbsUp className="h-3 w-3" />
          <span>{review.likes}</span>
        </div>
      </div>
    </div>
  );
}
