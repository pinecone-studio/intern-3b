"use client"

import { motion } from "framer-motion"
import { CheckCircle2, PlayCircle, Trophy, Flame } from "lucide-react"

const activities = [
  { icon: CheckCircle2, text: "Completed Variables lesson", xp: "+50 XP", time: "2 hours ago", color: "green-500" },
  { icon: PlayCircle, text: "Started Functions lesson", xp: "", time: "3 hours ago", color: "primary" },
  { icon: Trophy, text: "Reached Level 6", xp: "", time: "Yesterday", color: "amber-500" },
  { icon: Flame, text: "7-day streak achieved", xp: "", time: "Yesterday", color: "orange-500" },
  { icon: CheckCircle2, text: "Completed Data Types lesson", xp: "+50 XP", time: "2 days ago", color: "green-500" },
]

export function RecentActivityNew() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold">Recent Activity</h2>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl border border-border/50 hover:border-border hover:bg-accent/5 transition-all"
          >
            <div
              className={`w-10 h-10 rounded-lg bg-${activity.color}/10 border border-${activity.color}/20 flex items-center justify-center flex-shrink-0`}
            >
              <activity.icon className={`w-5 h-5 text-${activity.color}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium">{activity.text}</div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>

            {activity.xp && <div className="text-sm font-bold text-primary">{activity.xp}</div>}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
