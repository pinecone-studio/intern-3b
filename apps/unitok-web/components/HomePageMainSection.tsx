import { Course, Review } from '@/lib/types';
import { Star } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import LessonReviewCard from './LessonReviewCard';

const HomePageMainSection = ({
  mockReviews,
  mockCourses,
  setSelectedCourse,
}: {
  mockReviews: Review[];
  mockCourses: Course[];
  setSelectedCourse: Dispatch<SetStateAction<Course | null>>;
}) => {
  return (
    <main className="flex-1 overflow-y-auto pb-20">
      {mockReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
          <Star className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="text-sm font-semibold text-foreground mb-1">
            Үнэлгээ байхгүй байна
          </h3>
          <p className="text-xs text-muted-foreground">
            Эхний үнэлгээг та бичиж болно
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {mockReviews.map((review) => {
            const course = mockCourses.find((c) => c.id === review.courseId);
            if (!course) return null;

            return (
              <LessonReviewCard
                key={review.id}
                review={review}
                setSelectedCourse={setSelectedCourse}
                course={course}
              />
            );
          })}
        </div>
      )}
    </main>
  );
};

export default HomePageMainSection;
