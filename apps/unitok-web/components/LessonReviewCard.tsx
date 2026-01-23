
import { Star, ThumbsUp } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Course, Review } from '../lib/types';

const LessonReviewCard = ({
  setSelectedCourse,
  review,
  course,
}: {
  setSelectedCourse: Dispatch<SetStateAction<Course | null>>;
  review: Review;
  course: Course;
}) => {
  return (
    <button
      onClick={() => setSelectedCourse(course)}
      className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors active:bg-accent"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground">{course.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow">
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
    </button>
  );
};

export default LessonReviewCard;
