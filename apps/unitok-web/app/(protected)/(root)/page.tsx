'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, Ticket } from 'lucide-react';
import { Button } from '@intern-3b/shadcn';
import { Login } from '@/components/Login';
import { Course } from '@/lib/types';
import {
  calculateTotalTickets,
  mockCourses,
  mockReviews,
  mockTicketHistory,
} from '@/lib/constants';
import { AppHeader } from '@/components/AppHeader';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import { IconButton } from '@/components/IconButton';
import { BottomNav } from '@/components/BottomNav';
import { HomeFeed } from '@/components/HomeFeed';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const currentTickets = calculateTotalTickets(mockTicketHistory);

  const navItems = [
    {
      id: 'home',
      label: 'Нүүр',
      icon: <Home className="h-5 w-5" />,
      onClick: () => router.push('/'),
    },
    {
      id: 'search',
      label: 'Хайх',
      icon: <Search className="h-5 w-5" />,
      onClick: () => router.push('/search'),
    },
  ];

  const handleSelectCourse = (course: Course) => {
    router.push(`/courses/${course.id}`);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader
        title="Үнэлгээ"
        actions={
          <>
            <Button
              onClick={() => router.push('/tickets')}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/30 hover:bg-accent/50 active:bg-accent transition-colors"
            >
              <Ticket className="h-4 w-4 text-foreground" />
              <span className="text-sm font-semibold text-foreground">
                {currentTickets}           
              </span>
            </Button>
            <ThemeToggleButton />
            <IconButton
              icon={<Search className="h-5 w-5" />}
              label="Хайх"
              onClick={() => router.push('/search')}
            />
          </>
        }
      />

      <main className="flex-1 overflow-y-auto pb-20">
        <HomeFeed
          reviews={mockReviews}
          courses={mockCourses}
          onSelectCourse={handleSelectCourse}
        />
      </main>

      <BottomNav items={navItems} activeId="home" />
    </div>
  );
}
