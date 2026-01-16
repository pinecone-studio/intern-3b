import { DailyLessonCard } from '@/components/daily-lesson-card';
import { SkillPathCard } from '@/components/skill-path-card';
import { StreakCard } from '@/components/streak-card';
import { ProgressStatsCard } from '@/components/progress-stats-card';
import { LeaderboardCard } from '@/components/leaderboard-card';
import { LearningHeader } from '@/components/learning.header';
import { getLearnData } from '@/lib/data';

export const metadata = {
  title: 'Learn | Mongodingo',
  description: 'Your personalized tech learning dashboard',
};

export default async function LearnPage() {
  const user = await getLearnData();

  return (
    <div className="min-h-screen dark">
      <LearningHeader user={user} />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Left/Center */}
          <div className="lg:col-span-2 space-y-6">
            <DailyLessonCard user={user} />
            <SkillPathCard user={user} />
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            <StreakCard user={user} />
            <ProgressStatsCard user={user} />
            <LeaderboardCard />
          </div>
        </div>
      </main>
    </div>
  );
}
