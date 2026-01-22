'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import AddButton from '@/app/_components/AddLessonBtn';
import { BookOpen, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Teacher = { id: string; name: string };

type DocumentItem = {
  id: string;
  title: string;
  richText: string;
  teacherId: string;
  subModuleId: string;
  moduleId: string;
};

export default function SubModuleClient(props: {
  subModuleId: string;
  moduleId: string;
  subModuleName: string;
  teachers?: Teacher[];
  teacherId?: string | null;
}) {
  const { subModuleId, moduleId, subModuleName, teacherId } = props;

  const router = useRouter();

  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  const fetchDocuments = useCallback(async () => {
    setLoadingDocs(true);
    try {
      const qs = new URLSearchParams({ subModuleId, moduleId });

      const res = await fetch(`/api/document?${qs.toString()}`, {
        method: 'GET',
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Fetch documents failed:', data);
        setDocuments([]);
        return;
      }

      setDocuments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setDocuments([]);
    } finally {
      setLoadingDocs(false);
    }
  }, [subModuleId, moduleId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const safeDocuments = useMemo(
    () => (Array.isArray(documents) ? documents : []),
    [documents],
  );

  const goDetail = (docId: string) => {
    router.push(`/document/${docId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-white">
      {/* subtle pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M42 40v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM8 40v-4H6v4H2v2h4v4h2v-4h4v-2H8zM42 8V4h-2v4h-4v2h4v4h2V10h4V8h-4zM8 8V4H6v4H2v2h4v4h2V10h4V8H8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-376 px-6 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-2 text-sm font-bold text-emerald-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Материалын сан • Дэд сэдэв
          </div>

          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                {subModuleName}
              </h1>
              <p className="mt-1 text-slate-500 font-medium">
                Материалуудыг эндээс үзэх, нэмэх боломжтой
              </p>
            </div>
          </div>
        </div>

        {/* Description card */}
        <div className="mb-10 rounded-3xl border border-emerald-100 bg-white/80 p-8 shadow-[0_20px_60px_rgba(5,150,105,0.08)] backdrop-blur">
          <div className="flex items-start gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <BookOpen className="h-6 w-6" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-extrabold text-slate-900">
                Хичээлийн тайлбар
              </h2>
              <p className="mt-2 text-slate-700 leading-relaxed">
                Магадлалын үзэгдэл, тэдгээрийн төрөл, шинж чанарыг судална.
              </p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-extrabold text-slate-900">
              Материалууд
            </h2>
            <span className="text-sm font-semibold text-slate-500">
              {safeDocuments.length} материал
            </span>
          </div>

          {loadingDocs ? (
            <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-slate-600 shadow-sm">
              <div className="flex items-center gap-3 font-bold text-emerald-700">
                <Loader2 className="h-5 w-5 animate-spin" />
                Уншиж байна...
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Материалуудыг серверээс ачааллаж байна.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* ✅ Documents cards (CLICKABLE) */}
              {safeDocuments.map((d) => (
                <div
                  key={d.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => goDetail(d.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') goDetail(d.id);
                  }}
                  className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition
                             hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-200/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                        {d.title}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-slate-500">
                        Teacher: {d.teacherId || '—'}
                      </div>
                    </div>

                    <div className="h-10 w-10 rounded-2xl bg-emerald-50 grid place-items-center text-emerald-700">
                      <BookOpen className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-4 h-px bg-linear-to-r from-emerald-100 via-slate-100 to-orange-100" />

                  {/* ✅ preview: их урт байвал хэт томрохоос сэргийлж clamp */}
                  <div
                    className="prose prose-slate max-w-none mt-4 prose-p:leading-relaxed prose-a:text-emerald-700 prose-strong:text-slate-900 line-clamp-6"
                    dangerouslySetInnerHTML={{ __html: d.richText }}
                  />

                  <div className="mt-5 flex items-center justify-between text-xs font-bold">
                    {/* <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">
                      {d.subModuleId.slice(0, 8)}…
                    </span> */}
                    <span className="text-slate-400 group-hover:text-slate-500 transition">
                      ID: {d.id.slice(0, 8)}…
                    </span>
                  </div>
                </div>
              ))}

              {/* ✅ AddButton always at the END */}
              <AddButton
                moduleId={moduleId}
                subModuleId={subModuleId}
                teacherId={teacherId}
                onSaved={fetchDocuments}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
