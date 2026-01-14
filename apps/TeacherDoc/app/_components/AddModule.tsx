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
  onAddTopic: (newTopic: {
    id: string;
    name: string;
    subject: string;
    grade: string;
    term: string;
    lessons: SubLesson[];
  }) => void;
};

let topicCounter = 1000;

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
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddSubLesson = () => {
    const newSubId = `sub-${Math.random().toString(36).substr(2, 9)}`;
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
      subLessons.map((sub) =>
        sub.id === id ? { ...sub, name: value } : sub,
      ),
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

  const handleNextStep = () => {
    if (topicName.trim()) {
      setStep(2);
      if (subLessons.length === 0) handleAddSubLesson();
    }
  };

  const handleSave = () => {
    if (!topicName.trim()) return;

    const validSubLessons = subLessons.filter(
      (sub) => sub.name.trim() !== '',
    );

    const newTopic = {
      id: `topic-${topicCounter++}`,
      name: topicName,
      subject,
      grade,
      term,
      lessons: validSubLessons,
    };

    onAddTopic(newTopic);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[32px] w-full max-w-5xl h-[550px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">

        {/* sidebar */}
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

            <p className="text-slate-600 text-sm mb-8">
              {step === 1
                ? 'Үндсэн сэдвийн нэрийг оруулна уу.'
                : 'Дэд сэдвүүдийг нэмж өгнө үү.'}
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step === 1
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 text-slate-400'
                  }`}
                >
                  1
                </div>
                <span className="font-semibold text-sm">Үндсэн сэдэв</span>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    step === 2
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 text-slate-400'
                  }`}
                >
                  2
                </div>
                <span className="font-semibold text-sm">
                  Дэд сэдвүүд
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border">
            <span className="text-xs text-slate-500">
              {subject} • {grade}-р анги • {term}-р улирал
            </span>
          </div>
        </div>

       
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
                  disabled={!topicName.trim()}
                  className={`flex-[2] py-4 rounded-2xl font-bold ${
                    topicName.trim()
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  Үргэлжлүүлэх
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
                  className="text-sm font-bold text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl"
                >
                  Нэр засах
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto space-y-3 mb-6"
              >
              {subLessons.map((sub, idx) => (
                <div key={sub.id} className="flex  items-center gap-3 group animate-in slide-in-from-bottom-2 duration-200">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 group-focus-within:bg-green-100 group-focus-within:text-green-600 transition-all">
                    {idx + 1}
                  </div>
                  <input
                    type="text"
                    placeholder="Дэд сэдвийн нэр..."
                    className="flex-1 border-b-2 border-gray-100 py-2 focus:border-green-500 focus:outline-none transition-all"
                    value={sub.name}
                    onChange={(e) => handleSubLessonChange(sub.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    autoFocus
                  />
                  <button
                    onClick={() => handleRemoveSubLesson(sub.id)}
                    className=" text-red-400 hover:text-red-600 text-4xl p-1 transition-all"
                  >
               ␡
                  </button>
                </div>
              ))}
              </div>

              <button
                onClick={handleAddSubLesson}
                className="py-4 border-2 border-dashed rounded-2xl text-slate-500 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 font-bold"
              >
                + Дэд сэдэв нэмэх
              </button>

              <div className="flex gap-4 pt-6">
                <button
                  onClick={onClose}
                  className="flex-1 py-4 text-slate-500 font-bold rounded-2xl hover:bg-slate-100"
                >
                  Болих
                </button>
                <button
                  onClick={handleSave}
                  className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200"
                >
                  Хадгалах (
                  {subLessons.filter((s) => s.name.trim()).length})
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
