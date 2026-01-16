"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { BookOpen, Map, Target, Zap } from "lucide-react"

export function HomepageDemo() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">See Mongodingo in Action</h2>
          <p className="text-xl text-muted-foreground">Платформын боломжуудтай танилц</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <Tabs defaultValue="major" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto p-1 bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="major" className="flex items-center gap-2 py-3">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Major Detail</span>
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="flex items-center gap-2 py-3">
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Skill Roadmap</span>
              </TabsTrigger>
              <TabsTrigger value="lesson" className="flex items-center gap-2 py-3">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Daily Lesson</span>
              </TabsTrigger>
              <TabsTrigger value="xp" className="flex items-center gap-2 py-3">
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">XP & Streak</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="major" className="mt-6">
              <Card className="p-8 backdrop-blur-sm bg-card/50 border-border/50">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">{"Major Detail"}</h3>
                    <p className="text-muted-foreground">Мэргэжлийн дэлгэрэнгүй мэдээлэл</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap" className="mt-6">
              <Card className="p-8 backdrop-blur-sm bg-card/50 border-border/50">
                <div className="aspect-video bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">{"Skill Roadmap"}</h3>
                    <p className="text-muted-foreground">Ур чадварын замын зураглал</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="lesson" className="mt-6">
              <Card className="p-8 backdrop-blur-sm bg-card/50 border-border/50">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">{"Daily Lesson"}</h3>
                    <p className="text-muted-foreground">Өдөр бүрийн хичээл</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="xp" className="mt-6">
              <Card className="p-8 backdrop-blur-sm bg-card/50 border-border/50">
                <div className="aspect-video bg-gradient-to-br from-secondary/10 to-primary/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">{"XP & Streak"}</h3>
                    <p className="text-muted-foreground">Туршлага цуглуулж, streak хадгал</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}
