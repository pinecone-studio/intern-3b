import { ExamHeader } from './ExamHeader';
import { ExamVoteButtons } from './ExamVoteButtons';
import type { ExamInfo, UserVote } from '../type';

type RevealedExamCardProps = {
  exam: ExamInfo;
  userVote: UserVote;
  onVote: (voteType: 'like' | 'dislike') => void;
};

export function RevealedExamCard({
  exam,
  userVote,
  onVote,
}: RevealedExamCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <ExamHeader
        type={exam.type}
        semester={exam.semester}
        likes={exam.likes}
        dislikes={exam.dislikes}
        variant="revealed"
      />
      <div className="px-4 py-3 space-y-4">
        <p className="text-sm text-foreground leading-relaxed">
          {exam.content}
        </p>

        {exam.examFormats && exam.examFormats.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">
              Шалгалтын хэлбэр
            </p>
            <p className="text-sm text-foreground">
              {exam.examFormats.join(', ')}
            </p>
          </div>
        )}

        {exam.difficulty && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Хүндрэл</p>
            <p className="text-sm text-foreground">{exam.difficulty}</p>
          </div>
        )}

        {exam.strategy && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Бэлтгэх арга</p>
            <p className="text-sm text-foreground leading-relaxed">
              {exam.strategy}
            </p>
          </div>
        )}

        {exam.questionExamples && exam.questionExamples.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">
              Асуултын жишээ
            </p>
            <div className="space-y-1">
              {exam.questionExamples.map((question, idx) => (
                <p
                  key={idx}
                  className="text-sm text-foreground leading-relaxed"
                >
                  {question}
                </p>
              ))}
            </div>
          </div>
        )}

        {exam.tips && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Зөвлөмж</p>
            <p className="text-sm text-foreground leading-relaxed">
              {exam.tips}
            </p>
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-border">
        <ExamVoteButtons
          likes={exam.likes}
          dislikes={exam.dislikes}
          userVote={userVote}
          onVote={onVote}
        />
      </div>
    </div>
  );
}
