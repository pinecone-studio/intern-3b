'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Clock, AlertTriangle } from 'lucide-react';

const problems = [
  {
    icon: Search,
    title: 'Endless Searching',
    description: 'Олон цаг зарцуулж мэдээлэл хайна',
  },
  {
    icon: HelpCircle,
    title: 'Still Confused',
    description: 'Мэргэжлийн талаар ойлголт тодорхойгүй',
  },
  {
    icon: Clock,
    title: 'Time Wasted',
    description: 'Үр дүнгүй зүйлд цаг зарцуулна',
  },
  {
    icon: AlertTriangle,
    title: 'Wrong Choices',
    description: 'Буруу сонголт хийх эрсдэл өндөр',
  },
];

export function HomepageProblem() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {"The Problem We're Solving"}
          </h2>
          <p className="text-xl text-muted-foreground">
            Оюутнуудын тулгардаг асуудлууд
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="p-6 h-full backdrop-blur-sm bg-card/50 border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
