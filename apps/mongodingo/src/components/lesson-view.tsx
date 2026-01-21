'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowLeft, ArrowRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Lesson } from '@/lib/majors-learning-data';
import { useUser } from '@/lib/user-store';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (xpEarned: number) => void;
  onExit: () => void;
}
export function LessonView({ lesson, onComplete, onExit }: LessonViewProps) {
  if (!lesson || !lesson.questions || lesson.questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Асуулт олдсонгүй</h2>
        <Button onClick={onExit} variant="outline">
          Буцах
        </Button>
      </div>
    );
  }

  const { hearts, updateHearts } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showContinue, setShowContinue] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const questions = lesson.questions;
  const currentQuestion = questions[currentQuestionIndex];
  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowContinue(false);
  }, [currentQuestionIndex, lesson.id]);

  // ✅ CONTENT-ONLY LESSON (no questions)
  if (!lesson?.questions || lesson.questions.length === 0) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        <div className="border-b border-border bg-card/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExit}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Буцах
            </Button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-xl px-4">
            <h2 className="text-3xl font-bold mb-4">{lesson.titleMn}</h2>
            <p className="text-muted-foreground mb-8">
              Энэ хичээл нь унших зориулалттай байна.
            </p>

            <Button
              size="lg"
              className="gap-2"
              onClick={() => onComplete(lesson.xp)}
            >
              Дуусгах <Trophy className="w-5 h-5" /> +{lesson.xp} XP
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const totalQuestions = lesson.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === currentQuestion.correctIndex;

    setIsCorrect(correct);

    if (correct) {
      setXpEarned((prev) => prev + 10);
    } else {
      updateHearts(-1);
    }

    setTimeout(() => {
      setShowContinue(true);
    }, 800);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);

      // 🔥 FULL RESET PER QUESTION
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowContinue(false);
    } else {
      onComplete(xpEarned);
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      <div className="border-b border-border bg-card/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onExit} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Буцах
          </Button>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">
                Асуулт {currentQuestionIndex + 1} / {totalQuestions}
              </span>
              <span className="text-xs font-semibold text-primary">
                +{xpEarned} XP
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
            <span className="text-sm font-semibold text-red-500">
              {hearts} ❤️
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lesson.id}-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-3xl font-bold mb-8">
                {currentQuestion.questionMn}
              </h2>

              {currentQuestion.code && (
                <div className="mb-8 p-6 rounded-xl bg-muted border border-border">
                  <pre className="font-mono text-sm">
                    <code>{currentQuestion.code}</code>
                  </pre>
                </div>
              )}

              <div className="space-y-4">
                {currentQuestion.answersMn.map((answer, index) => {
                  const answerKey = `${currentQuestion.id}-${index}`;
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer =
                    index === currentQuestion.correctIndex;
                  const showCorrect =
                    selectedAnswer !== null && isCorrectAnswer;
                  const showWrong = isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={answerKey}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      whileHover={
                        selectedAnswer === null ? { scale: 1.02 } : {}
                      }
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      className={`w-full p-6 rounded-2xl border-2 text-left text-lg font-semibold transition-all ${
                        showCorrect
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500'
                          : showWrong
                            ? 'bg-red-500/20 border-red-500 text-red-500'
                            : 'bg-card border-border hover:border-primary hover:bg-card/80'
                      } ${selectedAnswer !== null && 'cursor-not-allowed'}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{answer}</span>
                        {showCorrect && <Check className="w-6 h-6" />}
                        {showWrong && <X className="w-6 h-6" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showContinue && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="border-t border-border bg-card/80 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-6 max-w-3xl">
              <div className="flex items-center justify-between">
                <div>
                  {isCorrect ? (
                    <div className="flex items-center gap-2 text-emerald-500">
                      <Check className="w-6 h-6" />
                      <span className="text-lg font-bold">Зөв!</span>
                      <span className="text-sm text-muted-foreground">
                        +10 XP
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <X className="w-6 h-6" />
                      <span className="text-lg font-bold">Буруу</span>
                    </div>
                  )}
                </div>
                <Button onClick={handleContinue} size="lg" className="gap-2">
                  {currentQuestionIndex < totalQuestions - 1 ? (
                    <>
                      Үргэлжлүүлэх <ArrowRight className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Дуусгах <Trophy className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
