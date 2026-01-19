'use client';

import { useState, useRef, useEffect } from 'react';

type SubLesson = {
  id: string;
  name: string;
  teacherCount: number;
};

type AddTopicModalProps = {
  onClose: () => void;
  subject: string;
  grade: string;
  term: string;
  onAddTopic: (newTopic: any) => void; // Жагсаалтыг шинэчлэх функц
};

export default function AddTopicModal({
  onClose,
  subject,
  grade,
  term,
  onAddTopic,
}: AddTopicModalProps) {
  const [step, setStep] = useState(1);
  const [topicName, setTopicName] = useState('');
  const [subLessons, setSubLessons] = useState<SubLesson[]>([]);
  const [createdModuleId, setCreatedModuleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Дэд сэдэв нэмэх
  const handleAddSubLesson = () => {
    const newSubId = `temp-${Math.random().toString(36).substr(2, 9)}`;
    setSubLessons((prev) => [
      ...prev,
      { id: newSubId, name: '', teacherCount: 0 },
    ]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [subLessons.length]);

  const handleSubLessonChange = (id: string, value: string) => {
    setSubLessons(
      subLessons.map((sub) => (sub.id === id ? { ...sub, name: value } : sub)),
    );
  };

  const handleRemoveSubLesson = (id: string) => {
    setSubLessons(subLessons.filter((sub) => sub.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === subLessons.length - 1) handleAddSubLesson();
    }
  };

  // АЛХАМ 1: Module үүсгэх (Үргэлжлүүлэх)
  const handleNextStep = async () => {
    if (!topicName.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: topicName,
          semesterId: term,
          lessonId: subject,
          gradeId: grade,
        }),
      });

      if (!response.ok) throw new Error('Module creation failed');

      const data = await response.json();
      setCreatedModuleId(data.id); // Prisma-гаас ирсэн жинхэнэ ID-г хадгалах
      setStep(2);
      if (subLessons.length === 0) handleAddSubLesson();
    } catch (error) {
      alert('Үндсэн сэдвийг хадгалахад алдаа гарлаа.');
    } finally {
      setIsLoading(false);
    }
  };

  // АЛХАМ 2: SubModules үүсгэх (Хадгалах)
  const handleSave = async () => {
    if (!createdModuleId || isLoading) return;

    const validSubLessons = subLessons.filter((sub) => sub.name.trim() !== '');
    if (validSubLessons.length === 0) {
      alert('Дэд сэдэв оруулна уу.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/submodules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: createdModuleId,
          lessons: validSubLessons.map((s) => ({ name: s.name })),
        }),
      });

      if (!response.ok) throw new Error('Submodule creation failed');

      // Бүх зүйл амжилттай болбол жагсаалтаа шинэчлээд хаана
      onAddTopic({
        id: createdModuleId,
        name: topicName,
        lessons: validSubLessons,
      });
      onClose();
    } catch (error) {
      alert('Дэд сэдвүүдийг хадгалахад алдаа гарлаа.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] w-full max-w-5xl h-[550px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
        {/* Sidebar */}
        <div className="w-full md:w-[35%] p-10 flex flex-col justify-between relative bg-gray-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {step === 1 ? 'Алхам 1: Ерөнхий' : 'Алхам 2: Дэлгэрэнгүй'}
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              {step === 1
                ? 'Хичээлийн шинэ сэдэв нэмэх'
                : 'Дэд сэдвүүдээ бүртгэх'}
            </h2>

            <div className="space-y-6 mt-10">
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 1 ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-emerald-100 border-emerald-600 text-emerald-600'}`}
                >
                  {step > 1 ? '✓' : '1'}
                </div>
                <span
                  className={`text-sm ${step === 1 ? 'font-bold' : 'text-slate-500'}`}
                >
                  Үндсэн сэдэв
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 2 ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 text-slate-400'}`}
                >
                  2
                </div>
                <span
                  className={`text-sm ${step === 2 ? 'font-bold' : 'text-slate-500'}`}
                >
                  Дэд сэдвүүд
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border">
            <span className="text-xs text-slate-500 block">
              {subject} • {grade}-р анги
            </span>
            <span className="text-xs text-slate-400">{term}-р улирал</span>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-10 flex flex-col">
          {step === 1 ? (
            <>
              <h3 className="text-2xl font-bold text-slate-800 mb-6">
                Ерөнхий мэдээлэл
              </h3>
              <label className="text-sm font-bold text-slate-600 mb-2">
                Сэдвийн нэр
              </label>
              <input
                className="w-full border border-slate-200 rounded-2xl px-5 py-4 text-lg focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none"
                placeholder="Жишээ: Магадлал ба статистик"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNextStep()}
                disabled={isLoading}
                autoFocus
              />

              <div className="mt-auto flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 text-slate-500 font-bold rounded-2xl hover:bg-slate-100"
                >
                  Болих
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!topicName.trim() || isLoading}
                  className={`flex-[2] py-4 rounded-2xl font-bold transition-all ${
                    topicName.trim() && !isLoading
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Хадгалж байна...' : 'Үргэлжлүүлэх'}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold">Дэд сэдвүүд</h3>
                  <span className="text-sm bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg">
                    {topicName}
                  </span>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm font-bold text-slate-400 hover:text-emerald-700"
                >
                  Засах
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-3 mb-6 pr-2"
              >
                {subLessons.map((sub, idx) => (
                  <div key={sub.id} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                      {idx + 1}
                    </div>
                    <input
                      type="text"
                      placeholder="Дэд сэдвийн нэр..."
                      className="flex-1 border-b-2 border-gray-100 py-2 focus:border-green-500 focus:outline-none"
                      value={sub.name}
                      onChange={(e) =>
                        handleSubLessonChange(sub.id, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                      autoFocus
                    />
                    <button
                      onClick={() => handleRemoveSubLesson(sub.id)}
                      className="text-red-300 hover:text-red-500 text-xl"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddSubLesson}
                className="py-4 border-2 border-dashed rounded-2xl text-slate-500 hover:border-emerald-400 hover:bg-emerald-50 font-bold mb-4"
              >
                + Дэд сэдэв нэмэх
              </button>

              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 text-slate-500 font-bold rounded-2xl hover:bg-slate-100"
                >
                  Болих
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200"
                >
                  {isLoading
                    ? 'Хадгалж байна...'
                    : `Хадгалах (${subLessons.filter((s) => s.name.trim()).length})`}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
