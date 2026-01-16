"use client"

import { motion } from "framer-motion"
import { Camera, Crown, Flame, Trophy, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileHero() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-accent/5 p-8"
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar with level ring */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient rounded-full blur-md opacity-75" />
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="w-full h-full flex items-center justify-center text-6xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              БА
            </div>
          </div>
          {/* Level badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -bottom-2 -right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 border-2 border-background shadow-lg"
          >
            <Crown className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-bold text-white">8</span>
          </motion.div>
          {/* Camera icon overlay */}
          <button className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Camera className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Profile info */}
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Батаа Эрдэнэ
            </h1>
            <p className="text-muted-foreground">@bataaa • Software Engineering Track</p>
          </div>

          {/* Quick stats bar */}
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20"
            >
              <Zap className="w-5 h-5 text-primary fill-primary" />
              <div className="text-sm">
                <div className="font-bold text-primary">1,240 XP</div>
                <div className="text-xs text-muted-foreground">Total Points</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20"
            >
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              <div className="text-sm">
                <div className="font-bold text-orange-500">12 Days</div>
                <div className="text-xs text-muted-foreground">Streak</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20"
            >
              <Trophy className="w-5 h-5 text-amber-500 fill-amber-500" />
              <div className="text-sm">
                <div className="font-bold text-amber-500">24 Badges</div>
                <div className="text-xs text-muted-foreground">Earned</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20"
            >
              <Target className="w-5 h-5 text-blue-500 fill-blue-500" />
              <div className="text-sm">
                <div className="font-bold text-blue-500">38%</div>
                <div className="text-xs text-muted-foreground">Progress</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Share
          </Button>
        </div>
      </div>

      {/* Progress bar to next level */}
      <div className="relative mt-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Level 8 Progress</span>
          <span className="font-semibold text-primary">240 / 600 XP</span>
        </div>
        <div className="relative h-3 rounded-full bg-secondary/20 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "40%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient rounded-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </motion.div>
  )
}
