"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BookOpen, TrendingUp, Map, Target, Zap, BarChart3 } from "lucide-react"

const solutions = [
  {
    icon: BookOpen,
    title: "Tech Major Profiles",
    description: "Мэргэжил бүрийн дэлгэрэнгүй мэдээлэл",
  },
  {
    icon: TrendingUp,
    title: "Career Paths",
    description: "Карьерын замын зураглал",
  },
  {
    icon: Map,
    title: "Skill Roadmaps",
    description: "Эзэмших ёстой ур чадварын зам",
  },
  {
    icon: Target,
    title: "Daily Tech Lessons",
    description: "Өдөр бүр сурах хичээлүүд",
  },
  {
    icon: Zap,
    title: "XP & Streak System",
    description: "Тоглоомжуулсан сургалт",
  },
  {
    icon: BarChart3,
    title: "Career Readiness",
    description: "Карьерт бэлэн байдлын үнэлгээ",
  },
]

export function HomepageSolution() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How Mongodingo Solves This</h2>
          <p className="text-xl text-muted-foreground">Таны технологийн карьерын хамтрагч</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="p-6 h-full backdrop-blur-sm bg-card/50 border-border/50 group hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{solution.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
