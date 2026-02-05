import { FileText, Users, Shield, Zap, Clock, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Автомат гэрээ',
    description:
      'Хөдөлмөрийн гэрээ, нууцлалын гэрээ, ажлын байрны тодорхойлолтыг автоматаар үүсгэнэ',
    color: 'from-blue-500/20 to-blue-600/5',
    iconColor: 'text-blue-500',
  },
  {
    icon: Users,
    title: 'Ажилтны бүртгэл',
    description:
      'Ажилтнуудын бүх мэдээллийг нэг дороос удирдах, засах, хайх боломжтой',
    color: 'from-green-500/20 to-green-600/5',
    iconColor: 'text-green-500',
  },
  {
    icon: Shield,
    title: 'Аюулгүй байдал',
    description:
      'Өгөгдлийн нууцлал, хэрэглэгчийн баталгаажуулалт, нэвтрэлтийн хяналт',
    color: 'from-primary/20 to-primary/5',
    iconColor: 'text-primary',
  },
  {
    icon: Zap,
    title: 'Хурдан ажиллагаа',
    description:
      'Орчин үеийн технологи дээр суурилсан хурдан, найдвартай систем',
    color: 'from-yellow-500/20 to-yellow-600/5',
    iconColor: 'text-yellow-500',
  },
  {
    icon: Clock,
    title: 'Цаг хэмнэлт',
    description:
      'Гэрээ бэлтгэх, баримт бичиг боловсруулах ажлыг 90% хүртэл хурдасгана',
    color: 'from-orange-500/20 to-orange-600/5',
    iconColor: 'text-orange-500',
  },
  {
    icon: BarChart3,
    title: 'Тайлан статистик',
    description: 'Ажилтны статистик, хэлтсийн мэдээлэл, гүйцэтгэлийн тайлан',
    color: 'from-indigo-500/20 to-indigo-600/5',
    iconColor: 'text-indigo-500',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Боломжууд
          </span>
          <h2 className="mt-4 text-3xl lg:text-4xl font-bold text-foreground text-balance">
            HR ажлыг хялбарчлах бүх зүйл
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Манай систем нь HR менежерүүдэд зориулсан бүх шаардлагатай
            функцуудыг нэг дор багтаасан
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative bg-gradient-to-br ${feature.color} border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`h-12 w-12 rounded-xl bg-background/80 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
