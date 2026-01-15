
import { DailyLessonCard } from '@/components/daily-lesson-card';
import { SkillPathCard } from '@/components/skill-path-card';
import { StreakCard } from '@/components/streak-card';
import { ProgressStatsCard } from '@/components/progress-stats-card';
import { LeaderboardCard } from '@/components/leaderboard-card';
import { LearningHeader } from '@/components/learning.header';

export const metadata = {
  title: 'Learn | Mongodingo',
  description: 'Your personalized tech learning dashboard',
};

export default function LearnPage() {
  return (
    <div className="min-h-screen dark">
      <LearningHeader/>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Left/Center */}
          <div className="lg:col-span-2 space-y-6">
            <DailyLessonCard />
            <SkillPathCard />
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            <StreakCard />
            <ProgressStatsCard />
            <LeaderboardCard />
          </div>
        </div>
      </main>
    </div>
  );
}
