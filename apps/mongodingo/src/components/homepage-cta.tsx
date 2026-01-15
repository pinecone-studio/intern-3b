"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"

export function HomepageCTA() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-4xl mx-auto p-12 text-center backdrop-blur-sm bg-gradient-to-br from-primary/10 via-card/50 to-secondary/10 border-border/50 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{"Ready to Start Your Tech Career Journey?"}</h2>
              <p className="text-xl text-muted-foreground mb-8">Технологийн карьераа өнөөдөр эхлүүл</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-12 px-8"
                  asChild
                >
                  <Link href="/learn">Үнэгүй эхлэх</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-12 px-8 border-2 bg-transparent" asChild>
                  <Link href="/majors">Демо үзэх</Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
