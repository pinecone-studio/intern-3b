export function mapLessonToQuiz(lesson: any) {
  const questions = lesson?.questions ?? [];

  return {
    id: lesson.id,
    title: lesson.title,
    titleMn: lesson.title,
    xp: lesson.xp ?? 50,
    type: questions.length > 0 ? 'quiz' : 'content',

    questions: questions.map((q: any) => ({
      id: q.id,
      question: q.question,
      questionMn: q.questionMn,
      code: q.code,
      answersMn: (q.answers ?? []).map((a: any) => a.textMn),
      correctIndex: (q.answers ?? []).findIndex((a: any) => a.isCorrect),
    })),
  };
}
