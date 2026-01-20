
'use client'

import { useState, useEffect } from 'react';

import { 
  Search, 

  List as ListIcon, 

  ChevronDown, 
  ChevronUp, 
  Layers, 
  BookOpen, 
  TrendingUp, 
  BarChart3,
  Filter
} from 'lucide-react';

import AddModuleForm from '../_components/AddModule';
import AddSubModuleForm from '../_components/AddSubModule';

interface SubModule {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  lessonId: string;
  gradeId: string;
  semesterId: string;
  subModules: SubModule[];
}

const grades = [
  { id: '1', name: '1-р анги' }, { id: '2', name: '2-р анги' },
  { id: '3', name: '3-р анги' }, { id: '4', name: '4-р анги' },
  { id: '5', name: '5-р анги' }, { id: '6', name: '6-р анги' },
  { id: '7', name: '7-р анги' }, { id: '8', name: '8-р анги' },
  { id: '9', name: '9-р анги' }, { id: '10', name: '10-р анги' },
  { id: '11', name: '11-р анги' }, { id: '12', name: '12-р анги' },
];

const terms = [
  { id: '1', name: '1-р улирал' },
  { id: '2', name: '2-р улирал' },
  { id: '3', name: '3-р улирал' },
];

const subjects = [
  { id: 'math', name: 'Математик' },
  { id: 'mongolian', name: 'Монгол хэл' },
  { id: 'literature', name: 'Уран зохиол' },
];

