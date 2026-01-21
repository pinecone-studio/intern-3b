export function mapCourseFromDb(skill: any) {
  if (!skill?.Lesson) return null;

  return {
    id: skill.id,

    titleMn: skill.name,
    subtitleMn: `${skill.Lesson.length} хичээл`,
    icon: '📘',
    xpReward: skill.Lesson.length * 50,

    lessons: skill.Lesson.map((lesson: any) => ({
      id: lesson.id,
      title: lesson.title,
      questionCount: lesson._count?.questions ?? 0,
    })),
  };
}
