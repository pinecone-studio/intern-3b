"use client"

import { motion } from "framer-motion"
import { TrendingUp, Clock, Target, Award, BookOpen, Code } from "lucide-react"

const stats = [
  { icon: BookOpen, label: "Lessons Completed", value: "142", change: "+12 this week", color: "primary" },
  { icon: Clock, label: "Learning Time", value: "48h", change: "+6h this week", color: "blue-500" },
  { icon: Target, label: "Daily Goals", value: "9/10", change: "90% streak", color: "green-500" },
  { icon: Code, label: "Code Challenges", value: "67", change: "+5 this week", color: "purple-500" },
  { icon: Award, label: "Course Progress", value: "38%", change: "4 of 11 skills", color: "amber-500" },
  { icon: TrendingUp, label: "Global Rank", value: "#423", change: "Top 15%", color: "orange-500" },
]

export function StatsOverview() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-4">
      <h2 className="text-xl font-bold">Statistics Overview</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative overflow-hidden rounded-xl border border-${stat.color}/20 bg-${stat.color}/5 p-4 group cursor-pointer`}
          >
            <div
              className={`absolute top-2 right-2 w-12 h-12 bg-${stat.color}/10 rounded-full blur-xl group-hover:blur-2xl transition-all`}
            />

            <div className="relative space-y-2">
              <div
                className={`w-10 h-10 rounded-lg bg-${stat.color}/10 border border-${stat.color}/20 flex items-center justify-center`}
              >
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
              </div>

              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>

              <div className={`text-xs text-${stat.color} font-medium`}>{stat.change}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
