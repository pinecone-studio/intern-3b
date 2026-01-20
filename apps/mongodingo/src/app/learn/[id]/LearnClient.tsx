'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useUser } from '@/lib/user-store';
import { LessonView } from '@/components/lesson-view';
import { LessonComplete } from '@/components/lesson-complete';
import { LearningHeader } from '@/components/learning.header';
import { CourseLessonTree } from '@/components/course-lesson-tree';
import { FeaturedCourseCard } from '@/components/featured-course-card';
import { CourseListCard } from '@/components/course-list-card';
import { mapLessonToQuiz } from '@/lib/mapLessonToQuiz';
import { mapCourseFromDb } from '@/lib/mapCourseFromDb';

type View = 'major' | 'course' | 'lesson' | 'completion';

export default function LearnClient({ majorId }: { majorId: string }) {
  const { completedLessons, completeLesson, updateStreak } = useUser();

  const [major, setMajor] = useState<any | null>(null);
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<View>('major');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [lastXpEarned, setLastXpEarned] = useState(0);

  // ✅ fetch MAJOR by slug
  useEffect(() => {
    fetch(`/api/learn/${majorId}`)
      .then(async (res) => {
        if (!res.ok) {
          console.error('API error', res.status);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setMajor(data);
      });
  }, [majorId]);

  useEffect(() => {
    updateStreak();
  }, [updateStreak]);

  // ✅ fetch lesson when entering lesson view
  useEffect(() => {
    if (currentView === 'lesson' && activeLessonId) {
      fetch(`/api/lessons/${activeLessonId}`)
        .then((res) => res.json())
        .then((lesson) => {
          setActiveLesson(mapLessonToQuiz(lesson));
        });
    }
  }, [currentView, activeLessonId]);

  if (!major) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }
  // 🔒 NORMALIZE COURSES ONCE (THIS IS THE SOURCE OF TRUTH)
  const courses = (major.Skill ?? [])
    .filter((skill: any) => Array.isArray(skill.Lesson))
    .map(mapCourseFromDb)
    .filter((course: any) => course && course.lessons.length > 0);

  const currentCourse = courses.find(
    (course: any) => course.id === selectedCourseId,
  );

  const getFeaturedCourse = () => {
    const inProgress = courses.find((course: any) => {
      const completed = course.lessons.filter((l: any) =>
        completedLessons.includes(l.id),
      ).length;

      return completed > 0 && completed < course.lessons.length;
    });

    return inProgress || courses[0];

    return mapCourseFromDb(inProgress || major.Skill[0]);
  };

  const featuredCourse = getFeaturedCourse();

  const getCourseStatus = (course: any) => {
    const completed = course.lessons.filter((l: any) =>
      completedLessons.includes(l.id),
    ).length;

    if (completed === course.lessons.length && course.lessons.length > 0)
      return 'completed';
    if (completed > 0) return 'in-progress';
    return 'in-progress';
  };

  const getCourseProgress = (course: any): number => {
    if (!course.lessons.length) return 0;

    const completed = course.lessons.filter((l: any) =>
      completedLessons.includes(l.id),
    ).length;

    return (completed / course.lessons.length) * 100;
  };

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

  if (currentView === 'lesson') {
    if (!activeLesson) {
      return (
        <div className="flex items-center justify-center h-screen">
          Ачаалж байна...
        </div>
      );
    }

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
        <LearningHeader />
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

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          {featuredCourse && (
            <FeaturedCourseCard
              course={featuredCourse}
              onClick={handleFeaturedCourseClick}
            />
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-6">Таны мэргэжлийн зам</h2>

          <div className="space-y-4">
            {courses.map((course: any, index: number) => {
              const status = getCourseStatus(course);
              const progress = getCourseProgress(course);
              const lessonsCompleted = course.lessons.filter((lesson: any) =>
                completedLessons.includes(lesson.id),
              ).length;

              return (
                <motion.div
                  key={course.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {courses.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <p className="text-lg font-medium">
                        Контент бэлдэгдэж байна 🚧
                      </p>
                      <p className="mt-2 text-sm">
                        Энэ мэргэжлийн сургалтын хичээлүүд удахгүй нэмэгдэнэ.
                      </p>
                    </div>
                  ) : (
                    courses.map((course: any, index: any) => (
                      <CourseListCard
                        key={index}
                        course={course}
                        status={status}
                        progress={progress}
                        lessonsCompleted={lessonsCompleted}
                        onClick={() => handleCourseClick(course.id)}
                      />
                    ))
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
