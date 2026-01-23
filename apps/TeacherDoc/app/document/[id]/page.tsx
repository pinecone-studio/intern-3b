import BackButton from '@/app/_components/BackButton';
import { prisma } from '@/lib/prisma';

export default async function DocumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const doc = await prisma.document.findUnique({
    where: { id },
  });

  if (!doc) return <div className="p-10">Document олдсонгүй</div>;

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <BackButton />

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-white p-8 shadow-[0_20px_60px_rgba(5,150,105,0.08)]">
          <h1 className="text-3xl font-extrabold text-slate-900">
            {doc.title}
          </h1>

          <div className="mt-2 text-sm font-semibold text-slate-500">
            Teacher:{' '}
            <span className="text-slate-700">{doc.teacherId ?? '—'}</span>
          </div>

          <div className="mt-6 h-px bg-linear-to-r from-emerald-100 via-slate-100 to-orange-100" />

          <div
            className="prose prose-slate max-w-none mt-6 prose-p:leading-relaxed prose-a:text-emerald-700"
            dangerouslySetInnerHTML={{ __html: doc.richText }}
          />

          {doc.image?.map((url: string) => (
            <img key={Math.random()} src={url} />
          ))}
        </div>
      </div>
    </div>
  );
}
