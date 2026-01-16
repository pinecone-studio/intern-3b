"use client"

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { CheckCircle2, Circle, Lock } from "lucide-react"

interface SkillNode {
  id: string
  title: string
  status: "completed" | "current" | "locked"
  progress: number
}

const skillPath: SkillNode[] = [
  { id: "1", title: "JavaScript Basics", status: "completed", progress: 100 },
  { id: "2", title: "DOM Manipulation", status: "current", progress: 60 },
  { id: "3", title: "Async Programming", status: "locked", progress: 0 },
  { id: "4", title: "React Fundamentals", status: "locked", progress: 0 },
  { id: "5", title: "State Management", status: "locked", progress: 0 },
]

export function SkillPathCard({ user }: { user: any }) {
  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-2xl font-bold mb-6">Ур чадварын зам</h2>

      <div className="space-y-4">
        {skillPath.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {index < skillPath.length - 1 && <div className="absolute left-5 top-12 w-0.5 h-8 bg-border" />}

            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                  node.status === "completed"
                    ? "bg-emerald-500 border-emerald-500"
                    : node.status === "current"
                      ? "bg-primary border-primary"
                      : "bg-muted border-border"
                }`}
              >
                {node.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : node.status === "locked" ? (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Circle className="w-5 h-5 text-white fill-white" />
                )}
              </div>

              <div className="flex-grow">
                <h3 className={`font-semibold mb-2 ${node.status === "locked" ? "text-muted-foreground" : ""}`}>
                  {node.title}
                </h3>
                {node.status !== "locked" && (
                  <div className="space-y-1">
                    <Progress
                      value={node.progress}
                      className={`h-2 ${node.status === "completed" ? "[&>*]:bg-emerald-500" : ""}`}
                    />
                    <div className="text-xs text-muted-foreground">{node.progress}% completed</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}