"use client"

import { motion } from "framer-motion"
import { Zap, Trophy, BookOpen, Target, CheckCircle2, HelpCircle, Award, Flame } from "lucide-react"

const stats = [
  { icon: Zap, label: "Total XP", value: "1,240", color: "primary", gradient: "from-primary/20 to-primary/5" },
  {
    icon: Trophy,
    label: "Current Level",
    value: "7",
    color: "amber-500",
    gradient: "from-amber-500/20 to-amber-500/5",
  },
  {
    icon: BookOpen,
    label: "Lessons Completed",
    value: "142",
    color: "blue-500",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    icon: Target,
    label: "Skills Mastered",
    value: "6",
    color: "green-500",
    gradient: "from-green-500/20 to-green-500/5",
  },
  {
    icon: CheckCircle2,
    label: "Accuracy",
    value: "94%",
    color: "emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    icon: HelpCircle,
    label: "Questions Answered",
    value: "1,847",
    color: "purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    icon: Award,
    label: "Correct Answers",
    value: "1,736",
    color: "cyan-500",
    gradient: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    icon: Flame,
    label: "Longest Streak",
    value: "12 days",
    color: "orange-500",
    gradient: "from-orange-500/20 to-orange-500/5",
  },
]

export function StatsGridNew() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -5 }}
          className="relative group cursor-pointer"
        >
          <div
            className={`relative overflow-hidden rounded-2xl border border-${stat.color}/20 bg-gradient-to-br ${stat.gradient} p-6`}
          >
            {/* Glow effect */}
            <div
              className={`absolute top-0 right-0 w-20 h-20 bg-${stat.color}/20 rounded-full blur-2xl group-hover:blur-3xl transition-all`}
            />

            <div className="relative space-y-3">
              <div
                className={`w-12 h-12 rounded-xl bg-${stat.color}/10 border border-${stat.color}/20 flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>

              <div>
                <motion.div
                  className={`text-3xl font-bold text-${stat.color}`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
