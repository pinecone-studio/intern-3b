"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Target, Award, BookOpen, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Target,
    label: "Daily Goal",
    labelMn: "Өдрийн зорилго",
    value: "3/5 lessons",
    progress: 60,
    color: "text-primary",
  },
  {
    icon: Award,
    label: "Achievements",
    labelMn: "Амжилтууд",
    value: "12/50",
    progress: 24,
    color: "text-amber-500",
  },
  {
    icon: BookOpen,
    label: "Completed Lessons",
    labelMn: "Дууссан хичээл",
    value: "45",
    progress: 100,
    color: "text-emerald-500",
  },
  {
    icon: TrendingUp,
    label: "This Week",
    labelMn: "Энэ долоо хоног",
    value: "+320 XP",
    progress: 80,
    color: "text-blue-500",
  },
]

export function ProgressStatsCard() {
  return (
    <Card className="p-6 bg-card border-border">
      <h3 className="text-xl font-bold mb-6">Таны явц</h3>

      <div className="space-y-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="flex-grow">
                <div className="text-sm text-muted-foreground">{stat.labelMn}</div>
                <div className="font-semibold">{stat.value}</div>
              </div>
            </div>
            <Progress value={stat.progress} className="h-1.5" />
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
