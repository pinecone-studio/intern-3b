"use client"

import { motion } from "framer-motion"

const skills = [
  { name: "JavaScript", level: 85, color: "amber-500" },
  { name: "React", level: 78, color: "blue-500" },
  { name: "TypeScript", level: 72, color: "primary" },
  { name: "Node.js", level: 65, color: "green-500" },
  { name: "Git", level: 88, color: "orange-500" },
  { name: "CSS", level: 90, color: "purple-500" },
]

export function SkillsRadar() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Skill Progress</h2>
        <button className="text-sm text-primary hover:underline">View All</button>
      </div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className={`font-semibold text-${skill.color}`}>{skill.level}%</span>
            </div>

            <div className="relative h-2 rounded-full bg-secondary/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                className={`absolute inset-y-0 left-0 bg-${skill.color} rounded-full`}
              />
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: index * 0.1 }}
                className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">6</div>
          <div className="text-xs text-muted-foreground">Skills Mastered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-500">11</div>
          <div className="text-xs text-muted-foreground">Total Skills</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">79%</div>
          <div className="text-xs text-muted-foreground">Avg Progress</div>
        </div>
      </div>
    </div>
  )
}
