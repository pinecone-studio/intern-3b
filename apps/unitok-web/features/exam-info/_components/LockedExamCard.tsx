import { BlurredExamPreview } from './BlurredExamPreview';
import { ExamHeader } from './ExamHeader';
import { TicketUnlockSection } from './TicketUnlockSection';
import type { ExamInfo } from '../type';

type LockedExamCardProps = {
  exam: ExamInfo;
  onRevealExam: () => void;
};

export function LockedExamCard({ exam, onRevealExam }: LockedExamCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <ExamHeader
        type={exam.type}
        semester={exam.semester}
        likes={exam.likes}
        dislikes={exam.dislikes}
        variant="locked"
      />
      <BlurredExamPreview content={exam.content} />
      <TicketUnlockSection onUnlock={onRevealExam} />
    </div>
  );
}
