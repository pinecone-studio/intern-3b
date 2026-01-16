'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { MajorCardProps } from '@/lib/types';

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

export function MajorCard({ major, index }: MajorCardProps) {
  const Icon = iconMap[major.icon as keyof typeof iconMap] || Code;

  const demandColor = {
    VERY_HIGH: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    HIGH: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    MEDIUM: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <Card className="p-6 h-full backdrop-blur-sm bg-card/60 border-border/60 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Icon className="w-7 h-7 text-primary-foreground" />
          </div>
          <Badge className={`${demandColor[major.demandLevel]} border`}>
            {major.demandLabel}
          </Badge>
        </div>

        <h3 className="text-xl font-bold mb-2">{major.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{major.nameMn}</p>
        <p className="text-sm text-foreground/80 mb-4 leading-relaxed flex-grow">
          {major.descriptionMn}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-medium">{major.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{major.jobOpeningsMn}</span>
          </div>
        </div>

        <Button className="w-full" asChild>
          <Link href={`/majors/${major.id}`}>Эхлэх</Link>
        </Button>
      </Card>
    </motion.div>
  );
}
