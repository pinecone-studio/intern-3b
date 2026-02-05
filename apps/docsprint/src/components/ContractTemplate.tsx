'use client';

import { useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Briefcase,
  Clock,
  RotateCcw,
  Plus,
  Save,
  Printer,
  ChevronRight,
  Info,
} from 'lucide-react';

const templateOptions = [
  {
    id: 'employment',
    name: 'Хөдөлмөрийн гэрээ',
    icon: FileText,
    content:
      'ХӨДӨЛМӨРИЙН ГЭРЭЭ \n\n {company} компани болон {lastName} {firstName} нарын хооронд энэхүү гэрээг байгуулав. \n\nНэг. Нийтлэг үндэслэл\n1.1. Ажилтан нь {position} албан тушаалд ажиллана.\n1.2. Гэрээний хугацаа: Тодорхойгүй хугацаагаар.',
  },
  {
    id: 'nda',
    name: 'Нууц хадгалах гэрээ',
    icon: ShieldCheck,
    content:
      'НУУЦЛАЛЫН ГЭРЭЭ \n\n Энэхүү гэрээг нэг талаас {company}, нөгөө талаас {firstName} {lastName} нар харилцан тохиролцож байгуулав. \n\nХоёр. Нууц мэдээллийн төрөл\n2.1. Байгууллагын санхүү, технологи, харилцагчийн мэдээлэл...',
  },
  {
    id: 'job_desc',
    name: 'Ажлын байрны тодорхойлолт',
    icon: Briefcase,
    content:
      'АЖЛЫН БАЙРНЫ ТОДОРХОЙЛОЛТ \n\n Албан тушаал: {position} \n Хэлтэс: {department} \n\nГүйцэтгэх чиг үүрэг:\n- Код бичих, систем хөгжүүлэх\n- Багийн уулзалтад оролцох',
  },
  {
    id: 'trial',
    name: 'Туршилтын мэдэгдэл',
    icon: Clock,
    content:
      'ТУРШИЛТЫН ХУГАЦААГААР АЖИЛЛУУЛАХ ТУХАЙ МЭДЭГДЭЛ \n\n Огноо: {date}\n\n Хүлээн авагч: {lastName} {firstName} \n\n Таныг {company} компанид туршилтын хугацаагаар ажиллахыг зөвшөөрсөн тул энэхүү мэдэгдлийг хүргүүлж байна.',
  },
];



export default function ContractTemplate() {
  const [selectedId, setSelectedId] = useState('employment');
  const [content, setContent] = useState(templateOptions[0].content);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const found = templateOptions.find((t) => t.id === id);
    if (found) setContent(found.content);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Гэрээний загвар
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Системийн гэрээ, албан бичгийн загваруудыг удирдах
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-sm font-medium">
            <RotateCcw className="w-4 h-4" /> Сэргээх
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-100 flex items-center gap-2 active:scale-95">
            <Save className="w-4 h-4" /> Хадгалах
          </button>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-220px)] min-h-[600px]">
        {/* Left Side: Template List */}
        <aside className="w-72 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-900 py-2.5 rounded-lg text-xs font-bold transition-all border border-slate-200 uppercase tracking-wider">
              <Plus className="w-4 h-4" /> Шинэ загвар нэмэх
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {templateOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  selectedId === item.id
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`w-4 h-4 ${selectedId === item.id ? 'text-white' : 'text-slate-400'}`}
                  />
                  {item.name}
                </div>
                {selectedId === item.id && (
                  <ChevronRight className="w-4 h-4 opacity-50" />
                )}
              </button>
            ))}
          </nav>

         
        </aside>

        <div className="flex-1 flex flex-col bg-slate-200/50 rounded-2xl border border-slate-200 overflow-hidden relative">
      
          <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-600">
                Засварлаж байна:{' '}
                <span className="text-slate-900">
                  {templateOptions.find((t) => t.id === selectedId)?.name}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                title="Print Document"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>


          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/grid.png')] bg-fixed">
            <div className="relative group">
           
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-sm blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative w-[700px] min-h-[900px] bg-white shadow-2xl border border-slate-200 p-16 flex flex-col">
             
                <div className="flex justify-between items-start mb-12 border-b-2 border-slate-900 pb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-black tracking-tight text-slate-900 uppercase">
                      {templateOptions.find((t) => t.id === selectedId)?.name}
                    </h2>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-[0.2em] font-bold">
                      Official Internal Document
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                </div>

           
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 w-full bg-transparent outline-none resize-none font-serif text-[15px] leading-[1.8] text-slate-800 placeholder:text-slate-300"
                  placeholder="Гэрээний агуулгыг энд бичнэ үү..."
                  spellCheck={false}
                />

              
                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-end">
                  <div className="opacity-40 grayscale">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-slate-200" />
                      <div className="space-y-1">
                        <div className="w-20 h-2 bg-slate-200 rounded" />
                        <div className="w-12 h-2 bg-slate-200 rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono tracking-widest">
                    CONFIDENTIAL • PAGE 01
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
