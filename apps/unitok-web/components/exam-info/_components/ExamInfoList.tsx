import { Ticket } from 'lucide-react';
// import { LockedExamCard } from "./locked-exam-card"
// import { RevealedExamCard } from "./revealed-exam-card"
import { ExamInfo, UserVote } from '../type';
import { LockedExamCard } from './LockedExamCard';
import { RevealedExamCard } from './RevealedExamCard';

type ExamInfoListProps = {
  examInfos: ExamInfo[];
  userVotes: Record<number, UserVote>;
  onRevealExam: (id: number) => void;
  onVote: (examId: number, voteType: 'like' | 'dislike') => void;
};

export function ExamInfoList({
  examInfos,
  userVotes,
  onRevealExam,
  onVote,
}: ExamInfoListProps) {
  if (examInfos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
          <Ticket className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">
          Шалгалтын мэдээлэл байхгүй
        </h3>
        <p className="text-sm text-muted-foreground">
          Энэ хичээлийн шалгалтын талаар мэдээлэл оруулсан хүн хараахан байхгүй
          байна
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {examInfos.map((exam) => (
        <div key={exam.id}>
          {!exam.revealed ? (
            <LockedExamCard
              exam={exam}
              onRevealExam={() => onRevealExam(exam.id)}
            />
          ) : (
            <RevealedExamCard
              exam={exam}
              userVote={userVotes[exam.id] ?? null}
              onVote={(voteType) => onVote(exam.id, voteType)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
