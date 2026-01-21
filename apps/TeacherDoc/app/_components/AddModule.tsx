'use client'

import { useState } from 'react';
import { Button } from "@headlessui/react";
import { X, BookPlus, GraduationCap, Calendar, Layout } from 'lucide-react';

interface Props {
  onAdd: (newModule: any) => void;
  onClose: () => void;
}

export default function AddModuleForm({ onAdd, onClose }: Props) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormComplete = name && subject && grade && term;

  const handleSubmit = async () => {
    if (!isFormComplete) return;
    setLoading(true);
    try {
      const res = await fetch('/api/module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          lessonId: subject,
          gradeId: grade,
          semesterId: term,
        }),
      });
      if (!res.ok) throw new Error('Failed to add module');
      const data = await res.json();
      onAdd(data);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none transition-all duration-200";
  const labelStyle = "text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-2";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <BookPlus size={24} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">Шинэ сэдэв үүсгэх</h2>
            <p className="text-sm text-gray-400">Хөтөлбөрийн бүтцийг тодорхойлох</p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label className={labelStyle}><Layout size={14} /> Сэдвийн нэр</label>
            <input
              type="text"
              placeholder="Жишээ: Натурал тоон олонлог"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className={labelStyle}><BookPlus size={14} /> Хичээл</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className={inputStyle}>
                <option value="">Сонгох...</option>
                <option value="math">Математик</option>
                <option value="mongolian">Монгол хэл</option>
                <option value="literature">Уран зохиол</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelStyle}><GraduationCap size={14} /> Анги</label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)} className={inputStyle}>
                  <option value="">Сонгох...</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i+1} value={i+1}>{i+1}-р анги</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelStyle}><Calendar size={14} /> Улирал</label>
                <select value={term} onChange={(e) => setTerm(e.target.value)} className={inputStyle}>
                  <option value="">Сонгох...</option>
                  <option value="1">1-р улирал</option>
                  <option value="2">2-р улирал</option>
                  <option value="3">3-р улирал</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormComplete || loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-[0.98] mt-4 ${
              isFormComplete && !loading 
              ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' 
              : 'bg-gray-200 cursor-not-allowed shadow-none'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Түр хүлээнэ үү...
              </span>
            ) : 'Хадгалах'}
          </button>
        </div>
      </div>
    </div>
  );
}