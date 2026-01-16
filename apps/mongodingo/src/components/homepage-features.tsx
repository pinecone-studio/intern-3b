"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Compass, Route, GitBranch, GraduationCap, Flame, LineChart, Languages, Calendar } from "lucide-react"

const features = [
  {
    icon: Compass,
    title: "Tech Major Explorer",
    description: "Технологийн мэргэжлүүдийг судлах",
  },
  {
    icon: Route,
    title: "Career Roadmap",
    description: "Карьерын замын дэлгэрэнгүй зураглал",
  },
  {
    icon: GitBranch,
    title: "Skill Path System",
    description: "Ур чадвараа хөгжүүлэх алхам алхмаар",
  },
  {
    icon: GraduationCap,
    title: "Duolingo-style Learning",
    description: "Хялбар, зүй зохистой сургалт",
  },
  {
    icon: Flame,
    title: "XP & Streak",
    description: "Таван байлаа хадгалж, цуглуулах",
  },
  {
    icon: LineChart,
    title: "Progress Dashboard",
    description: "Өөрийн явцыг харах",
  },
  {
    icon: Languages,
    title: "Mongolian Language Support",
    description: "Монгол хэл дээр бүрэн дэмжлэг",
  },
  {
    icon: Calendar,
    title: "Daily Learning Habits",
    description: "Өдөр бүр сурах зуршил бий болго",
  },
]

export function HomepageFeatures() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-muted-foreground">Амжилтанд хүрэхэд шаардлагатай бүх зүйл</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.6 }}
            >
              <Card className="p-6 h-full backdrop-blur-sm bg-card/60 border-border/60 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
