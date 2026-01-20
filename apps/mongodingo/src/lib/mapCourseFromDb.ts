export function mapCourseFromDb(skill: any) {
  if (!skill) return null;

  const lessons = skill.Lesson ?? [];

  return {
    id: skill.id,
    icon: '📘', // ✅ DEFAULT ICON (REQUIRED BY UI)
    titleMn: skill.name, // or skill.nameMn if you add later
    subtitleMn: skill.name,
    lessons,
  };
}
