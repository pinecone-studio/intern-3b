"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Lock } from "lucide-react"

const skills = [
  { name: "JavaScript Basics", progress: 100, locked: false },
  { name: "React Fundamentals", progress: 75, locked: false },
  { name: "TypeScript Essentials", progress: 40, locked: false },
  { name: "Node.js & Express", progress: 20, locked: false },
  { name: "Database & SQL", progress: 0, locked: true },
  { name: "Backend APIs", progress: 0, locked: true },
]

export function SkillsProgressNew() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold">Your Skills</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`relative overflow-hidden rounded-xl border p-6 ${
              skill.locked
                ? "border-border bg-muted/10"
                : skill.progress === 100
                  ? "border-green-500/30 bg-green-500/5"
                  : "border-primary/20 bg-primary/5"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold">{skill.name}</h3>
              {skill.locked ? (
                <Lock className="w-5 h-5 text-muted-foreground" />
              ) : skill.progress === 100 ? (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              ) : null}
            </div>

            {/* Circular progress */}
            <div className="flex items-center justify-center">
              <div className="relative w-24 h-24">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-muted/20"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="none"
                    stroke={
                      skill.locked ? "currentColor" : skill.progress === 100 ? "rgb(34 197 94)" : "hsl(var(--primary))"
                    }
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - skill.progress / 100) }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={skill.locked ? "text-muted" : ""}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-2xl font-bold ${
                      skill.locked
                        ? "text-muted-foreground"
                        : skill.progress === 100
                          ? "text-green-500"
                          : "text-primary"
                    }`}
                  >
                    {skill.progress}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