export default function ManagerPage() {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAddModule, setShowAddModule] = useState(false);

  const fetchModules = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if(subject) params.append('subject', subject);
      if(grade) params.append('grade', grade);
      if(term) params.append('term', term);

      const res = await fetch(`/api/module?${params.toString()}`);
      const data: Module[] = await res.json();
      setModules(data);
    } catch (err) {
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchModules(); }, [subject, grade, term]);

  const handleAddModule = (newModule: Module) => setModules((prev) => [...prev, newModule]);

  const handleAddSubModule = (moduleId: string, newSub: SubModule) => {
    setModules((prev) => prev.map((m) => m.id === moduleId ? { ...m, subModules: [...m.subModules, newSub] } : m));
  };

  const filteredModules = modules.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
     
      <aside className="w-[280px] bg-white border-r border-gray-100 flex flex-col p-6 h-full overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#00A378] rounded-lg flex items-center justify-center">
            <Filter className="text-white w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-[#1E293B]">Шүүлтүүр</h2>
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Анги шүүлт</h3>
          <div className="grid grid-cols-2 gap-2">
            <button 
                onClick={() => setGrade('')}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all ${!grade ? 'bg-[#00A378] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                Бүх анги
            </button>
            {grades.map((g) => (
              <button
                key={g.id}
                onClick={() => setGrade(g.id)}
                className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${grade === g.id ? 'border-[#00A378] text-[#00A378] bg-emerald-50' : 'border-gray-100 text-gray-600 hover:bg-gray-50'}`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 font-sans">Хичээл</h3>
          <div className="space-y-2">
            <button 
                onClick={() => setSubject('')}
                className={`w-full text-left py-2 px-4 rounded-xl text-sm font-medium transition-all ${!subject ? 'bg-emerald-50 text-[#00A378] border-l-4 border-[#00A378]' : 'text-gray-600 hover:bg-gray-50'}`}>
                • Бүх хичээл
            </button>
            {subjects.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={`w-full text-left py-2 px-4 rounded-xl text-sm font-medium transition-all ${subject === s.id ? 'bg-emerald-50 text-[#00A378] border-l-4 border-[#00A378]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                • {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Улирал</h3>
          <div className="flex flex-wrap gap-2">
            {terms.map((t) => (
              <button
                key={t.id}
                onClick={() => setTerm(t.id)}
                className={`py-2 px-4 rounded-full text-xs font-medium border transition-all ${term === t.id ? 'bg-white border-[#00A378] text-[#00A378] shadow-sm' : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'}`}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <p className="text-[10px] font-bold text-[#00A378] uppercase mb-1">Мэдээлэл</p>
          <p className="text-xs text-emerald-800 leading-relaxed font-medium">Та нийт {modules.length} сэдвийг удирдаж байна.</p>
        </div>
      </aside>

    
      <main className="flex-1 flex flex-col h-full  overflow-hidden">
    
        <div className="w-full max-w-[1450px] mx-auto px-10 pt-10">
          <header className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] font-bold text-[#00A378] uppercase tracking-widest mb-1">• Систем менежер</p>
              <h1 className="text-3xl font-extrabold text-[#1E293B]">Хөтөлбөрийн удирдлага</h1>
              <p className="text-gray-400 text-sm mt-1">Хичээлийн бүтэц, дэд сэдвүүдийг нарийвчлан удирдах</p>
            </div>

            <button
              className="bg-[#00A378] hover:bg-[#008F69] text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all active:scale-95"
              onClick={() => setShowAddModule(true)}
            >
              Шинэ сэдэв үүсгэх
            </button>
            {showAddModule && (
              <AddModuleForm
                onAdd={(newModule) => { handleAddModule(newModule); setShowAddModule(false); }}
                onClose={() => setShowAddModule(false)}
              />
            )}
          </header>

          <div className="grid grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Layers className="text-emerald-500" />} label="Нийт сэдэв" value={modules.length} />
            <StatCard icon={<BookOpen className="text-orange-500" />} label="Нийт хичээл" value={subjects.length} />
            <StatCard icon={<TrendingUp className="text-blue-500" />} label="Идэвхтэй хичээл" value="Математик" />
            <StatCard icon={<BarChart3 className="text-purple-500" />} label="Хамрах хүрээ" value="84%" />
          </div>

          <div className="bg-white p-4 rounded-3xl border border-gray-100 flex items-center justify-between mb-8 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text"
                placeholder="Сэдвийн нэрээр хайх..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* SCROLLABLE MODULE LIST */}
        <div className="flex-1 overflow-y-auto px-10 pb-10">
          <div className="w-full max-w-[1450px] mx-auto space-y-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-400 font-medium animate-pulse">Ачааллаж байна...</p>
              </div>
            ) : filteredModules.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Layers className="text-gray-300 w-10 h-10" />
                </div>
                <p className="text-gray-500 font-semibold text-lg">Module олдсонгүй</p>
                <p className="text-gray-400 text-sm">Шүүлтүүрээ шалгана уу.</p>
              </div>
            ) : (
              filteredModules.map((mod) => (
                <div key={mod.id} className="group bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center p-6 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500" />
                    <div className="flex-1 ml-4">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="bg-emerald-50 text-[#00A378] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                          {subjects.find(s => s.id === mod.lessonId)?.name || 'Хичээл'}
                        </span>
                        <span className="text-gray-400 text-[11px] font-medium">
                          {grades.find(g => g.id === mod.gradeId)?.name} • {terms.find(t => t.id === mod.semesterId)?.name}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1E293B]">{mod.name}</h3>
                    </div>

                    <div className="flex items-center gap-8 mr-6">
                      <div className="text-right">
                        <p className="text-[10px] text-gray-400 uppercase font-bold">Дэд сэдэв</p>
                        <p className="text-2xl font-black text-[#1E293B] leading-none">{mod.subModules.length}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedModuleId(selectedModuleId === mod.id ? null : mod.id)}
                        className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors"
                      >
                        {selectedModuleId === mod.id ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                  </div>

                  {selectedModuleId === mod.id && (
                    <div className="bg-gray-50/50 px-10 pb-8 pt-4 border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
                      <div className="bg-white rounded-2xl p-6 shadow-inner border border-gray-100">
                        <AddSubModuleForm
                          moduleId={mod.id}
                          onAdd={(newSub) => handleAddSubModule(mod.id, newSub)}
                        />
                        <div className="mt-6 space-y-3">
                          {mod.subModules.map((sm, index) => (
                            <div key={sm.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                              <span className="w-6 h-6 flex items-center justify-center bg-white rounded-lg text-[10px] font-bold text-emerald-600 shadow-sm">{index + 1}</span>
                              <span className="text-sm font-semibold text-gray-700">{sm.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: any) {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-emerald-100 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-black text-[#1E293B]">{value}</p>
      </div>
    </div>
  );
}