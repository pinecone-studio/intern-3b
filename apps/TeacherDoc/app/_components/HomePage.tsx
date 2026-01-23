'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import {
  Sparkles,
  Search,
  ChevronDown,
  Layers,
  ArrowRight,
  ChevronLeft,
  Plus,
  Users,
} from 'lucide-react';
import { Badge, Card, CardContent } from './ui/buttton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SubModule {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  subModules: SubModule[];
}

export default function HomePage() {
 const router = useRouter();
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (!auth) {
      router.replace('/login'); // login page route
      return;
    }

    const parsed = JSON.parse(auth);

    if (!parsed.isLoggedIn) {
      router.replace('/login');
    }
  }, []);

  const isProgressComplete = subject && grade && term;

  const subjectRef = useRef<HTMLDivElement>(null);
  const gradeRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<HTMLDivElement>(null);

  const isProgressComplete = subject !== '' && grade !== '' && term !== '';
  const selectedTopic = modules.find((m) => m.id === selectedTopicId);

  const subjectMap: Record<string, string> = {
    math: 'Математик',
    mongolian: 'Монгол хэл',
    literature: 'Уран зохиол',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (subjectRef.current && !subjectRef.current.contains(target))
        setIsSubjectOpen(false);
      if (gradeRef.current && !gradeRef.current.contains(target))
        setIsGradeOpen(false);
      if (termRef.current && !termRef.current.contains(target))
        setIsTermOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchModules = async () => {
    if (!isProgressComplete) return;
    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/module?subject=${subject}&grade=${grade}&term=${term}`,
      );
      if (!res.ok) throw new Error('Failed');
      const data: Module[] = await res.json();
      setModules(data);
    } catch (err) {
      setModules([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isProgressComplete) fetchModules();
    else {
      setModules([]);
      setSelectedTopicId(null);
    }
  }, [subject, grade, term]);

  const handleClear = () => {
    setSubject('');
    setGrade('');
    setTerm('');
    setModules([]);
    setSelectedTopicId(null);
  };

  // Shared Styles
  const dropdownTriggerClass =
    'w-full bg-[#F9FAFB] border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-emerald-500/20 text-[#1A1A1A] font-medium flex justify-between items-center disabled:opacity-50 transition-all cursor-pointer shadow-sm hover:bg-white border border-transparent hover:border-slate-100';
  const dropdownMenuClass =
    'absolute z-50 mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200';
  const dropdownItemClass =
    'px-5 py-3.5 hover:bg-emerald-50 cursor-pointer transition-colors font-medium text-[#1A1A1A]';

  return (
    <div className="min-h-screen bg-[#F8FAFA] relative overflow-hidden">
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        <Navbar />

        <div className="mb-16 mt-10 text-center">
          <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary">
            <Sparkles className="mr-1 size-3" /> Багш нарын платформ
          </Badge>
          <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight text-[#1A1A1A]">
            Хичээлийн материалаа{' '}
            <span className="bg-gradient-to-r from-[#10B981] to-[#F97316] bg-clip-text text-transparent px-2">
              хялбар
            </span>{' '}
            хуваалцаарай
          </h1>
        </div>

        {/* SEARCH CARD */}
        <Card className="border-none shadow-2xl shadow-emerald-900/5 rounded-4xl overflow-visible bg-white mb-12">
          <CardContent className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* SUBJECT */}
              <div className="space-y-4" ref={subjectRef}>
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                    1
                  </span>
                  <label className="text-sm font-bold text-[#444]">
                    Хичээл
                  </label>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                    className={dropdownTriggerClass}
                  >
                    <span>{subject ? subjectMap[subject] : 'Сонгох...'}</span>
                    <ChevronDown
                      className={`size-5 text-slate-400 transition-transform ${isSubjectOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isSubjectOpen && (
                    <div className={dropdownMenuClass}>
                      {Object.entries(subjectMap).map(([key, label]) => (
                        <div
                          key={key}
                          onClick={() => {
                            setSubject(key);
                            setGrade('');
                            setTerm('');
                            setIsSubjectOpen(false);
                          }}
                          className={dropdownItemClass}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* GRADE */}
              <div className="space-y-4" ref={gradeRef}>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${subject ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                  >
                    2
                  </span>
                  <label className="text-sm font-bold text-[#444]">Анги</label>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    disabled={!subject}
                    onClick={() => setIsGradeOpen(!isGradeOpen)}
                    className={dropdownTriggerClass}
                  >
                    <span>{grade ? `${grade}-р анги` : 'Сонгох...'}</span>
                    <ChevronDown
                      className={`size-5 text-slate-400 transition-transform ${isGradeOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isGradeOpen && (
                    <div className={dropdownMenuClass}>
                      <div className="max-h-60 overflow-y-auto">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                          (num) => (
                            <div
                              key={num}
                              onClick={() => {
                                setGrade(num.toString());
                                setTerm('');
                                setIsGradeOpen(false);
                              }}
                              className={dropdownItemClass}
                            >
                              {num}-р анги
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* TERM */}
              <div className="space-y-4" ref={termRef}>
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${grade ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                  >
                    3
                  </span>
                  <label className="text-sm font-bold text-[#444]">
                    Улирал
                  </label>
                </div>
                <div className="relative">
                  <button
                    type="button"
                    disabled={!grade}
                    onClick={() => setIsTermOpen(!isTermOpen)}
                    className={dropdownTriggerClass}
                  >
                    <span>{term ? `${term} улирал` : 'Сонгох...'}</span>
                    <ChevronDown
                      className={`size-5 text-slate-400 transition-transform ${isTermOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isTermOpen && (
                    <div className={dropdownMenuClass}>
                      {[1, 2, 3].map((t) => (
                        <div
                          key={t}
                          onClick={() => {
                            setTerm(t.toString());
                            setIsTermOpen(false);
                          }}
                          className={dropdownItemClass}
                        >
                          {t} улирал
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isProgressComplete && (
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleClear}
                  className="text-sm font-bold text-emerald-600 hover:text-orange-500 transition-colors"
                >
                  Шүүлтүүр цэвэрлэх
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* MODULES GRID */}
        {isProgressComplete && !selectedTopicId && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {isLoading ? (
              <p className="col-span-full text-center py-20 text-emerald-600 font-bold italic">
                Уншиж байна...
              </p>
            ) : (
              modules.map((mod) => (
                <Card
                  key={mod.id}
                  onClick={() => setSelectedTopicId(mod.id)}
                  className="group cursor-pointer border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white p-2"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 size-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <Layers className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">
                      {mod.name}
                    </h3>
                    <div className="flex items-center justify-between text-[#888] text-sm font-bold">
                      <span>{mod.subModules?.length || 0} сэдэв</span>
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* LESSONS LIST */}
        {selectedTopic && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedTopicId(null)}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors group"
              >
                <ChevronLeft className="size-4 group-hover:-translate-x-1 transition-transform" />{' '}
                Буцах
              </button>
              <h2 className="text-2xl font-black text-[#1A1A1A]">
                {selectedTopic.name}
              </h2>
              <div className="w-10" />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {selectedTopic.subModules.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="group relative bg-white border-none rounded-[32px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-500 to-orange-400" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="size-14 shrink-0 rounded-2xl bg-[#F9FAFB] flex items-center justify-center text-emerald-600 font-black text-xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1A1A1A]">
                          {sub.name}
                        </h3>
                        <div className="flex items-center gap-2 text-[#888] text-sm font-medium mt-1">
                          <Users className="size-4 text-emerald-500" /> Багш
                          нарын бэлтгэсэн материал
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-6 py-3 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <Plus className="size-4 inline mr-2" /> Нэмэх
                      </button>
                      <Link
                        href={`/sub-module/${sub.id}?moduleId=${selectedTopicId}&name=${encodeURIComponent(sub.name)}`}
                        className="flex items-center gap-2 px-8 py-3 bg-emerald-600 rounded-2xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                      >
                        Үзэх <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
