'use client';

import { motion } from 'framer-motion';
import { Lock, Check, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Course } from '@/lib/majors-learning-data';

interface CourseListCardProps {
  course: Course;
  status: 'locked' | 'in-progress' | 'completed';
  progress: number;
  lessonsCompleted: number;
  onClick: () => void;
}

export function CourseListCard({
  course,
  status,
  progress,
  lessonsCompleted,
  onClick,
}: CourseListCardProps) {
  const isLocked = status === 'locked';

  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      whileHover={!isLocked ? { scale: 1.02, x: 4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={`w-full p-6 rounded-2xl border-2 text-left transition-all ${
        isLocked
          ? 'bg-muted/30 border-border/50 opacity-80 cursor-not-allowed grayscale'
          : 'bg-card/80 border-border hover:border-primary hover:bg-card'
      }`}
    >
      <div className="flex items-start gap-5">
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
            isLocked
              ? 'bg-muted'
              : status === 'completed'
                ? 'bg-emerald-500/20'
                : 'bg-primary/20'
          }`}
        >
          {course.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold leading-tight tracking-tight">
                {course.titleMn}
              </h3>

              {!isLocked && status !== 'completed' && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm">
                  ▶ Үргэлжлүүлэх
                </div>
              )}

              {status === 'completed' && (
                <div className="inline-flex items-center gap-2 text-emerald-500 font-semibold text-sm">
                  <Check className="w-4 h-4" />
                  Дууссан
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                {course.subtitleMn}
              </p>
            </div>

            {status === 'completed' && (
              <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}

            {isLocked && <Lock className="w-5 h-5 text-muted-foreground" />}
          </div>

          {/* Progress */}
          {!isLocked && (
            <div className="mb-4 space-y-1">
              <Progress
                value={progress}
                className="h-2 bg-black/30 [&>div]:bg-primary [&>div]:shadow-[0_0_12px_rgba(0,200,200,0.6)]"
              />
              <div className="text-xs text-muted-foreground">
                {Math.round(progress)}%
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-5 text-sm">
            <Badge
              variant={
                status === 'completed'
                  ? 'default'
                  : status === 'in-progress'
                    ? 'secondary'
                    : 'outline'
              }
            >
              {status === 'completed'
                ? 'Дууссан'
                : status === 'in-progress'
                  ? 'Үргэлжилж байна'
                  : 'Түгжээтэй'}
            </Badge>

            {!isLocked && (
              <>
                <span className="text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {lessonsCompleted}
                  </span>{' '}
                  / {course.lessons?.length ?? 0} хичээл
                </span>

                <div className="flex items-center gap-1 text-primary font-semibold">
                  <Trophy className="w-4 h-4" />+{course.xpReward} XP
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
