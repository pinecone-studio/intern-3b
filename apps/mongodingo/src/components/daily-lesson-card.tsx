"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Play, CheckCircle2, Lock } from "lucide-react"

interface Lesson {
  id: string
  title: string
  titleMn: string
  description: string
  descriptionMn: string
  xp: number
  duration: string
  status: "completed" | "current" | "locked"
}

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Introduction to JavaScript",
    titleMn: "JavaScript-тай танилцах",
    description: "Learn the basics of JavaScript programming",
    descriptionMn: "JavaScript програмчлалын үндсийг суралцах",
    xp: 50,
    duration: "10 min",
    status: "completed",
  },
  {
    id: "2",
    title: "Variables and Data Types",
    titleMn: "Хувьсагч ба өгөгдлийн төрөл",
    description: "Understanding variables and data types",
    descriptionMn: "Хувьсагч болон өгөгдлийн төрлүүдийг ойлгох",
    xp: 50,
    duration: "15 min",
    status: "current",
  },
  {
    id: "3",
    title: "Functions and Scope",
    titleMn: "Функц ба хүрээ",
    description: "Master functions and scope in JavaScript",
    descriptionMn: "JavaScript дээрх функц болон хүрээг эзэмших",
    xp: 75,
    duration: "20 min",
    status: "locked",
  },
]

export function DailyLessonCard() {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Өнөөдрийн хичээл</h2>
        <div className="text-sm text-muted-foreground">3/15 completed</div>
      </div>

      <Progress value={20} className="mb-6 h-2" />

      <div className="space-y-3">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`p-4 border ${
                lesson.status === "current"
                  ? "bg-primary/5 border-primary/30"
                  : lesson.status === "completed"
                    ? "bg-emerald-500/5 border-emerald-500/20"
                    : "bg-muted/20 border-border/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    lesson.status === "current"
                      ? "bg-primary/20"
                      : lesson.status === "completed"
                        ? "bg-emerald-500/20"
                        : "bg-muted"
                  }`}
                >
                  {lesson.status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  ) : lesson.status === "locked" ? (
                    <Lock className="w-6 h-6 text-muted-foreground" />
                  ) : (
                    <Play className="w-6 h-6 text-primary" />
                  )}
                </div>

                <div className="flex-grow">
                  <h3 className="font-semibold mb-1">{lesson.titleMn}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{lesson.duration}</span>
                    <span>•</span>
                    <span className="text-primary font-medium">+{lesson.xp} XP</span>
                  </div>
                </div>

                {lesson.status === "current" && (
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Эхлэх
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
