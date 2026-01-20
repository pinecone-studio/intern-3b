'use client';

import { motion } from 'framer-motion';
import { Clock, Trophy, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/majors-learning-data';

interface FeaturedCourseCardProps {
  course: Course;
  onClick: () => void;
}

export function FeaturedCourseCard({
  course,
  lesson,
  onClick,
}: {
  course: any;
  lesson: any;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative rounded-3xl overflow-hidden p-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 border border-primary/20"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

      <div className="relative z-10 max-w-3xl">
        {/* Label */}
        <span
          className="inline-block mb-4 px-4 py-1.5 rounded-full 
    bg-primary/10 text-primary text-sm font-semibold"
        >
          Дараагийн хичээл
        </span>

        {/* Lesson */}
        <div className="mb-3">
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl
      bg-background/70 backdrop-blur text-sm font-semibold shadow-sm"
          >
            📘 {lesson.title}
          </span>
        </div>

        {/* Skill Title */}
        <h2 className="text-4xl font-extrabold tracking-tight mb-6">
          {course.title}
        </h2>

        {/* Meta */}
        <div className="flex items-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              {course.estimatedMinutes} минут
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-semibold">+{course.xpReward} XP</span>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={onClick}
          size="lg"
          className="gap-3 text-lg px-10 h-14 rounded-2xl shadow-xl"
        >
          <Play className="w-5 h-5 fill-current" />
          Эхлэх
        </Button>
      </div>

      {/* Background Decoration */}
      <motion.div
        className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
      />
    </motion.div>
  );
}
