import { HomepageHeader } from '@/components/homepage-header';
import { HomepageFooter } from '@/components/homepage-footer';
import { MajorCard } from '@/components/major-card';
import { getMajors } from '@/lib/data';
import { Major } from '@/lib/types';

export const metadata = {
  title: 'Tech Majors | Mongodingo',
  description: 'Explore technology career paths and majors',
};

export default async function MajorsPage() {
  const majors = await getMajors();
  return (
    <div className="min-h-screen">
      <HomepageHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Технологийн мэргэжлүүд
            </h1>
            <p className="text-xl text-muted-foreground">
              {'Choose your tech career path and start learning today'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {majors.map((major: Major, index: number) => (
              <MajorCard key={major.id} major={major} index={index} />
            ))}
          </div>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}
