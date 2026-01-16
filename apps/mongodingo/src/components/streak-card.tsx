'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Flame, Calendar } from 'lucide-react';

const weekDays = [
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: true },
  { day: 'Thu', completed: false },
  { day: 'Fri', completed: false },
  { day: 'Sat', completed: false },
  { day: 'Sun', completed: false },
];

export function StreakCard({ user }: { user: any }) {
  return (
    <Card className="p-6 bg-gradient-to-br from-orange-500/10 via-card to-card border-orange-500/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
          <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
        </div>
        <div>
          <div className="text-3xl font-bold text-orange-500">12 Day</div>
          <div className="text-sm text-muted-foreground">Current Streak</div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Longest Streak</span>
          <span className="font-semibold">18 days</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Days</span>
          <span className="font-semibold">45 days</span>
        </div>
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>This Week</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((item, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="text-center"
            >
              <div
                className={`w-full aspect-square rounded-lg flex items-center justify-center mb-1 ${
                  item.completed
                    ? 'bg-orange-500/20 border-2 border-orange-500'
                    : 'bg-muted/30 border-2 border-border'
                }`}
              >
                {item.completed && (
                  <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                )}
              </div>
              <div className="text-xs text-muted-foreground">{item.day}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}
