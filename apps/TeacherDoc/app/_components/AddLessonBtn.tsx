// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import dynamic from 'next/dynamic';
// import 'react-quill-new/dist/quill.snow.css';
// import {
//   Plus,
//   Sparkles,
//   X,
//   Image as ImageIcon,
//   Loader2,
//   AlertTriangle,
// } from 'lucide-react';

// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

// type AddButtonProps = {
//   moduleId: string;
//   subModuleId: string;
//   teacherId?: string | null;
//   onSaved?: () => void;
// };

// export default function AddButton({
//   moduleId,
//   subModuleId,
//   teacherId,
//   onSaved,
// }: AddButtonProps) {
//   const [open, setOpen] = useState(false);

//   const [title, setTitle] = useState('');
//   const [richTextHtml, setRichTextHtml] = useState('');
//   const [images, setImages] = useState<File[]>([]);
//   const [saving, setSaving] = useState(false);
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   const canSave = useMemo(() => {
//     const hasTitle = title.trim().length > 0;
//     const hasContent = richTextHtml.trim().length > 0;
//     return hasTitle && hasContent && !saving;
//   }, [title, richTextHtml, saving]);

//   const resetForm = () => {
//     setTitle('');
//     setRichTextHtml('');
//     setImages([]);
//     setErrorMsg(null);
//   };

//   const close = () => {
//     setOpen(false);
//     resetForm();
//   };

//   // preview urls
//   const previewUrls = useMemo(() => {
//     return images.map((f) => ({
//       file: f,
//       url: URL.createObjectURL(f),
//     }));
//   }, [images]);

//   useEffect(() => {
//     return () => {
//       previewUrls.forEach((p) => URL.revokeObjectURL(p.url));
//     };
//   }, [previewUrls]);

//   const onPickImages = (files: FileList | null) => {
//     if (!files) return;
//     const arr = Array.from(files);
//     const onlyImages = arr.filter((f) => f.type.startsWith('image/'));
//     setImages((prev) => [...prev, ...onlyImages]);
//   };

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const clearAll = () => setImages([]);

//   const save = async () => {
//     setErrorMsg(null);

//     if (!title.trim()) {
//       setErrorMsg('Гарчиг (title) оруулна уу.');
//       return;
//     }
//     if (!richTextHtml.trim()) {
//       setErrorMsg('Материалын текст (richText) оруулна уу.');
//       return;
//     }
//     if (!moduleId || !subModuleId) {
//       setErrorMsg('moduleId / subModuleId байхгүй байна.');
//       return;
//     }

//     setSaving(true);
//     try {
//       const fd = new FormData();
//       fd.append('title', title.trim());
//       fd.append('richText', richTextHtml);
//       fd.append('subModuleId', subModuleId);
//       fd.append('moduleId', moduleId);

//       if (teacherId && teacherId.trim()) {
//         fd.append('teacherId', teacherId.trim());
//       }

//       for (const img of images) {
//         fd.append('images', img);
//       }

//       const res = await fetch('/api/document', {
//         method: 'POST',
//         body: fd,
//       });

//       const data = await res.json().catch(() => ({}));

//       if (!res.ok) {
//         setErrorMsg(data?.error || 'Материал хадгалах үед алдаа гарлаа.');
//         return;
//       }

//       close();
//       onSaved?.();
//     } catch (e) {
//       console.error(e);
//       setErrorMsg('Сүлжээний алдаа: материал хадгалж чадсангүй.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* ✅ Grid-д таарах Add Card */}
//       <button
//         type="button"
//         onClick={() => setOpen(true)}
//         className="group relative w-full min-h-65 rounded-3xl border border-slate-200 bg-white/70 p-6
//                    shadow-[0_12px_30px_rgba(2,6,23,0.06)]
//                    transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(5,150,105,0.14)]"
//       >
//         {/* glow */}
//         <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-50/80 to-transparent opacity-0 transition group-hover:opacity-100" />

//         <div className="relative h-full rounded-2xl border border-dashed border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-white p-6 flex flex-col items-center justify-center text-center">
//           <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white border border-emerald-100 text-emerald-700 shadow-sm">
//             <Plus className="h-6 w-6" />
//           </div>

//           <div className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
//             Материал нэмэх
//           </div>

//           <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-700">
//             <Sparkles className="h-4 w-4" />
//             Шинэ материал оруулах
//           </div>
//         </div>
//       </button>

//       {/* ✅ Modal */}
//       {open && (
//         <div className="fixed inset-0">
//           {/* overlay */}
//           <div
//             className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
//             onClick={() => (!saving ? close() : null)}
//           />

//           <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center p-4">
//             <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_120px_rgba(2,6,23,0.35)]">
//               {/* header */}
//               <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white p-6">
//                 <div>
//                   <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-700">
//                     <Sparkles className="h-4 w-4" />
//                     Шинэ материал
//                   </div>
//                   <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
//                     Материал нэмэх
//                   </h3>
//                   <p className="mt-1 text-sm font-medium text-slate-600">
//                     Гарчиг + rich text + зургууд (сонголтоор)
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={close}
//                   disabled={saving}
//                   className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50"
//                   aria-label="Close"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* body */}
//               <div className="p-6 md:p-8 space-y-6">
//                 {errorMsg && (
//                   <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
//                     <AlertTriangle className="h-5 w-5 mt-0.5" />
//                     <div className="font-semibold">{errorMsg}</div>
//                   </div>
//                 )}

//                 {/* Title */}
//                 <div className="grid gap-2">
//                   <label className="text-sm font-bold text-slate-800">
//                     Гарчиг
//                   </label>
//                   <input
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900
//                                outline-none focus:ring-4 focus:ring-emerald-200/50"
//                     placeholder="Жишээ: Лекц 1 — Танилцуулга"
//                     disabled={saving}
//                   />
//                   <div className="text-xs text-slate-500 font-medium">
//                     {title.trim().length > 0 ? (
//                       <span className="inline-flex items-center gap-1 text-emerald-700 font-bold"></span>
//                     ) : (
//                       'Гарчиг оруулах шаардлагатай'
//                     )}
//                   </div>
//                 </div>

//                 {/* Rich text */}
//                 <div className="grid gap-2">
//                   <label className="text-sm font-bold text-slate-800">
//                     Материал (Rich Text)
//                   </label>

//                   {/* ✅ fixed height wrapper */}
//                   <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white h-55">
//                     <ReactQuill
//                       theme="snow"
//                       value={richTextHtml}
//                       onChange={setRichTextHtml}
//                       placeholder="Энд текстээ бичнэ..."
//                       className="h-full"
//                     />
//                   </div>

//                   <div className="text-xs text-slate-500 font-medium">
//                     {richTextHtml.trim().length > 0
//                       ? ''
//                       : 'Материалын текст оруулах шаардлагатай'}
//                   </div>
//                 </div>

//                 {/* Images */}
//                 <div className="grid gap-2">
//                   <div className="flex items-center justify-between gap-3">
//                     <label className="text-sm font-bold text-slate-800">
//                       Зургууд (сонголтоор)
//                     </label>

//                     {images.length ? (
//                       <button
//                         type="button"
//                         className="text-xs font-bold text-red-600 hover:underline"
//                         onClick={clearAll}
//                         disabled={saving}
//                       >
//                         Бүгдийг арилгах ({images.length})
//                       </button>
//                     ) : null}
//                   </div>

//                   <div className="flex flex-wrap items-center gap-3">
//                     <label className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 hover:bg-slate-50">
//                       <ImageIcon className="h-5 w-5 text-emerald-700" />
//                       Зураг сонгох
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         className="hidden"
//                         onChange={(e) => onPickImages(e.target.files)}
//                         disabled={saving}
//                       />
//                     </label>

//                     {!images.length && (
//                       <span className="text-sm font-medium text-slate-500">
//                         Сонгосон зураг байхгүй
//                       </span>
//                     )}
//                   </div>

//                   {previewUrls.length > 0 && (
//                     <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
//                       {previewUrls.map((p, idx) => (
//                         <div
//                           key={p.url}
//                           className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white"
//                         >
//                           <img
//                             src={p.url}
//                             alt={`preview-${idx}`}
//                             className="h-32 w-full object-cover"
//                           />
//                           <div className="p-3">
//                             <p className="text-xs font-semibold text-slate-700 truncate">
//                               {p.file.name}
//                             </p>
//                             <button
//                               type="button"
//                               onClick={() => removeImage(idx)}
//                               disabled={saving}
//                               className="mt-2 text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
//                             >
//                               Арилгах
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* footer */}
//               <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white p-6">
//                 <div className="text-xs font-semibold text-slate-500">
//                   {teacherId?.trim()
//                     ? `Teacher: ${teacherId.slice(0, 8)}…`
//                     : 'TeacherId: (optional)'}
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <button
//                     type="button"
//                     onClick={close}
//                     disabled={saving}
//                     className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="button"
//                     onClick={save}
//                     disabled={!canSave}
//                     className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-extrabold text-white
//                                hover:bg-emerald-700 disabled:opacity-50"
//                   >
//                     {saving ? (
//                       <>
//                         <Loader2 className="h-5 w-5 animate-spin" />
//                         Хадгалж байна...
//                       </>
//                     ) : (
//                       'Хадгалах'
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import {
  Plus,
  Sparkles,
  X,
  Image as ImageIcon,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type AddButtonProps = {
  moduleId: string;
  subModuleId: string;
  teacherId?: string | null;
  onSaved?: () => void;
};

export default function AddButton({
  moduleId,
  subModuleId,
  teacherId,
  onSaved,
}: AddButtonProps) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [richTextHtml, setRichTextHtml] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canSave = useMemo(() => {
    const hasTitle = title.trim().length > 0;
    const hasContent = richTextHtml.trim().length > 0;
    return hasTitle && hasContent && !saving;
  }, [title, richTextHtml, saving]);

  const resetForm = () => {
    setTitle('');
    setRichTextHtml('');
    setImages([]);
    setErrorMsg(null);
  };

  const close = () => {
    if (saving) return;
    setOpen(false);
    resetForm();
  };

  // preview urls
  const previewUrls = useMemo(() => {
    return images.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
  }, [images]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previewUrls]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, saving]);

  const onPickImages = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    const onlyImages = arr.filter((f) => f.type.startsWith('image/'));
    setImages((prev) => [...prev, ...onlyImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => setImages([]);

  const save = async () => {
    setErrorMsg(null);

    if (!title.trim()) return setErrorMsg('Гарчиг оруулна уу.');
    if (!richTextHtml.trim())
      return setErrorMsg('Материалын текст оруулна уу.');
    if (!moduleId || !subModuleId)
      return setErrorMsg('moduleId / subModuleId алга.');

    setSaving(true);
    try {
      // 1) upload images -> get urls
      let uploadedUrls: string[] = [];

      if (images.length > 0) {
        const fdUpload = new FormData();
        for (const img of images) fdUpload.append('files', img);

        const upRes = await fetch('/api/upload', {
          method: 'POST',
          body: fdUpload,
        });

        const upData = await upRes.json().catch(() => ({}));

        if (!upRes.ok) {
          setErrorMsg(upData?.error || 'Зураг upload хийхэд алдаа гарлаа.');
          return;
        }

        uploadedUrls = Array.isArray(upData?.urls) ? upData.urls : [];
      }

      // 2) save document with image urls
      const res = await fetch('/api/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          richText: richTextHtml,
          subModuleId,
          moduleId,
          teacherId: teacherId?.trim() ? teacherId.trim() : null,
          images: uploadedUrls, // ✅ urls
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data?.error || 'Материал хадгалах үед алдаа гарлаа.');
        return;
      }

      close();
      onSaved?.();
    } catch (e) {
      console.error(e);
      setErrorMsg('Сүлжээний алдаа.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      {/* ✅ Grid-д таарах Add Card */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full min-h-[260px] rounded-3xl border border-slate-200 bg-white/70 p-6
                   shadow-[0_12px_30px_rgba(2,6,23,0.06)]
                   transition hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(5,150,105,0.14)]"
      >
        {/* glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-50/80 to-transparent opacity-0 transition group-hover:opacity-100" />

        <div className="relative h-full rounded-2xl border border-dashed border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-white p-6 flex flex-col items-center justify-center text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white border border-emerald-100 text-emerald-700 shadow-sm">
            <Plus className="h-6 w-6" />
          </div>

          <div className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
            Материал нэмэх
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-700">
            <Sparkles className="h-4 w-4" />
            Шинэ материал оруулах
          </div>
        </div>
      </button>

      {/* ✅ Modal */}
      {open && (
        <div className="fixed inset-0 z-[9999]">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
            onClick={close}
          />

          {/* ✅ scroll container: дэлгэцнээс хэтэрвэл энд scroll болно */}
          <div className="relative z-[9999] flex min-h-screen items-start justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl my-10">
              {/* ✅ card: max height + flex */}
              <div className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_40px_120px_rgba(2,6,23,0.35)] max-h-[85vh] flex flex-col">
                {/* header */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-white to-white p-6 shrink-0">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-bold text-emerald-700">
                      <Sparkles className="h-4 w-4" />
                      Шинэ материал
                    </div>
                    <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900">
                      Материал нэмэх
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-600">
                      Гарчиг + rich text + зургууд (сонголтоор)
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    disabled={saving}
                    className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* ✅ body scroll */}
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                  {errorMsg && (
                    <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
                      <AlertTriangle className="h-5 w-5 mt-0.5" />
                      <div className="font-semibold">{errorMsg}</div>
                    </div>
                  )}

                  {/* Title */}
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Гарчиг
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-900
                                 outline-none focus:ring-4 focus:ring-emerald-200/50"
                      placeholder="Жишээ: Лекц 1 — Танилцуулга"
                      disabled={saving}
                    />
                    <div className="text-xs text-slate-500 font-medium">
                      {title.trim().length > 0
                        ? ''
                        : 'Гарчиг оруулах шаардлагатай'}
                    </div>
                  </div>

                  {/* Rich text */}
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Материал (Rich Text)
                    </label>

                    {/* ✅ fixed height wrapper */}
                    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white h-[280px]">
                      <ReactQuill
                        theme="snow"
                        value={richTextHtml}
                        onChange={setRichTextHtml}
                        placeholder="Энд текстээ бичнэ..."
                        className="h-full"
                      />
                    </div>

                    <div className="text-xs text-slate-500 font-medium">
                      {richTextHtml.trim().length > 0
                        ? ''
                        : 'Материалын текст оруулах шаардлагатай'}
                    </div>
                  </div>

                  {/* Images */}
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <label className="text-sm font-bold text-slate-800">
                        Зургууд (сонголтоор)
                      </label>

                      {images.length ? (
                        <button
                          type="button"
                          className="text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
                          onClick={clearAll}
                          disabled={saving}
                        >
                          Бүгдийг арилгах ({images.length})
                        </button>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <label className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 hover:bg-slate-50">
                        <ImageIcon className="h-5 w-5 text-emerald-700" />
                        Зураг сонгох
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) => onPickImages(e.target.files)}
                          disabled={saving}
                        />
                      </label>

                      {!images.length && (
                        <span className="text-sm font-medium text-slate-500">
                          Сонгосон зураг байхгүй
                        </span>
                      )}
                    </div>

                    {previewUrls.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {previewUrls.map((p, idx) => (
                          <div
                            key={p.url}
                            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white"
                          >
                            <img
                              src={p.url}
                              alt={`preview-${idx}`}
                              className="h-32 w-full object-cover"
                            />
                            <div className="p-3">
                              <p className="text-xs font-semibold text-slate-700 truncate">
                                {p.file.name}
                              </p>
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                disabled={saving}
                                className="mt-2 text-xs font-bold text-red-600 hover:underline disabled:opacity-50"
                              >
                                Арилгах
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* footer */}
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white p-6 shrink-0">
                  <div className="text-xs font-semibold text-slate-500">
                    {teacherId?.trim()
                      ? `Teacher: ${teacherId.slice(0, 8)}…`
                      : 'TeacherId: (optional)'}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={close}
                      disabled={saving}
                      className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={save}
                      disabled={!canSave}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 font-extrabold text-white
                                 hover:bg-emerald-700 disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Хадгалж байна...
                        </>
                      ) : (
                        'Хадгалах'
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {/* end card */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
