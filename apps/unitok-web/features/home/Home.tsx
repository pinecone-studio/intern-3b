import { redirect } from 'next/navigation';
import { Search, Home } from 'lucide-react';
import {
  mockCourses,
  mockReviews,
  // mockTicketHistory,
  // calculateTotalTickets,
} from '../../lib/mock-data';
import { AppHeader } from '@/components/AppHeader';
import { BottomNav } from '@/components/BottomNav';
import { HomeFeed } from './_components/HomeFeed';
import { Course } from './types';
import TicketButton from './_components/TicketButton';
import ModeToggleButton from './_components/ModeToggleButton';
import SearchButton from './_components/SearchButton';

export default function HomePage() {
  // const currentTickets = calculateTotalTickets(mockTicketHistory);

  const navItems = [
    {
      id: 'home',
      label: 'Нүүр',
      icon: <Home className="h-5 w-5" />,
      onClick: () => redirect('/'),
    },
    {
      id: 'search',
      label: 'Хайх',
      icon: <Search className="h-5 w-5" />,
      onClick: () => redirect('/search'),
    },
  ];

  const handleSelectCourse = (course: Course) => {
    redirect(`/courses/${course.id}`);
  };

  // if (!isAuthenticated) {
  //   return <Login onLogin={() => setIsAuthenticated(true)} />;
  // }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader
        title="unitok"
        actions={
          <>
            <TicketButton />
            <ModeToggleButton />
            <SearchButton />
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
