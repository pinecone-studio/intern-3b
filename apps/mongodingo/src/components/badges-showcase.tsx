'use client';

import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Zap,
  Award,
  Target,
  Star,
  Crown,
  Medal,
} from 'lucide-react';

const badges = [
  {
    icon: Trophy,
    name: 'First Lesson',
    description: 'Complete your first lesson',
    unlocked: true,
    color: 'amber-500',
  },
  {
    icon: Flame,
    name: '7-Day Streak',
    description: 'Maintain a 7-day learning streak',
    unlocked: true,
    color: 'orange-500',
  },
  {
    icon: Zap,
    name: '1000 XP',
    description: 'Earn 1000 total XP',
    unlocked: true,
    color: 'primary',
  },
  {
    icon: Award,
    name: 'Perfect Score',
    description: 'Complete a lesson with no mistakes',
    unlocked: true,
    color: 'green-500',
  },
  {
    icon: Target,
    name: 'Skill Master',
    description: 'Complete an entire skill',
    unlocked: true,
    color: 'blue-500',
  },
  {
    icon: Star,
    name: 'Fast Learner',
    description: 'Complete 10 lessons in one day',
    unlocked: false,
    color: 'purple-500',
  },
  {
    icon: Crown,
    name: 'Top 10',
    description: 'Reach top 10 on leaderboard',
    unlocked: false,
    color: 'amber-500',
  },
  {
    icon: Medal,
    name: 'Marathon',
    description: '30-day learning streak',
    unlocked: false,
    color: 'orange-500',
  },
];

export function BadgesGridNew() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <div className="text-sm text-muted-foreground">5/8 unlocked</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{
              scale: badge.unlocked ? 1.1 : 1.0,
              y: badge.unlocked ? -5 : 0,
            }}
            className="group relative"
          >
            <div
              className={`relative overflow-hidden rounded-xl border p-4 text-center ${
                badge.unlocked
                  ? `border-${badge.color}/30 bg-${badge.color}/5 cursor-pointer`
                  : 'border-border bg-muted/10 grayscale opacity-50'
              }`}
            >
              {badge.unlocked && (
                <div
                  className={`absolute inset-0 bg-${badge.color}/10 opacity-0 group-hover:opacity-100 transition-opacity`}
                />
              )}

              <div className="relative space-y-2">
                <div
                  className={`w-12 h-12 mx-auto rounded-full ${
                    badge.unlocked ? `bg-${badge.color}/20` : 'bg-muted/20'
                  } flex items-center justify-center`}
                >
                  <badge.icon
                    className={`w-6 h-6 ${badge.unlocked ? `text-${badge.color}` : 'text-muted-foreground'}`}
                  />
                </div>
                <div className="text-sm font-semibold">{badge.name}</div>
              </div>

              {/* Tooltip */}
              {!badge.unlocked && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {badge.description}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
