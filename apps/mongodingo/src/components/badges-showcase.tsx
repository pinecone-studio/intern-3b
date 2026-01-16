"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Star, Zap, Flame, Crown, Target, Sparkles } from "lucide-react"

const badges = [
  { icon: Trophy, name: "First Win", color: "amber-500", glow: true },
  { icon: Flame, name: "7 Day Streak", color: "orange-500", glow: true },
  { icon: Star, name: "100 Lessons", color: "primary", glow: true },
  { icon: Crown, name: "Level 5", color: "purple-500", glow: true },
  { icon: Zap, name: "Speed Demon", color: "blue-500", glow: false },
  { icon: Target, name: "Perfect Score", color: "green-500", glow: true },
  { icon: Award, name: "Top 10%", color: "pink-500", glow: false },
  { icon: Sparkles, name: "Night Owl", color: "indigo-500", glow: false },
]

export function BadgesShowcase() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Badges</h2>
        <span className="text-sm text-muted-foreground">24 / 50</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="group relative"
          >
            {badge.glow && (
              <div
                className={`absolute inset-0 bg-${badge.color} rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}
              />
            )}
            <div
              className={`relative w-full aspect-square rounded-xl border-2 ${
                badge.glow ? `border-${badge.color} bg-${badge.color}/10` : "border-border bg-secondary/50"
              } flex items-center justify-center cursor-pointer`}
            >
              <badge.icon className={`w-6 h-6 ${badge.glow ? `text-${badge.color}` : "text-muted-foreground"}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full py-2 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors text-sm font-medium">
        View All Badges
      </button>
    </div>
  )
}
