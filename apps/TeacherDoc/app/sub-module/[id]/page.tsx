import { prisma } from '@/lib/prisma';
import SubModuleClient from '@/app/_components/SubModuleClient';
import { notFound } from 'next/navigation';

export default async function SubModulePage({
  params,
}: {
  params: { id?: string } | Promise<{ id?: string }>;
}) {
  const resolved = await Promise.resolve(params);
  const subModuleId = resolved?.id;

  if (!subModuleId) return notFound(); // эсвэл return <div>Invalid id</div>

  const sub = await prisma.subModule.findUnique({
    where: { id: subModuleId },
    select: { id: true, name: true, moduleId: true },
  });

  if (!sub) return notFound();

  return (
    <SubModuleClient
      subModuleId={sub.id}
      moduleId={sub.moduleId}
      subModuleName={sub.name}
      teachers={[]}
      teacherId={null}
    />
  );
}
