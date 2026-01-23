import LearnClient from '../../LearnClient';

export default function LessonPage({
  params,
}: {
  params: { id: string; lessonId: string };
}) {
  return <LearnClient majorId={params.id} />;
}
