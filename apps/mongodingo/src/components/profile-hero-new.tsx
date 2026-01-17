"use client"

import { motion } from "framer-motion"
import { Camera, Flame, Trophy, Zap } from "lucide-react"

interface ProfileHeroNewProps {
  xp: number
  level: number
  streak: number
}

const getTitle = (xp: number) => {
  if (xp < 500) return "Code Rookie"
  if (xp < 1000) return "Frontend Explorer"
  if (xp < 2000) return "JS Warrior"
  if (xp < 5000) return "Fullstack Apprentice"
  return "Senior Dev"
}

const getLevelXP = (level: number) => {
  return Math.floor(500 * Math.pow(1.3, level - 1))
}

export function ProfileHeroNew({ xp, level, streak }: ProfileHeroNewProps) {
  const currentLevelXP = getLevelXP(level)
  const nextLevelXP = getLevelXP(level + 1)
  const progressInLevel = xp - currentLevelXP
  const xpNeeded = nextLevelXP - currentLevelXP
  const progress = (progressInLevel / xpNeeded) * 100

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8"
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-8">
        {/* Left: Avatar */}
        <div className="relative group cursor-pointer">
          {/* Glow behind avatar */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient rounded-full blur-2xl opacity-50" />

          {/* Level ring */}
          <svg className="absolute -inset-4 w-40 h-40" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-muted/20"
            />
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - progress / 100) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Avatar */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 bg-gradient-to-br from-primary/20 to-secondary/20">
            <div className="w-full h-full flex items-center justify-center text-5xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
              @subee
            </div>
          </div>

          {/* Camera overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <Camera className="w-6 h-6 text-white" />
          </div>

          {/* Level badge */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 border-2 border-background shadow-xl"
          >
            <Trophy className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-bold text-white">Level {level}</span>
          </motion.div>
        </div>

        {/* Center: Info */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              @subee
            </h1>
            <p className="text-lg text-muted-foreground mt-1">{getTitle(xp)}</p>
          </div>

          {/* XP Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {nextLevelXP - xp} XP to Level {level + 1}
              </span>
              <span className="font-bold text-primary">
                {progressInLevel} / {xpNeeded} XP
              </span>
            </div>
            <div className="relative h-4 rounded-full bg-secondary/20 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-gradient rounded-full"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Right: Quick stats */}
        <div className="flex md:flex-col gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
          >
            <Zap className="w-8 h-8 text-primary fill-primary" />
            <div>
              <motion.div
                className="text-3xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {xp.toLocaleString()}
              </motion.div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20"
          >
            <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
            <div>
              <div className="text-3xl font-bold text-orange-500">{streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
