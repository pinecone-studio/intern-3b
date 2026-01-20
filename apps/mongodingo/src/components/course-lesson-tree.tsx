'use client';

import { motion } from 'framer-motion';
import { Check, Lock, Play, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course, Lesson } from '@/lib/majors-learning-data';

interface CourseLessonTreeProps {
  course: Course;
  completedLessons: string[];
  onLessonClick: (lessonId: string) => void;
  onBack: () => void;
}

export function CourseLessonTree({
  course,
  completedLessons,
  onLessonClick,
  onBack,
}: CourseLessonTreeProps) {
  const getNextLesson = () => {
    const firstIncomplete = (course.lessons ?? []).find(
      (lesson) => !completedLessons.includes(lesson.id),
    );
    return firstIncomplete?.id || null;
  };

  const nextLessonId = getNextLesson();

  const getLessonStatus = (
    lesson: Lesson,
  ): 'completed' | 'current' | 'locked' => {
    if (completedLessons.includes(lesson.id)) return 'completed';
    if (lesson.id === nextLessonId) return 'current';
    return 'locked';
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 mb-6"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          Буцах
        </Button>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{course.icon}</span>
          <div>
            <h1 className="text-4xl font-bold mb-2">{course.titleMn}</h1>
            <p className="text-lg text-muted-foreground">{course.subtitleMn}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="text-muted-foreground">
            Прогресс:{' '}
            <span className="font-bold text-foreground">
              {completedLessons.length}/{course.lessons?.length ?? 0}
            </span>
          </div>
          <div className="text-primary font-semibold">
            +{completedLessons.length * 50} XP олсон
          </div>
        </div>
      </motion.div>

      {/* Lesson Tree */}
      <div className="relative py-8">
        {/* Vertical Path Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary/10 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {(course.lessons ?? []).map((lesson, index) => {
            const status = getLessonStatus(lesson);
            const isLocked = status === 'locked';
            const isCurrent = status === 'current';
            const isCompleted = status === 'completed';

            return (
              <motion.div
                key={lesson.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: 'spring' }}
                className="relative flex flex-col items-center"
              >
                {/* Lesson Node */}
                <motion.button
                  onClick={() => !isLocked && onLessonClick(lesson.id)}
                  disabled={isLocked}
                  whileHover={!isLocked ? { scale: 1.1 } : {}}
                  whileTap={!isLocked ? { scale: 0.95 } : {}}
                  className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50'
                      : isCurrent
                        ? 'bg-gradient-to-br from-primary to-secondary border-primary shadow-lg shadow-primary/50 animate-pulse'
                        : 'bg-muted border-border opacity-50'
                  } ${!isLocked && 'cursor-pointer hover:shadow-2xl'}`}
                >
                  {isCompleted && <Check className="w-10 h-10 text-white" />}
                  {isCurrent && (
                    <Play className="w-10 h-10 text-white fill-white" />
                  )}
                  {isLocked && (
                    <Lock className="w-8 h-8 text-muted-foreground" />
                  )}

                  {/* Glow Effect for Current */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  )}
                </motion.button>

                {/* Lesson Info */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="mt-4 text-center"
                >
                  <h3
                    className={`font-bold ${isLocked ? 'text-muted-foreground' : isCurrent ? 'text-primary' : 'text-foreground'}`}
                  >
                    {lesson.titleMn}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {lesson.descriptionMn}
                  </p>
                  {!isLocked && (
                    <div className="mt-2 text-xs font-semibold text-primary">
                      +50 XP
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
