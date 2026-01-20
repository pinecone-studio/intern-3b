'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Home } from 'lucide-react';
import { Input } from '@intern-3b/shadcn';

import { Suspense } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { BottomNav } from '@/components/BottomNav';
import { mockCourses } from '@/lib/constants';
import { Course } from '@/lib/types';
import { SearchFilters } from '@/components/SearchFilters';
import { CourseSearchResultItem } from '@/components/CourseSearchResultItem';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialType =
    (searchParams.get('type') as 'course' | 'professor') || 'course';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<'course' | 'professor'>(
    initialType,
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

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

  const filteredCourses = mockCourses.filter((course: Course) => {
    const query = searchQuery.toLowerCase();
    if (searchType === 'course') {
      return course.name.toLowerCase().includes(query);
    } else {
      return course.professor.toLowerCase().includes(query);
    }
  });

  const handleSelectCourse = (course: Course) => {
    router.push(`/courses/${course.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader title="Хайх" />

      <div className="px-4 py-2 bg-card border-b border-border">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Хайх..."
            className="pl-10 h-10 bg-background border-border text-foreground rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <SearchFilters searchType={searchType} onChange={setSearchType} />
      </div>

      <main className="flex-1 overflow-y-auto pb-20">
        {filteredCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
            <Search className="h-12 w-12 text-muted-foreground/40 mb-3" />
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Үр дүн олдсонгүй
            </h3>
            <p className="text-xs text-muted-foreground">
              Өөр түлхүүр үгээр хайж үзнэ үү
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredCourses.map((course: Course) => (
              <button
                key={course.id}
                onClick={() => handleSelectCourse(course)}
                className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors active:bg-accent"
              >
                <CourseSearchResultItem
                  course={course}
                  searchType={searchType}
                />
              </button>
            ))}
          </div>
        )}
      </main>

      <BottomNav items={navItems} activeId="search" />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageContent />
    </Suspense>
  );
}
