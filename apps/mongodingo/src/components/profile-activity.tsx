"use client"

import { motion } from "framer-motion"

const activityData = [
  [3, 0, 5, 2, 8, 4, 1],
  [2, 7, 3, 6, 2, 9, 4],
  [5, 2, 8, 1, 4, 3, 7],
  [1, 4, 2, 7, 5, 2, 3],
  [6, 3, 9, 2, 6, 8, 5],
  [2, 5, 1, 8, 3, 4, 9],
  [4, 2, 6, 3, 7, 1, 5],
]

const getColor = (value: number) => {
  if (value === 0) return "bg-secondary/20"
  if (value <= 3) return "bg-primary/30"
  if (value <= 6) return "bg-primary/60"
  return "bg-primary"
}

export function ProfileActivity() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Activity</h2>
        <span className="text-xs text-muted-foreground">Last 7 weeks</span>
      </div>

      <div className="space-y-1.5">
        {activityData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex gap-1.5">
            {week.map((day, dayIndex) => (
              <motion.div
                key={dayIndex}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                whileHover={{ scale: 1.2 }}
                className={`w-full aspect-square rounded ${getColor(day)} cursor-pointer transition-colors hover:ring-2 hover:ring-primary/50`}
                title={`${day} lessons`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-secondary/20" />
          <div className="w-3 h-3 rounded bg-primary/30" />
          <div className="w-3 h-3 rounded bg-primary/60" />
          <div className="w-3 h-3 rounded bg-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
