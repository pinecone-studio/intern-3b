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
  Wand2, // Автоматаар бөглөх товчны icon
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

  // ✅ Мэдээллийг автоматаар бөглөх функц
  const handleMagicFill = () => {
    setTitle(
      `Тест материал: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
    );
    setRichTextHtml(`
      <h2 style="color: #059669;">Шинэ хичээлийн агуулга</h2>
      <p>Энэхүү материалыг системээс автоматаар туршилтын зорилгоор үүсгэв. Агуулга нь дараах хэсгүүдээс бүрдэнэ:</p>
      <ul>
        <li><b>Оршил:</b> Хичээлийн үндсэн ойлголт.</li>
        <li><b>Үндсэн хэсэг:</b> Дэлгэрэнгүй тайлбар болон жишээ.</li>
        <li><b>Дүгнэлт:</b> Сурч мэдсэн зүйлс.</li>
      </ul>
      <p>Хуудасны доод хэсэгт байгаа хадгалах товчийг дарж туршиж үзнэ үү.</p>
    `);
  };

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
    if (!moduleId || !subModuleId) return setErrorMsg('ID алга.');

    setSaving(true);
    try {
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
          setErrorMsg(upData?.error || 'Upload error');
          return;
        }
        uploadedUrls = Array.isArray(upData?.urls) ? upData.urls : [];
      }

      const res = await fetch('/api/document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          richText: richTextHtml,
          subModuleId,
          moduleId,
          teacherId: teacherId?.trim() || null,
          images: uploadedUrls,
        }),
      });

      if (!res.ok) throw new Error('Хадгалахад алдаа гарлаа.');
      close();
      onSaved?.();
    } catch (e) {
      setErrorMsg('Алдаа гарлаа.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(true)}
        className="group relative w-full min-h-[260px] rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-[0_12px_30px_rgba(2,6,23,0.06)] transition hover:-translate-y-0.5"
      >
        <div className="relative flex flex-col items-center justify-center text-center">
          <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white border border-emerald-100 text-emerald-700 shadow-sm">
            <Plus />
          </div>
          <div className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
            Материал нэмэх
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-bold text-emerald-700">
            <Sparkles size={16} /> Шинэ материал оруулах
          </div>
        </div>
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999]">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px]"
            onClick={close}
          />
          <div className="relative z-[9999] flex min-h-screen items-start justify-center p-4 overflow-y-auto">
            <div className="w-full max-w-4xl my-10">
              <div className="w-full rounded-3xl border border-slate-200 bg-white shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b bg-emerald-50/30 p-6 shrink-0">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Материал нэмэх
                    </h3>
                    <p className="text-sm text-slate-600">
                      Гарчиг болон агуулгаа оруулна уу.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* ✅ Magic Fill Button */}
                    <button
                      type="button"
                      onClick={handleMagicFill}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-lg hover:bg-emerald-700 transition"
                    >
                      <Wand2 size={16} />
                      Magic Fill
                    </button>
                    <button
                      onClick={close}
                      className="p-2 hover:bg-slate-100 rounded-xl"
                    >
                      <X />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                  {errorMsg && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm font-bold flex gap-2">
                      <AlertTriangle size={18} />
                      {errorMsg}
                    </div>
                  )}
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Гарчиг
                    </label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:ring-4 focus:ring-emerald-200/50"
                      placeholder="Жишээ: Лекц 1"
                      disabled={saving}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-800">
                      Агуулга (Rich Text)
                    </label>
                    <div className="rounded-2xl border border-slate-200 overflow-hidden h-[280px]">
                      <ReactQuill
                        theme="snow"
                        value={richTextHtml}
                        onChange={setRichTextHtml}
                        className="h-full"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-bold text-slate-800 flex justify-between">
                      Зургууд{' '}
                      <span>
                        {images.length > 0 && (
                          <button
                            onClick={clearAll}
                            className="text-red-500 hover:underline"
                          >
                            Арилгах
                          </button>
                        )}
                      </span>
                    </label>
                    <label className="cursor-pointer inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold hover:bg-slate-50 transition">
                      <ImageIcon className="text-emerald-700" /> Сонгох
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onPickImages(e.target.files)}
                      />
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {previewUrls.map((p, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-video rounded-xl overflow-hidden border"
                        >
                          <img
                            src={p.url}
                            className="object-cover w-full h-full"
                          />
                          <button
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 border-t p-6 shrink-0 bg-slate-50">
                  <button
                    onClick={close}
                    disabled={saving}
                    className="px-6 py-3 font-bold text-slate-600"
                  >
                    Болих
                  </button>
                  <button
                    onClick={save}
                    disabled={!canSave}
                    className="bg-emerald-600 text-white px-8 py-3 rounded-2xl font-extrabold shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition flex items-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" /> : 'Хадгалах'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
