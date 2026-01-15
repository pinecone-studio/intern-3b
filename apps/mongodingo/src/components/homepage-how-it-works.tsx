'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { UserPlus, Search, BookOpen, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Sign Up Free',
    description: 'Үнэ төлбөргүй бүртгүүлэх',
  },
  {
    icon: Search,
    number: '02',
    title: 'Explore Tech Majors',
    description: 'Мэргэжлүүдтэй танилцах',
  },
  {
    icon: BookOpen,
    number: '03',
    title: 'Start Learning',
    description: 'Хичээл эхлүүлэх',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Track Progress',
    description: 'Явцаа хянах',
  },
];

export function HomepageHowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Хэрхэн ашиглах вэ? Дөрвөн энгийн алхам
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative"
            >
              <Card className="p-8 text-center backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-6 relative z-10">
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-5xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
