'use client';

import { Fragment, useMemo, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type AddButtonProps = {
  moduleId: string;
  subModuleId: string;
  teacherId: string;
  onSaved?: () => void; // хадгалсны дараа list refresh хийх бол
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
  const [files, setFiles] = useState<File[]>([]);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const closeModal = () => setOpen(false);
  const openModal = () => setOpen(true);

  const resetForm = () => {
    setTitle('');
    setRichTextHtml('');
    setFiles([]);
    setErrorMsg(null);
  };

  // Toolbar тохиргоо
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
      ['clean'],
    ],
  };

  const previewUrls = useMemo(() => {
    return files.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
    }));
  }, [files]);

  useEffect(() => {
    return () => {
      previewUrls.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previewUrls]);

  const handlePickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    setFiles((prev) => [...prev, ...selected]);
    e.target.value = '';
  };

  const removeAt = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearAll = () => setFiles([]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // багахан validation
    if (!moduleId || !subModuleId || !teacherId) {
      setErrorMsg('moduleId / subModuleId / teacherId заавал хэрэгтэй байна.');
      return;
    }
    if (!title && !richTextHtml && files.length === 0) {
      setErrorMsg('Хадгалах мэдээлэл алга байна.');
      return;
    }

    try {
      setSaving(true);

      const fd = new FormData();
      fd.append('title', title);
      fd.append('richText', richTextHtml);

      fd.append('moduleId', moduleId);
      fd.append('subModuleId', subModuleId);
      fd.append('teacherId', teacherId);

      files.forEach((f) => fd.append('files', f));

      const res = await fetch('/api/lesson', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(data?.error ?? 'Failed to save document');
        return;
      }

      closeModal();
      resetForm();
      onSaved?.();
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error: Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setErrorMsg(null);
          openModal();
        }}
        className="cursor-pointer flex flex-col w-[370px] rounded border justify-center bg-white items-center h-[280px]"
      >
        <div className="px-8 py-5 bg-emerald-400 rounded-full">
          <span className="font-extrabold text-4xl">+</span>
        </div>
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95 translate-y-2"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-2"
              >
                <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl border">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Dialog.Title className="text-xl font-extrabold">
                        Шинэ материал нэмэх
                      </Dialog.Title>
                      <p className="text-sm text-gray-500 mt-1">
                        Title + richtext + зургууд оруулаад хадгалаарай.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-lg px-3 py-1 text-sm border hover:bg-gray-50"
                    >
                      ✕
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleSave} className="mt-6 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Title
                      </label>
                      <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-200"
                        placeholder="Жишээ: Лекц 1 — Танилцуулга"
                      />
                    </div>

                    {/* Rich text */}
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Rich Text
                      </label>

                      <div className="rounded-xl overflow-hidden border">
                        <ReactQuill
                          theme="snow"
                          value={richTextHtml}
                          onChange={setRichTextHtml}
                          modules={quillModules}
                          placeholder="Энд текстээ бичнэ..."
                          className="h-52"
                        />
                      </div>
                    </div>

                    {/* Image upload (multiple) */}
                    <div>
                      <label className="block text-sm font-semibold mb-1">
                        Зургууд
                      </label>

                      <div className="flex items-center gap-4">
                        <label className="cursor-pointer inline-flex items-center justify-center rounded-xl border px-4 py-3 hover:bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handlePickFiles}
                          />
                          Зураг сонгох
                        </label>

                        {files.length ? (
                          <button
                            type="button"
                            className="text-sm text-red-600 hover:underline"
                            onClick={clearAll}
                          >
                            Бүгдийг арилгах ({files.length})
                          </button>
                        ) : (
                          <span className="text-sm text-gray-500">
                            (сонгосон зураг байхгүй)
                          </span>
                        )}
                      </div>

                      {/* Preview grid */}
                      {previewUrls.length > 0 && (
                        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {previewUrls.map((p, idx) => (
                            <div key={p.url} className="rounded-xl border p-2">
                              <img
                                src={p.url}
                                alt={`preview-${idx}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <div className="mt-2 flex items-center justify-between gap-2">
                                <p className="text-xs text-gray-600 truncate">
                                  {p.file.name}
                                </p>
                                <button
                                  type="button"
                                  onClick={() => removeAt(idx)}
                                  className="text-xs text-red-600 hover:underline shrink-0"
                                >
                                  Арилгах
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          closeModal();
                          resetForm();
                        }}
                        className="rounded-xl border px-5 py-3 font-semibold hover:bg-gray-50"
                        disabled={saving}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="rounded-xl bg-emerald-500 px-5 py-3 font-extrabold text-white hover:bg-emerald-600 disabled:opacity-50"
                        disabled={
                          saving ||
                          (!title && !richTextHtml && files.length === 0)
                        }
                      >
                        {saving ? 'Хадгалж байна...' : 'Хадгалах'}
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
