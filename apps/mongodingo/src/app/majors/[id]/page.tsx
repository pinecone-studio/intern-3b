import { HomepageHeader } from '@/components/homepage-header';
import { HomepageFooter } from '@/components/homepage-footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMajorById, majors } from '@/lib/majors-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Code,
  Globe,
  Smartphone,
  BarChart3,
  Brain,
  Shield,
  Cloud,
  Gamepad2,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

const iconMap = {
  code: Code,
  globe: Globe,
  smartphone: Smartphone,
  'bar-chart': BarChart3,
  brain: Brain,
  shield: Shield,
  cloud: Cloud,
  gamepad: Gamepad2,
};

export function generateStaticParams() {
  return majors.map((major) => ({
    id: major.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const major = getMajorById(params.id);

  if (!major) {
    return {
      title: 'Major Not Found | Mongodingo',
    };
  }

  return {
    title: `${major.title} | Mongodingo`,
    description: major.description,
  };
}

export default function MajorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const major = getMajorById(params.id);

  if (!major) {
    notFound();
  }

  const Icon = iconMap[major.icon as keyof typeof iconMap] || Code;

  const demandColor = {
    'very-high': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    high: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    medium: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  };

  return (
    <div className="min-h-screen">
      <HomepageHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/majors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Link>
          </Button>

          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                <Icon className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold">{major.title}</h1>
                  <Badge className={`${demandColor[major.demand]} border`}>
                    {major.demandMn}
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground mb-4">
                  {major.titleMn}
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {major.overviewMn}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 backdrop-blur-sm bg-card/60 border-border/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Цалин</div>
                  <div className="font-semibold">{major.salary}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-card/60 border-border/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Ажлын байр
                  </div>
                  <div className="font-semibold">{major.jobOpenings}</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 backdrop-blur-sm bg-card/60 border-border/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Эрэлт хэрэгцээ
                  </div>
                  <div className="font-semibold">{major.demandMn}</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Skills Section */}
          <Card className="p-8 mb-12 backdrop-blur-sm bg-card/60 border-border/60">
            <h2 className="text-2xl font-bold mb-6">
              Эзэмших ёстой ур чадварууд
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {major.skillsMn.map((skill, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">{skill}</div>
                    <div className="text-sm text-muted-foreground">
                      {major.skills[index]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Skill Roadmap Preview */}
          <Card className="p-8 mb-8 backdrop-blur-sm bg-gradient-to-br from-primary/5 to-secondary/5 border-border/60">
            <h2 className="text-2xl font-bold mb-4">
              Ур чадварын замын зураглал
            </h2>
            <p className="text-muted-foreground mb-6">
              Алхам алхмаар суралцаж, бүх шаардлагатай ур чадваруудыг эзэмш
            </p>

            <div className="space-y-4 mb-6">
              {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(
                (level, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-grow h-2 rounded-full bg-primary/20">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        style={{ width: `${(4 - index) * 25}%` }}
                      />
                    </div>
                    <div className="text-sm font-medium w-24">{level}</div>
                  </div>
                ),
              )}
            </div>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-12 px-8"
              asChild
            >
              <Link href="/learn">Энэ замаар эхлэх</Link>
            </Button>
          </div>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}
