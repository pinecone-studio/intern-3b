import { notFound } from 'next/navigation';
import Link from 'next/link';
import { HomepageHeader } from '@/components/homepage-header';
import { HomepageFooter } from '@/components/homepage-footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getMajorById } from '@/lib/majors-data';
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle2,
  Route,
  Layers,
  Code2,
  Bug,
  GitBranch,
  Database,
  ShieldCheck,
  Cloud,
  Briefcase,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: 'Software Engineering Intro | Mongodingo',
  description:
    'Software Engineering major documentary / introduction for beginners',
};

const VIDEO_URL =
  'https://www.youtube.com/embed/AlqTPomaSLA?start=0&rel=0&modestbranding=1';

export default async function LearnIntroPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id !== 'software-engineering') notFound();

  const major = await getMajorById(id);
  if (!major) notFound();

  return (
    <div className="min-h-screen">
      <HomepageHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Button variant="ghost" className="mb-6" asChild>
            <Link href={`/majors/${major.id}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Буцах
            </Link>
          </Button>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{major.name} — Танилцуулга</h1>
              {major.demandLabel ? <Badge>{major.demandLabel}</Badge> : null}
            </div>

            <p className="text-xl text-muted-foreground mb-4">
              {major.nameMn ?? 'Програм хангамжийн инженерчлэл'}
            </p>

            <p className="text-lg text-foreground/80 leading-relaxed">
              {major.overviewMn ??
                'Software Engineering нь хэрэглэгчийн хэрэгцээг бодит бүтээгдэхүүн болгож (design → develop → test → deploy), хугацаанд нь чанартайгаар гаргах инженерчлэлийн арга барил юм.'}
            </p>
          </div>

          <Card className="p-6 md:p-8 mb-10 backdrop-blur-sm bg-card/60 border-border/60">
            <div className="flex items-center gap-3 mb-4">
              <PlayCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Танилцуулга видео</h2>
            </div>

            <div className="rounded-2xl overflow-hidden border bg-muted/20">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={VIDEO_URL}
                  title="Software Engineering Intro"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              Зөвлөгөө: Видеог үзээд доорх хэсгүүдийг уншвал “яагаад энэ
              мэргэжил хэрэгтэй вэ” илүү тодорхой болно.
            </p>
          </Card>

          <Card className="p-6 md:p-8 mb-10 backdrop-blur-sm bg-card/60 border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">
                Software Engineering гэж яг юу вэ?
              </h2>
            </div>

            <p className="text-muted-foreground mb-6">
              “Програм бичих” гэдэг нь зөвхөн нэг хэсэг. Software Engineering
              бол: бүтээгдэхүүн төлөвлөх, зөв архитектур сонгох, кодоо багийн
              стандартаар бичих, тестлэх, алдаа засах, аюулгүй байдал, deploy
              хийх, хэрэглэгчийн асуудлыг шийдэх гэх мэт бүтээгдэхүүн бүтээх бүх
              цикл.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-xl border bg-background/40 p-4">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <Route className="w-4 h-4 text-primary" />
                  Problem → Solution
                </div>
                <div className="text-sm text-muted-foreground">
                  Бодит асуудлыг ойлгоод шийдэл болгон хувиргана.
                </div>
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <Layers className="w-4 h-4 text-primary" />
                  Quality & Scale
                </div>
                <div className="text-sm text-muted-foreground">
                  Чанартай, өргөжих боломжтой систем бүтээнэ.
                </div>
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Team & Process
                </div>
                <div className="text-sm text-muted-foreground">
                  Багтай ажиллах процесс (Git, review, agile) маш чухал.
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 mb-10 backdrop-blur-sm bg-card/60 border-border/60">
            <h2 className="text-2xl font-bold mb-2">
              Бусад технологийн мэргэжлүүдээс юугаараа ялгаатай вэ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Шинээр сонгож байгаа хүнд хамгийн чухал нь: “Би яг юу хийж ажиллах
              вэ?” гэдэг.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border bg-background/40 p-4">
                <div className="font-semibold">
                  Software Engineering vs Computer Science
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  CS нь онол/суурь (алгоритм, тооцооллын онол) хүчтэй. SE нь тэр
                  суурийг ашиглаад <b>бодит бүтээгдэхүүн</b> болтол нь системтэй
                  хөгжүүлж гаргах (process, quality, delivery) талдаа илүү
                  төвлөрнө.
                </div>
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="font-semibold">
                  Software Engineering vs Data Science / AI
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  DS/AI нь өгөгдөл, загвар, анализ, prediction дээр төвлөрнө. SE
                  нь тэрхүү AI/DS шийдлийг ч гэсэн <b>app/product</b> дотор
                  найдвартай ажиллуулж, хэрэглэгчид хүргэх инженерчлэлд
                  төвлөрнө.
                </div>
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="font-semibold">
                  Software Engineering vs Cybersecurity
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Security нь хамгаалалт, халдлага/эрсдэл, аудит, хамгаалалтын
                  архитектур. SE нь үндсэндээ бүтээгдэхүүн бүтээнэ — харин сайн
                  SE бол security-г заавал ойлгож хэрэгжүүлдэг.
                </div>
              </div>

              <div className="rounded-xl border bg-background/40 p-4">
                <div className="font-semibold">
                  Software Engineering vs DevOps / Cloud
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  DevOps/Cloud нь deploy, infra, automation, monitoring. SE нь
                  үндсэн app-аа хөгжүүлнэ. Гэхдээ орчин үеийн SE нь CI/CD,
                  cloud-ийн суурийг мэддэг байх шаардлагатай.
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 md:p-8 mb-10 backdrop-blur-sm bg-card/60 border-border/60">
            <h2 className="text-2xl font-bold mb-2">Юу сурах вэ?</h2>
            <p className="text-muted-foreground mb-6"></p>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: Code2,
                  title: 'Програмчлалын суурь',
                  desc: 'Хувьсагч, нөхцөл, давталт, функц, өгөгдлийн бүтэц.',
                },
                {
                  icon: Bug,
                  title: 'Debugging & testing',
                  desc: 'Алдаа олж засах, unit test, найдвартай код.',
                },
                {
                  icon: GitBranch,
                  title: 'Git & багийн ажиллагаа',
                  desc: 'Branching, pull request, code review, collaboration.',
                },
                {
                  icon: Database,
                  title: 'Database + API',
                  desc: 'CRUD, SQL/NoSQL суурь, REST API ойлголтууд.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Security basics',
                  desc: 'Auth, permissions, аюулгүй код бичих суурь.',
                },
                {
                  icon: Cloud,
                  title: 'Deploy суурь',
                  desc: 'CI/CD ойлголт, орчинд байршуулж ажиллуулах.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border bg-background/40 p-4"
                >
                  <item.icon className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {major?.Skill?.length ? (
              <>
                <Separator className="my-6" />
                <div className="text-sm text-muted-foreground mb-3">
                  Танай major доторх course/skill-үүдээс:
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {major.Skill.slice(0, 6).map((c: any) => (
                    <div
                      key={c.id}
                      className="rounded-xl border bg-background/40 p-3"
                    >
                      <div className="font-medium">{c.nameMn ?? c.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.descriptionMn ?? c.description ?? '—'}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </Card>

          <Card className="p-6 md:p-8 mb-10 backdrop-blur-sm bg-card/60 border-border/60">
            <div className="flex items-center gap-3 mb-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Хэнд тохиромжтой вэ?</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Логик сэтгэх, асуудал задлах дуртай',
                'Тогтмол дадлага хийж сурах тэвчээртэй',
                'Бүтээгдэхүүн/апп хийх мөрөөдөлтэй',
                'Багтай ажиллах, харилцаа сайтай болох хүсэлтэй',
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div className="font-medium">{t}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg h-12 px-8"
              asChild
            >
              <Link href={`/learn/${major.id}`}>Сургалтаа эхлүүлэх</Link>
            </Button>
            <div className="text-sm text-muted-foreground mt-3">
              Эхлэхэд бэлэн бол “Сургалтаа эхлүүлэх” дээр дараарай.
            </div>
          </div>
        </div>
      </main>

      <HomepageFooter />
    </div>
  );
}
