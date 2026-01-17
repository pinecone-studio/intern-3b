"use client"

import { motion } from "framer-motion"
import { Trophy, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LessonCompleteProps {
  lessonTitle: string
  xpEarned: number
  onContinue: () => void
}

export function LessonComplete({ lessonTitle, xpEarned, onContinue }: LessonCompleteProps) {
  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="text-center max-w-md px-8"
      >
        {/* Trophy Animation */}
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/50">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Confetti Effect */}
        <div className="relative mb-6">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: [-20, -100],
                x: [(i % 2 === 0 ? -1 : 1) * (20 + i * 10)],
                opacity: [1, 0],
                rotate: [0, (i % 2 === 0 ? -1 : 1) * 360],
              }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
              className="absolute left-1/2 top-0 w-3 h-3 rounded-full"
              style={{
                background: ["#22c55e", "#3b82f6", "#f59e0b", "#ec4899"][i % 4],
              }}
            />
          ))}
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold mb-4"
        >
          Хичээл дууслаа!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-muted-foreground mb-8"
        >
          {lessonTitle} хичээлийг амжилттай дуусгалаа
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.6 }}
          className="mb-8 p-6 rounded-2xl bg-primary/10 border-2 border-primary"
        >
          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-primary">
            <Zap className="w-8 h-8 fill-primary" />+{xpEarned} XP
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
          <Button onClick={onContinue} size="lg" className="w-full text-lg gap-2">
            Үргэлжлүүлэх <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
