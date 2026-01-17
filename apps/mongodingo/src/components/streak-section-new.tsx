"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"

interface StreakSectionNewProps {
  streak: number
}

export function StreakSectionNew({ streak }: StreakSectionNewProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const completed = [true, true, true, true, true, true, true]

  return (
    <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-6">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />

      <div className="relative space-y-6">
        {/* Streak flame */}
        <div className="flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-50" />
            <Flame className="relative w-24 h-24 text-orange-500 fill-orange-500 drop-shadow-2xl" />
          </motion.div>
        </div>

        <div className="text-center space-y-1">
          <div className="text-4xl font-bold text-orange-500">{streak} Day Streak!</div>
          <p className="text-sm text-muted-foreground">Keep it up! You're on fire!</p>
        </div>

        {/* Calendar strip */}
        <div className="flex justify-between gap-2">
          {days.map((day, index) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1 text-center"
            >
              <div className="text-xs text-muted-foreground mb-2">{day}</div>
              <div
                className={`aspect-square rounded-lg flex items-center justify-center ${
                  completed[index]
                    ? index === days.length - 1
                      ? "bg-orange-500 border-2 border-orange-400"
                      : "bg-green-500/20 border border-green-500/30"
                    : "bg-muted/20 border border-border"
                }`}
              >
                {completed[index] && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.2, type: "spring" }}
                  >
                    {index === days.length - 1 ? (
                      <Flame className="w-4 h-4 text-white fill-white" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
