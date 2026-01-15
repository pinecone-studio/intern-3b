'use client';

import { motion } from 'framer-motion';

import { ProfileHero } from '@/components/profile-hero';
import { StatsOverview } from '@/components/stats-overview';
import { BadgesShowcase } from '@/components/badges-showcase';

import { AchievementsTimeline } from '@/components/achievements-timeline';
import { ProfileActivity } from '@/components/profile-activity';
import { LearningHeader } from '@/components/learning.header';
import { SkillsRadar } from '@/components/skills-radar';

export default function ProfilePage() {
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
          <ProfileHero />

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <StatsOverview />
              <SkillsRadar />
              <AchievementsTimeline />
            </div>

            <div className="space-y-6">
              <BadgesShowcase />
              <ProfileActivity />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
