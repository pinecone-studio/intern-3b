'use client';

import { motion } from 'framer-motion';

import { StatsGridNew } from '@/components/stats-grid-new';
import { StreakSectionNew } from '@/components/streak-section-new';
import { SkillsProgressNew } from '@/components/skills-progress-new';
import { BadgesGridNew } from '@/components/badges-grid-new';
import { RecentActivityNew } from '@/components/recent-activity-new';

import { useUser } from '@/lib/user-store';
import { LearningHeader } from '@/components/learning.header';
import { ProfileHeroNew } from '@/components/profile-hero-new';
import { DailyGoalNew } from '@/components/daily-goal-new';
import { ProfileSettings } from '@/components/profile-settings';

export default function ProfilePage() {
  const { xp, level, streak, dailyGoal, dailyProgress, updateDailyGoal } =
    useUser();

  return (
    <div className="min-h-screen dark">
      <LearningHeader />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <ProfileHeroNew xp={xp} level={level} streak={streak} />

          <StatsGridNew />

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SkillsProgressNew />
              <BadgesGridNew />
              <RecentActivityNew />
            </div>

            <div className="space-y-6">
              <StreakSectionNew streak={streak} />
              <DailyGoalNew
                goal={dailyGoal}
                progress={dailyProgress}
                onChangeGoal={updateDailyGoal}
              />
              <ProfileSettings />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
