import { HomepageHeader } from '@/components/homepage-header';
import { HomepageFooter } from '@/components/homepage-footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getMajorById, getAllMajors } from '@/lib/majors-data';
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
  ArrowLeft,
  CheckCircle2,
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

export async function generateStaticParams() {
  const majors = await getAllMajors();
  return majors.map((major) => ({
    id: major.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const major = await getMajorById(id);

  if (!major) {
    return {
      title: 'Major Not Found | Mongodingo',
    };
  }

  return {
    title: `${major.name} | Mongodingo`,
    description: major.description,
  };
}

export default async function MajorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const major = await getMajorById(id);

  if (!major) {
    notFound();
  }

  const Icon = iconMap[major.icon as keyof typeof iconMap] || Code;

  const demandColor = {
    VERY_HIGH: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    HIGH: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    MEDIUM: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  };
  const mockSkills = [
    {
      id: '1',
      name: 'Програмчлалын хэл (Java, Python, C++)',
      subtitle: 'Programming Languages (Java, Python, C++)',
    },
    {
      id: '2',
      name: 'Програм хангамжийн загвар',
      subtitle: 'Software Design Patterns',
    },
    {
      id: '3',
      name: 'Тестлэх ба алдаа засах',
      subtitle: 'Testing & Debugging',
    },
    {
      id: '4',
      name: 'Өгөгдлийн бүтэц ба алгоритм',
      subtitle: 'Data Structures & Algorithms',
    },
    {
      id: '5',
      name: 'Хувилбарын хяналт (Git)',
      subtitle: 'Version Control (Git)',
    },
    {
      id: '6',
      name: 'Системийн архитектур',
      subtitle: 'System Architecture',
    },
  ];

  const skillsToShow =
    major.Skill && major.Skill.length > 0 ? major.Skill : mockSkills;
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
                  <h1 className="text-4xl font-bold">{major.name}</h1>
                  <Badge className={`${demandColor[major.demandLevel]} border`}>
                    {major.demandLabel}
                  </Badge>
                </div>
                <p className="text-xl text-muted-foreground mb-4">
                  {major.nameMn}
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
                  <div className="font-semibold">{major.demandLabel}</div>
                </div>
              </div>
            </Card>
          </div>{' '}
          <Card className="p-8 mb-12 backdrop-blur-sm bg-card/60 border-border/60">
            <h2 className="text-2xl font-bold mb-6">
              Эзэмших ёстой ур чадварууд
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mockSkills.map((skill, index) => (
                <div key={skill.id} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {skill.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          {/* Details Section */}
          <Card className="p-8 mb-12 backdrop-blur-sm bg-card/60 border-border/60">
            <h2 className="text-2xl font-bold mb-6">Дэлгэрэнгүй мэдээлэл</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Ерөнхий төрөл:</h3>
                <p className="text-muted-foreground">{major.category}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Хэнд тохиромжтой:</h3>
                <p className="text-muted-foreground">{major.suitableFor}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Давуу талууд:</h3>
                <p className="text-muted-foreground">{major.advantages}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Сорилтууд:</h3>
                <p className="text-muted-foreground">{major.challenges}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Ирээдүйн төлөв:</h3>
                <p className="text-muted-foreground">{major.futureScope}</p>
              </div>
            </div>
          </Card>
          {/* SKILLS */}
          <Card className="p-8 mb-8 backdrop-blur-sm bg-gradient-to-br from-primary/5 to-secondary/5 border-border/60">
            <h2 className="text-2xl font-bold mb-4">Шаардагдах ур чадварууд</h2>
            <p className="text-muted-foreground mb-6">
              Энэ мэргэжилд шаардагдах гол ур чадварууд
            </p>
            <div className="space-y-4 mb-6">
              {skillsToShow.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="grow h-2 rounded-full bg-primary/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${100 - index * 10}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium min-w-0 flex-1">
                    {skill.name}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
          {/* Skills Section */}
          {/* {major.Skill && major.Skill.length > 0 && ( */}
          {/* <Card className="p-8 mb-8 backdrop-blur-sm bg-gradient-to-br from-primary/5 to-secondary/5 border-border/60">
            <h2 className="text-2xl font-bold mb-4">Шаардагдах ур чадварууд</h2>
            <p className="text-muted-foreground mb-6">
              Энэ мэргэжилд шаардагдах гол ур чадварууд
            </p>

            <div className="space-y-4 mb-6">
              {major.Skill.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="grow h-2 rounded-full bg-primary/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${100 - index * 20}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium min-w-0 flex-1">
                    {skill.name}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {skill.level}
                  </Badge>
                </div>
              ))}
            </div>
          </Card> */}
          {/* )} */}
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
