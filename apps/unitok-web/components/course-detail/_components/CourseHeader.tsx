'use client';

import { Badge } from '@intern-3b/shadcn';
import type { Course } from '../type';

interface CourseHeaderProps {
  course: Course;
  onNavigateToSearch?: (
    searchType: 'course' | 'professor',
    query: string,
  ) => void;
}

export function CourseHeader({
  course,
  onNavigateToSearch,
}: CourseHeaderProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-3 mb-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">
          Хичээл
        </span>
        <Badge
          variant="secondary"
          onClick={() => onNavigateToSearch?.('course', course.name)}
          className="px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-accent/80"
        >
          {course.name}
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground">
          Багш
        </span>
        <Badge
          variant="secondary"
          onClick={() => onNavigateToSearch?.('professor', course.professor)}
          className="px-3 py-1.5 rounded-full text-sm font-medium cursor-pointer hover:bg-accent/80"
        >
          {course.professor}
        </Badge>
      </div>
    </div>
  );
}
