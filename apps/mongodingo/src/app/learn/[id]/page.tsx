import LearnClient from './LearnClient';

export default async function LearnPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LearnClient majorId={id} />;
}
