'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/buttton'; // Алдаатай байсан бол 'button' болгож засаарай


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
  selectedTopic: any;
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

export default function AddSubModule({ onClose, subject, grade, term, onAddTopic, selectedTopic }: AddTopicModalProps) {
  const [topicName, setTopicName] = useState('');
  const [subLessons, setSubLessons] = useState<SubLesson[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleAddSubLesson = () => {
    const newSubId = `sub-${Math.random().toString(36).substr(2, 9)}`;
    setSubLessons(prev => [...prev, { id: newSubId, name: '', teacherCount: 0 }]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [subLessons.length]);

  const handleSubLessonChange = (id: string, value: string) => {
    setSubLessons(subLessons.map(sub => (sub.id === id ? { ...sub, name: value } : sub)));
  };

  const handleRemoveSubLesson = (id: string) => {
    setSubLessons(subLessons.filter(sub => sub.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === subLessons.length - 1) {
        handleAddSubLesson();
      }
    }
  };

  const handleSave = () => {
    const validSubLessons = subLessons.filter(sub => sub.name.trim() !== '');
    const newTopic = {
      id: `topic-${topicCounter++}`,
      name: topicName || selectedTopic.name,
      subject,
      grade,
      term,
      lessons: validSubLessons,
    };
    onAddTopic(newTopic);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-300">
      <div className="bg-white rounded-[32px] w-full max-w-5xl h-[550px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20">
        
      
        <div className="w-full md:w-[40%] bg-slate-50/80 border-r border-slate-100 p-8 flex flex-col">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center p-2 bg-green-50 rounded-xl mb-4">
          
            </div>
            <h3 className="text-xl font-bold text-slate-800">Одоо байгаа дэд сэдвүүд</h3>
            <p className="text-slate-500 text-sm mt-1">Нийт {selectedTopic.lessons.length} хичээл бүртгэгдсэн байна</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {selectedTopic.lessons.map((lesson: any) => (
              <div
                key={lesson.id}
                className="group p-4 rounded-2xl bg-white border border-slate-200/60 hover:border-green-200 hover:shadow-md transition-all duration-200 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-green-500 group-hover:bg-green-50 transition-colors">
             
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-700 group-hover:text-green-600 transition-colors">
                    {lesson.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                      {lesson.teacherCount} багш
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Батлагдсан
                    </span>
                  </div>
                </div>
        
              </div>
            ))}
          </div>
        </div>


        <div className="flex-1 p-8 flex flex-col bg-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
          >
      
          </button>

          <div className="mb-8">
            <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase bg-indigo-50 px-3 py-1 rounded-full">Шинэ дэд сэдэв нэмэх</span>
            <h2 className="text-3xl font-extrabold text-slate-800 mt-3 tracking-tight">
              {selectedTopic.name}
            </h2>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar"
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

            {subLessons.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/50">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4">
       
                </div>
                <p className="text-slate-500 font-medium">Одоогоор дэд сэдэв нэмээгүй байна</p>
                <p className="text-slate-400 text-xs mt-1">Доорх товчийг дарж хичээл нэмнэ үү</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 mt-auto">
          <button
              onClick={handleAddSubLesson}
              className="w-full py-3 bg-green-50 text-green-600 rounded-2xl font-bold hover:bg-green-100 transition-all flex items-center justify-center gap-2 border-2 border-green-100 border-dashed"
            >
              <span>+</span> Дэд сэдэв нэмэх
            </button>


            <div className="flex gap-3 mt-2">
              <button 
                onClick={onClose} 
                className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-all"
              >
                Болих
              </button>
              <button
                onClick={handleSave}
                disabled={subLessons.filter(s => s.name.trim()).length === 0}
                className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-green-600 disabled:bg-slate-200 disabled:cursor-not-allowed shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2"
              >
                Хадгалах ({subLessons.filter(s => s.name.trim()).length})
              </button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}