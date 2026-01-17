"use client"

import { motion } from "framer-motion"
import { Target, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DailyGoalNewProps {
  goal: number
  progress: number
  onChangeGoal: (goal: number) => void
}

export function DailyGoalNew({ goal, progress, onChangeGoal }: DailyGoalNewProps) {
  const percentage = Math.min((progress / goal) * 100, 100)
  const isCompleted = progress >= goal

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-6 ${
        isCompleted
          ? "border-green-500/30 bg-gradient-to-br from-green-500/10 to-green-500/5"
          : "border-border bg-card/50 backdrop-blur-xl"
      }`}
    >
      {isCompleted && <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />}

      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className={`w-5 h-5 ${isCompleted ? "text-green-500" : "text-primary"}`} />
            <h3 className="font-bold">Daily Goal</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChangeGoal(goal === 100 ? 50 : 100)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center space-y-2">
          <div className={`text-4xl font-bold ${isCompleted ? "text-green-500" : "text-primary"}`}>
            {progress} / {goal} XP
          </div>
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-green-500"
            >
              Goal completed! 🎉
            </motion.div>
          )}
        </div>

        <div className="relative h-3 rounded-full bg-secondary/20 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`absolute inset-y-0 left-0 rounded-full ${
              isCompleted
                ? "bg-gradient-to-r from-green-500 to-emerald-500"
                : "bg-gradient-to-r from-primary to-secondary"
            }`}
          />
        </div>
      </div>
    </div>
  )
}
