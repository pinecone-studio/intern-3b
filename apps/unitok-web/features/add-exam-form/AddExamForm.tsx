'use client';

import { useState } from 'react';
import { AppHeader } from '../../components/AppHeader';
import { ExamBasicInfoSection } from './_components/ExamBasicInfoSection';
import { ExamOptionalToggle } from './_components/ExamOptionalToggle';
import { ExamOptionalSection } from './_components/ExamOptionalSection';
import { TicketInfoBox } from './_components/TicketInfoBox';
import { ExamFormFooter } from './_components/ExamFormFooter';

export function AddExamForm({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: () => void;
}) {
  const [semester, setSemester] = useState('');
  const [examType, setExamType] = useState('');
  const [examFormats, setExamFormats] = useState<string[]>([]);

  const [showOptional, setShowOptional] = useState(false);
  const [strategy, setStrategy] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [questionExamples, setQuestionExamples] = useState<string[]>([]);
  const [tips, setTips] = useState('');

  const [showTicketInfo, setShowTicketInfo] = useState(false);

  const isValid = semester !== '' && examType !== '' && examFormats.length > 0;

  const toggleExamFormat = (format: string) => {
    if (examFormats.includes(format)) {
      setExamFormats(examFormats.filter((f) => f !== format));
    } else {
      setExamFormats([...examFormats, format]);
    }
  };

  const addQuestion = () => {
    setQuestionExamples([...questionExamples, '']);
  };

  const removeQuestion = (index: number) => {
    setQuestionExamples(questionExamples.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...questionExamples];
    newQuestions[index] = value;
    setQuestionExamples(newQuestions);
  };

  const handleSubmit = () => {
    if (!showTicketInfo) {
      setShowTicketInfo(true);
      return;
    }
    onSubmit();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader title="Шалгалтын мэдээлэл нэмэх" onBack={onBack} />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="px-4 py-4 space-y-6">
          <ExamBasicInfoSection
            semester={semester}
            examType={examType}
            examFormats={examFormats}
            onSemesterChange={setSemester}
            onExamTypeChange={setExamType}
            onExamFormatToggle={toggleExamFormat}
          />

          <div className="border-t border-border pt-4">
            <ExamOptionalToggle
              open={showOptional}
              onToggle={() => setShowOptional(!showOptional)}
            />

            {showOptional && (
              <ExamOptionalSection
                strategy={strategy}
                difficulty={difficulty}
                questionExamples={questionExamples}
                tips={tips}
                onStrategyChange={setStrategy}
                onDifficultyChange={setDifficulty}
                onAddQuestion={addQuestion}
                onRemoveQuestion={removeQuestion}
                onQuestionChange={updateQuestion}
                onTipsChange={setTips}
              />
            )}
          </div>

          <TicketInfoBox visible={showTicketInfo} />
        </div>
      </main>

      <ExamFormFooter
        isValid={isValid}
        showTicketInfo={showTicketInfo}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
