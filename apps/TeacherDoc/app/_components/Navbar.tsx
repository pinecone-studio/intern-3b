'use client';
import { useState, useEffect } from 'react';
import { Button } from '@intern-3b/shadcn';
import AddModuleForm from './AddModule';
import AddSubModuleForm from './AddSubModule';
import { BookOpen, Sparkles, School, Plus, Crown, X } from 'lucide-react';

interface Module {
  id: string;
  name: string;
}

interface NavbarProps {
  onAddModule: (newModule: any) => void;
  onAddSubModule: (moduleId: string, newSub: any) => void;
}

export default function Navbar({ onAddModule, onAddSubModule }: NavbarProps) {
  const [isModuleModalOpen, setIsModuleModalOpen] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');

  useEffect(() => {
    fetch('/api/module')
      .then((res) => res.json())
      .then((data) => setModules(data))
      .catch(console.error);
  }, []);

  return (
    <nav className="relative w-full border-b border-gray-100 bg-white/80 backdrop-blur-md z-40">
         <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        
    
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-[#059669] p-3 rounded-[18px] shadow-lg shadow-emerald-200/50">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-[#f97316] p-1 rounded-lg border-2 border-white shadow-sm">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[22px] font-black text-slate-900 leading-tight">Хичээлийн Материал</h1>
            <p className="text-gray-400 text-sm font-medium">Батлагдсан хичээлийн материалаа хайж олох</p>
          </div>
        </div>

    
        <div className="flex items-center gap-3">
       
          <button 
            onClick={() => setIsSubModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <School className="w-5 h-5 text-slate-700" />
            <span className="font-bold text-slate-700 text-[15px]">Дэд сэдэв</span>
          </button>


          <button 
            onClick={() => setIsModuleModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] text-white rounded-xl hover:bg-[#047857] transition-all shadow-md shadow-emerald-100"
          >
            <Plus className="w-5 h-5" />
            <span className="font-bold text-[15px]">Хичээл нэмэх</span>
          </button>

  
          <div className="ml-2 relative">
            <div className="w-11 h-11 rounded-full bg-[#d1fae5] flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-[#047857] font-black text-sm">БД</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#f97316] p-0.5 rounded-full border-2 border-white">
              <Crown className="w-2.5 h-2.5 text-white fill-current" />
            </div>
          </div>
        </div>
      </div>

     
      {isModuleModalOpen && (
        <div className="fixed inset-0 mt-60 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] z-[100] animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-[32px] shadow-2xl w-full max-w-md border border-gray-100 relative">
            <button 
              onClick={() => setIsModuleModalOpen(false)}
              className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Шинэ хичээл нэмэх</h2>
            <AddModuleForm
              onAdd={(newModule) => {
                onAddModule(newModule);
                setModules((prev) => [...prev, newModule]);
                setIsModuleModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {isSubModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] mt-60 z-[100] animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-[32px] shadow-2xl w-full max-w-md border border-gray-100 relative">
            <button 
              onClick={() => setIsSubModalOpen(false)}
              className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Дэд сэдэв нэмэх</h2>
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-500 uppercase">Module сонгох</label>
              <select
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 outline-none focus:ring-4 focus:ring-emerald-500/5 transition-all font-medium text-slate-700"
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
              >
                <option value="">Сонгоно уу...</option>
                {modules.map((mod) => (
                  <option key={mod.id} value={mod.id}>{mod.name}</option>
                ))}
              </select>

              {selectedModuleId && (
                <AddSubModuleForm
                  moduleId={selectedModuleId}
                  onAdd={(newSub) => {
                    onAddSubModule(selectedModuleId, newSub);
                    setIsSubModalOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}