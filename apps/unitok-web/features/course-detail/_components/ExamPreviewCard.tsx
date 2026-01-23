import { ThumbsUp, ThumbsDown, Ticket } from 'lucide-react';
import { ExamInfo } from '../../exam-info/type';

interface ExamPreviewCardProps {
  exam: ExamInfo;
}

export function ExamPreviewCard({ exam }: ExamPreviewCardProps) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-4 mb-3">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-foreground">
          {exam.type} шалгалт
        </h4>
        <span className="text-xs text-muted-foreground">
          {exam.semester.split(' ')[0]}
        </span>
      </div>
      <div className="relative mb-3">
        <p className="text-sm text-muted-foreground leading-snug">
          {exam.content.substring(0, 50)}...
        </p>
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-background/60 to-background backdrop-blur-[1px]" />
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <ThumbsUp className="h-3.5 w-3.5" />
          {exam.likes}
        </span>
        <span className="flex items-center gap-1">
          <ThumbsDown className="h-3.5 w-3.5" />
          {exam.dislikes}
        </span>
        <span className="flex items-center gap-1">
          <Ticket className="h-3.5 w-3.5" />5 оноо
        </span>
      </div>
    </div>
  );
}
