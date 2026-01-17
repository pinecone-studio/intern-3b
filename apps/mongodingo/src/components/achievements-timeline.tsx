'use client';

import { motion } from 'framer-motion';
import { Trophy, Flame, Star, Award, Zap, Target } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: 'Course Completed',
    description: 'Finished JavaScript Fundamentals',
    time: '2 hours ago',
    color: 'amber-500',
  },
  {
    icon: Flame,
    title: '12 Day Streak',
    description: "You're on fire! Keep it up!",
    time: 'Today',
    color: 'orange-500',
  },
  {
    icon: Star,
    title: 'Perfect Score',
    description: '100% on React Basics Quiz',
    time: 'Yesterday',
    color: 'primary',
  },
  {
    icon: Award,
    title: 'Badge Earned',
    description: "Unlocked 'Speed Demon' badge",
    time: '2 days ago',
    color: 'purple-500',
  },
  {
    icon: Zap,
    title: 'Level Up!',
    description: 'Reached Level 8',
    time: '3 days ago',
    color: 'blue-500',
  },
  {
    icon: Target,
    title: 'Milestone Reached',
    description: 'Completed 100 lessons',
    time: '1 week ago',
    color: 'green-500',
  },
];

export function AchievementsTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-4">
      <h2 className="text-xl font-bold">Recent Achievements</h2>

      <div className="space-y-4">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 group"
          >
            <div
              className={`relative w-12 h-12 rounded-xl bg-${achievement.color}/10 border border-${achievement.color}/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
            >
              <achievement.icon
                className={`w-6 h-6 text-${achievement.color}`}
              />
              <div
                className={`absolute inset-0 bg-${achievement.color}/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {achievement.time}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="w-full py-2 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors text-sm font-medium">
        View All Achievements
      </button>
    </div>
  );
}
