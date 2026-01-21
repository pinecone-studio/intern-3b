'use client';

import { Button } from '@intern-3b/shadcn';
import { Home, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { Course } from '../lib/types';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

interface BottomNavProps {
  // items: NavItem[];
  activeId: string;
}

export function BottomNav({ activeId }: BottomNavProps) {
  const router = useRouter();

  const items = [
    {
      id: 'home',
      label: 'Нүүр',
      icon: <Home className="h-5 w-5" />,
      onClick: () => router.replace('/'),
    },
    {
      id: 'search',
      label: 'Хайх',
      icon: <Search className="h-5 w-5" />,
      onClick: () => router.replace('/search'),
    },
  ];

  const handleSelectCourse = (course: Course) => {
    router.replace(`/courses/${course.id}`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border max-w-md mx-auto">
      <div className="flex items-center h-16">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <Button
              key={item.id}
              onClick={item.onClick}
              className="flex-1 flex flex-col items-center justify-center h-full gap-1 active:bg-accent/50 transition-colors min-h-12"
              aria-label={item.label}
            >
              <div
                className={isActive ? 'text-primary' : 'text-muted-foreground'}
              >
                {item.icon}
              </div>
              <span
                className={`text-xs ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
              >
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
