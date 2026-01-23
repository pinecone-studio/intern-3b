'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { ExamInfo } from '../exam-info/type';
import { CourseInfoData, RatingBreakdownItem } from './type';
import { AppHeader } from '../../components/AppHeader';
import { CourseHeader } from './_components/CourseHeader';
import { CourseRatingSummary } from './_components/CourseRatingSummary';
import { CourseInfoSection } from './_components/CourseInfoSection';
import { ReviewPreviewSection } from './_components/ReviewPreviewSection';
import { ExamPreviewSection } from './_components/ExamPreviewSection';
import { TabNav } from './_components/TabNav';
import { mockExamInfos } from '../exam-info/Exam';
import { getCourseById, getReviewsByCourseId } from '../../lib/mock-data';

export default function CourseDetail() {
  const router = useRouter();
  const params = useParams();
  console.log('params:', params);

  const courseId = Number(params.id);

  if (Number.isNaN(courseId)) {
    notFound();
  }


  const course = getCourseById(courseId);
  const reviews = getReviewsByCourseId(courseId);

  const [examInfos] = useState<ExamInfo[]>(mockExamInfos);

  if (!course) {
    notFound();
  }

  const ratingBreakdown: RatingBreakdownItem[] = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  const courseInfoData: CourseInfoData = {
    assignment: {
      choices: [
        { label: 'Байхгүй', percentage: 15, selected: false },
        { label: 'Заримдаа', percentage: 55, selected: true },
        { label: 'Их', percentage: 30, selected: false },
      ],
    },
    groupWork: {
      choices: [
        { label: 'Амархан', percentage: 20, selected: false },
        { label: 'Дунд', percentage: 50, selected: true },
        { label: 'Хэцүү', percentage: 30, selected: false },
      ],
    },
    grading: {
      choices: [
        { label: 'Амархан', percentage: 45, selected: true },
        { label: 'Дунд', percentage: 40, selected: false },
        { label: 'Хэцүү', percentage: 15, selected: false },
      ],
    },
    attendance: { value: 'Нэр дуудна', count: 89 },
    examCount: { value: '2 удаа', count: 72 },
  };

  const tabItems = [
    { id: 'info', label: 'Мэдээлэл' },
    { id: 'reviews', label: 'Үнэлгээ' },
    { id: 'exam', label: 'Шалгалт' },
  ];

  const handleNavigateToSearch = (
    searchType: 'course' | 'professor',
    query: string,
  ) => {
    router.push(`/search?type=${searchType}&q=${encodeURIComponent(query)}`);
  };

  const handleTabChange = (id: string) => {
    if (id === 'reviews') {
      router.push(`/courses/${courseId}/reviews`);
    } else if (id === 'exam') {
      router.push(`/courses/${courseId}/exam`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader title="Хичээлийн дэлгэрэнгүй" onBack={() => router.back()} />

      <main className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-4 border-b border-border">
          <CourseHeader
            course={course}
            onNavigateToSearch={handleNavigateToSearch}
          />
          <CourseRatingSummary
            rating={course.rating}
            reviewCount={course.reviewCount}
            ratingBreakdown={ratingBreakdown}
          />
        </div>

        <CourseInfoSection courseInfoData={courseInfoData} />
        <ReviewPreviewSection
          reviews={reviews}
          onViewAll={() => router.push(`/courses/${courseId}/reviews`)}
        />
        <ExamPreviewSection
          examInfos={examInfos}
          onViewAll={() => router.push(`/courses/${courseId}/exam`)}
        />
      </main>

      <TabNav items={tabItems} activeId="info" onTabChange={handleTabChange} />
    </div>
  );
}
