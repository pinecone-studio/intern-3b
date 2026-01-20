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
    <div className="min-h-screen dark relative overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/2 -left-1/2 h-[120%] w-[120%] rounded-full bg-gradient-to-br from-primary/25 via-secondary/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 h-[120%] w-[120%] rounded-full bg-gradient-to-tl from-secondary/25 via-primary/15 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <LearningHeader />

      <main className="relative z-10 container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-6xl space-y-8"
        >
          <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="p-5 sm:p-6">
              <ProfileHeroNew xp={xp} level={level} streak={streak} />
            </div>
          </div>

          <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="p-5 sm:p-6">
              <StatsGridNew />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="p-5 sm:p-6">
                  <SkillsProgressNew />
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="p-5 sm:p-6">
                  <BadgesGridNew />
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="p-5 sm:p-6">
                  <RecentActivityNew />
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-4">
              <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="p-5 sm:p-6">
                  <StreakSectionNew streak={streak} />
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="p-5 sm:p-6">
                  <DailyGoalNew
                    goal={dailyGoal}
                    progress={dailyProgress}
                    onChangeGoal={updateDailyGoal}
                  />
                </div>
              </div>

              <div className="rounded-3xl border border-border/40 bg-background/40 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="p-5 sm:p-6">
                  <ProfileSettings />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
