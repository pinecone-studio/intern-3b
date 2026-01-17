'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { majors } from '@/lib/majors-learning-data';
import type { Course } from '@/lib/majors-learning-data';
import { useUser } from '@/lib/user-store';
import { LessonView } from '@/components/lesson-view';
import { LessonComplete } from '@/components/lesson-complete';
import { LearningHeader } from '@/components/learning.header';
import { CourseLessonTree } from '@/components/course-lesson-tree';
import { FeaturedCourseCard } from '@/components/featured-course-card';
import { CourseListCard } from '@/components/course-list-card';

type View = 'major' | 'course' | 'lesson' | 'completion';

export default function LearnPage() {
  const { selectedMajorId, completedLessons, completeLesson, updateStreak } =
    useUser();

  const [currentView, setCurrentView] = useState<View>('major');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [lastXpEarned, setLastXpEarned] = useState(0);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // Get current major and course
  const currentMajor =
    majors.find((m) => m.id === selectedMajorId) || majors[0];
  const currentCourse = currentMajor.courses.find(
    (c) => c.id === selectedCourseId,
  );
  const activeLesson = currentCourse?.lessons.find(
    (l) => l.id === activeLessonId,
  );

  // Get featured course (next in-progress or first incomplete)
  const getFeaturedCourse = (): Course => {
    const inProgress = currentMajor.courses.find((course) => {
      const completed = course.lessons.filter((l) =>
        completedLessons.includes(l.id),
      ).length;
      return completed > 0 && completed < course.lessons.length;
    });
    return inProgress || currentMajor.courses[0];
  };

  const featuredCourse = getFeaturedCourse();

  // Get course status
  const getCourseStatus = (
    course: Course,
  ): 'locked' | 'in-progress' | 'completed' => {
    const completed = course.lessons.filter((l) =>
      completedLessons.includes(l.id),
    ).length;
    if (completed === course.lessons.length && course.lessons.length > 0)
      return 'completed';
    if (completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getCourseProgress = (course: Course): number => {
    if (course.lessons.length === 0) return 0;
    const completed = course.lessons.filter((l) =>
      completedLessons.includes(l.id),
    ).length;
    return (completed / course.lessons.length) * 100;
  };

  // Handlers
  const handleFeaturedCourseClick = () => {
    setSelectedCourseId(featuredCourse.id);
    setCurrentView('course');
  };

  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course');
  };

  const handleLessonClick = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
  };

  const handleLessonComplete = (xpEarned: number) => {
    setLastXpEarned(xpEarned);
    if (activeLessonId) {
      completeLesson(activeLessonId, xpEarned);
    }
    setCurrentView('completion');
  };

  const handleCompletionContinue = () => {
    setActiveLessonId(null);
    setCurrentView('course');
  };

  const handleBackToMajor = () => {
    setSelectedCourseId(null);
    setCurrentView('major');
  };

  const handleExitLesson = () => {
    setActiveLessonId(null);
    setCurrentView('course');
  };

  if (currentView === 'lesson' && activeLessonId && activeLesson) {
    return (
      <LessonView
        lesson={activeLesson}
        onComplete={handleLessonComplete}
        onExit={handleExitLesson}
      />
    );
  }

  if (currentView === 'completion' && activeLesson) {
    return (
      <LessonComplete
        lessonTitle={activeLesson.titleMn}
        xpEarned={lastXpEarned}
        onContinue={handleCompletionContinue}
      />
    );
  }

  if (currentView === 'course' && currentCourse) {
    return (
      <div className="min-h-screen dark">
        <LearningHeader/>
        <main className="container mx-auto px-4 py-8">
          <CourseLessonTree
            course={currentCourse}
            completedLessons={completedLessons}
            onLessonClick={handleLessonClick}
            onBack={handleBackToMajor}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark">
      <LearningHeader />

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Суралцах</h1>
          <p className="text-lg text-muted-foreground">
            Өөрийн мэргэжлээр үргэлжлүүлэн суралцаарай
          </p>
        </motion.div>

        {/* Featured Course */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <FeaturedCourseCard
            course={featuredCourse}
            onClick={handleFeaturedCourseClick}
          />
        </motion.div>

        {/* Major Path Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Таны мэргэжлийн зам</h2>

          <div className="space-y-4">
            {currentMajor.courses.map((course, index) => {
              const status = getCourseStatus(course);
              const progress = getCourseProgress(course);
              const lessonsCompleted = course.lessons.filter((l) =>
                completedLessons.includes(l.id),
              ).length;

              return (
                <motion.div
                  key={course.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <CourseListCard
                    course={course}
                    status={status}
                    progress={progress}
                    lessonsCompleted={lessonsCompleted}
                    onClick={() => handleCourseClick(course.id)}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
