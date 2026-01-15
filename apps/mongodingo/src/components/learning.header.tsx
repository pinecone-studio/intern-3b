"use client"

import Link from "next/link"
import { Heart, Flame, Gem, Zap, Crown, User } from "lucide-react"
import { motion } from "framer-motion"

export function LearningHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Mongodingo
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span className="text-sm font-semibold text-red-500">5</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-sm font-semibold text-orange-500">12</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <Gem className="w-4 h-4 text-blue-500 fill-blue-500" />
            <span className="text-sm font-semibold text-blue-500">450</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-primary">1,240 XP</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Crown className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-semibold text-amber-500">Level 8</span>
          </div>

          <Link href="/profile">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center cursor-pointer hover:border-accent hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              <User className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
