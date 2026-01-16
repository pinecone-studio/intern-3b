'use client';

import { AppHeader } from '@/components/AppHeader';
import { BottomNav } from '@/components/BottomNav';
import HomePageMainSection from '@/components/HomePageMainSection';
import AppHeaderAction from '@/components/AppHeaderAction';
import { mockCourses, mockReviews, mockTicketHistory } from '@/lib/constants';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Course, TicketHistoryItem } from '@/lib/types';
import { Home, Search } from 'lucide-react';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<
    'home' | 'search' | 'ticketHistory'
  >('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'course' | 'professor'>(
    'course',
  );

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [ticketHistory] = useState<TicketHistoryItem[]>(mockTicketHistory);
  const currentTickets = useMemo(
    () => ticketHistory.reduce((sum, item) => sum + item.amount, 0),
    [ticketHistory],
  );

  useEffect(() => {
    if (currentPage === 'search' && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [currentPage, searchQuery, searchType]);

  const navItems = [
    {
      id: 'home',
      label: 'Нүүр',
      icon: <Home className="h-5 w-5" />,
      onClick: () => setCurrentPage('home'),
    },
    {
      id: 'search',
      label: 'Хайх',
      icon: <Search className="h-5 w-5" />,
      onClick: () => setCurrentPage('search'),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader
        title="Үнэлгээ"
        actions={
          <AppHeaderAction
            setCurrentPage={setCurrentPage}
            currentTickets={currentTickets}
          />
        }
      />

      <HomePageMainSection
        mockReviews={mockReviews}
        mockCourses={mockCourses}
        setSelectedCourse={setSelectedCourse}
      />

      <BottomNav items={navItems} activeId="home" />
    </div>
  );
}
