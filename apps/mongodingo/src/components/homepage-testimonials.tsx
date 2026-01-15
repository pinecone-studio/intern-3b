"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    name: "Болд",
    major: "Software Engineering",
    quote: "Mongodingo надад мэргэжлийн талаар илүү сайн ойлголт өгсөн. Одоо би юу сурах ёстойгоо мэдэж байна.",
  },
  {
    name: "Сарангэрэл",
    major: "Data Science",
    quote:
      "Өдөр бүр 10 минут зарцуулж, data science-ийн үндсийг эзэмшиж байна. Streak system нь намайг урамшуулж байна.",
  },
  {
    name: "Ганбаатар",
    major: "Web Development",
    quote: "Карьерын зам маш тодорхой харагдаж байна. Mongodingo миний амжилтын нууц!",
  },
]

export function HomepageTestimonials() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Students Say</h2>
          <p className="text-xl text-muted-foreground">Оюутнуудын сэтгэгдэл</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Card className="p-8 h-full backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-lg mb-6 leading-relaxed text-pretty">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.major}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
