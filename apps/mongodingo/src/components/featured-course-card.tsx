"use client"

import { motion } from "framer-motion"
import { Clock, Trophy, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Course } from "@/lib/majors-learning-data"

interface FeaturedCourseCardProps {
  course: Course
  onClick: () => void
}

export function FeaturedCourseCard({ course, onClick }: FeaturedCourseCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative rounded-3xl overflow-hidden p-8 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 border border-primary/20"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Дараагийн хичээл</div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{course.icon}</span>
              <h2 className="text-3xl font-bold">{course.titleMn}</h2>
            </div>
            <p className="text-lg text-muted-foreground">{course.subtitleMn}</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold">{course.estimatedMinutes} минут</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="font-semibold">+{course.xpReward} XP</span>
          </div>
        </div>

        <Button onClick={onClick} size="lg" className="gap-2 text-lg px-8 h-14">
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
  )
}
