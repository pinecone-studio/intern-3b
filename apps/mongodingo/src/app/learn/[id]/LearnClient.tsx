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

  useEffect(() => {
    if (currentView !== 'lesson' || !activeLessonId) return;

    let cancelled = false;

    fetch(`/api/lessons/${activeLessonId}`)
      .then((res) => res.json())
      .then((lesson) => {
        if (!cancelled) {
          setActiveLesson(mapLessonToQuiz(lesson));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentView, activeLessonId]);

  if (!major) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  const courses = (major.Skill ?? [])
    .map(mapCourseFromDb)
    .filter((course: any) => course?.lessons?.length > 0);

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
  const getNextPlayableLesson = (course: any) => {
    return course.lessons.find(
      (lesson: any) => !completedLessons.includes(lesson.id),
    );
  };

  const nextLesson = featuredCourse
    ? getNextPlayableLesson(featuredCourse)
    : null;

  const showNextLessonCard = !!nextLesson && !!nextLesson.title;
  console.log(
    'sdadasdadsa',
    major.Skill[0].Lesson.map((l: any) => ({
      title: l.title,
      questions: l._count.questions,
    })),
  );

  console.log(
    'dsadsadsa',
    major.Skill[0].Lesson.map((l: any) => ({
      title: l.title,
      q: l._count.questions,
    })),
  );

  console.log('LESSONS FULL', featuredCourse?.lessons);

  console.log('NEXT LESSON OBJECT:', nextLesson);
  console.log(
    'LESSONS',
    featuredCourse?.lessons.map((l: any) => ({
      id: l.id,
      title: l.title,
      q: l.questionCount,
    })),
  );

  const handleFeaturedCourseClick = () => {
    if (!nextLesson) {
      alert('Энэ сургалтанд асуулттай хичээл алга байна');
      return;
    }

    setSelectedCourseId(featuredCourse.id);
    setActiveLessonId(nextLesson.id);
    setCurrentView('lesson');
  };

  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course');
  };

  const handleLessonClick = (lessonId: string) => {
    const lesson = currentCourse?.lessons.find((l: any) => l.id === lessonId);

    if (!lesson || lesson.questionCount === 0) {
      alert('Энэ хичээлд асуулт хараахан алга байна');
      return;
    }

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
    setActiveLesson(null);
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
          {featuredCourse && showNextLessonCard && nextLesson ? (
            <FeaturedCourseCard
              course={featuredCourse}
              lesson={nextLesson}
              onClick={handleFeaturedCourseClick}
            />
          ) : (
            <div className="rounded-2xl border bg-muted/40 p-8 text-center">
              <div className="text-lg font-semibold">
                Дараагийн хичээл алга байна
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Энэ сургалтанд асуулттай хичээл удахгүй нэмэгдэнэ.
              </div>
            </div>
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
            {courses.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                Контент бэлдэгдэж байна 🚧
              </div>
            ) : (
              courses.map((course: any) => (
                <CourseListCard
                  key={course.id}
                  course={course}
                  status={getCourseStatus(course)}
                  progress={getCourseProgress(course)}
                  lessonsCompleted={
                    course.lessons.filter((l: any) =>
                      completedLessons.includes(l.id),
                    ).length
                  }
                  onClick={() => handleCourseClick(course.id)}
                />
              ))
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
