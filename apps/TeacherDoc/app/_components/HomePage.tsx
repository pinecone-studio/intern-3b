'use client';

import Link from 'next/link';
import { useState } from 'react';


const mockLessons = [
   {
    id: "1",
    name: "Магадлал ба Статистик",
    subject: "math",
    grade: "8",
    term: "1",
    lessons: [
      { id: "1-1", name: "Үзэгдэл ба түүний магадлал", teacherCount: 3 },
      { id: "1-2", name: "Магадлалын сонгодог тодорхойлолт", teacherCount: 2 },
      { id: "1-3", name: "Бернуллийн туршилт", teacherCount: 1 },
    ],
  },
  {
    id: "2",
    name: "Бүхэл тооны үйлдлүүд",
    subject: "math",
    grade: "8",
    term: "1",
    lessons: [
      { id: "2-1", name: "Бүхэл тоог нэмэх хасах", teacherCount: 4 },
      { id: "2-2", name: "Үлдэгдэлтэй хуваах", teacherCount: 2 },
    ],
  },
  {
    id: "3",
    name: "Магадлал ба Статистик",
    subject: "math",
    grade: "8",
    term: "1",
    lessons: [
      { id: "1-1", name: "Үзэгдэл ба түүний магадлал", teacherCount: 3 },
      { id: "1-2", name: "Магадлалын сонгодог тодорхойлолт", teacherCount: 2 },
      { id: "1-3", name: "Бернуллийн туршилт", teacherCount: 1 },
    ],
  },
  {
    id: "4",
    name: "Бүхэл тооны үйлдлүүд",
    subject: "math",
    grade: "8",
    term: "1",
    lessons: [
      { id: "2-1", name: "Бүхэл тоог нэмэх хасах", teacherCount: 4 },
      { id: "2-2", name: "Үлдэгдэлтэй хуваах", teacherCount: 2 },
    ],
  },
];


export default function HomePage() {

  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');


  const isProgressComplete = subject && grade && term;

  const handleClear = () => {
    setSubject('');
    setGrade('');
    setTerm('');
  };
const filteredLessons = mockLessons.filter(
  (lesson) =>
    lesson.subject === subject &&
    lesson.grade === grade &&
    lesson.term === term
);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10 ">
      {/* Title */}
      <div className="px-3 py-px bg-emerald-50 w-fit rounded-[8px] border-emerald-200 border">
        <span className="text-emerald-700 opacity-70 font-extrabold ">
          Мэргэжлийн хөгжил
        </span>
      </div>
      <h1 className="text-6xl font-extrabold ">Хичээлийн агуулга </h1>
      <span className="text-6xl font-extrabold text-emerald-900 opacity-70">
        нэг дороос.
      </span>
      <p className="text-gray-600 mt-4">
        Багш нарын бэлтгэсэн шилдэг материалуудтай танилцаж, өөрийн
      </p>
      <p className="text-gray-600 mb-8">
        бүтээлч туршлагаа бусадтай хуваалцаарай.
      </p>

      {/* Filter */}
      <div className="bg-white border rounded p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
              ${subject ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-400 border-2 border-emerald-600'}`}
            >
              1
            </div>
            <span className="font-medium">Хичээл</span>
          </div>

          <div className="flex-1 h-[1.5px] bg-emerald-600 mx-2" />

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
              ${grade ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-400 border-2 border-emerald-600'}`}
            >
              2
            </div>
            <span className="font-medium">Анги</span>
          </div>

          <div className="flex-1 h-[1.5px] bg-emerald-600 mx-2" />

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
              ${term ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-400 border-2 border-emerald-600'}`}
            >
              3
            </div>
            <span className="font-medium">Улирал</span>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium block mb-1">
              1. Хичээл сонгоно
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setGrade('');
                setTerm('');
              }}
            >
              <option value="">Сонгох...</option>
              <option value="math">Математик</option>
              <option value="mongolian">Монгол хэл</option>
              <option value="english">Англи хэл</option>
              <option value="science">Байгалийн ухаан</option>
              <option value="history">Түүх</option>
              <option value="geography">Газарзүй</option>
              <option value="physics">Физик</option>
              <option value="chemistry">Хими</option>
              <option value="biology">Биологи</option>
              <option value="it">Мэдээлэл зүй</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">
              2. Анги сонгоно
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              disabled={!subject}
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
                setTerm('');
              }}
            >
              <option value="">Сонгох...</option>
              <option value="1">1-р анги</option>
              <option value="2">2-р анги</option>
              <option value="3">3-р анги</option>
              <option value="4">4-р анги</option>
              <option value="5">5-р анги</option>
              <option value="6">6-р анги</option>
              <option value="7">7-р анги</option>
              <option value="8">8-р анги</option>
              <option value="9">9-р анги</option>
              <option value="10">10-р анги</option>
              <option value="11">11-р анги</option>
              <option value="12">12-р анги</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">
              3. Улирал сонгоно
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2"
              disabled={!grade}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            >
              <option value="">Сонгох...</option>
              <option value="1">1 улирал</option>
              <option value="2">2 улирал</option>
              <option value="3">3 улирал</option>
              <option value="4">4 улирал</option>
            </select>
          </div>
        </div>

        {/* Clear button */}
        <div className="mt-4">
          <button onClick={handleClear} className="text-emerald-600 ">
            Цэвэрлэх
          </button>
        </div>
      </div>

      {/* Lessons map lah gazar */}
      {isProgressComplete ? (
  <div className="mt-20">
    {filteredLessons.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredLessons.slice(0,2).map((lesson) => (
                   <div
  key={lesson.id}
                    className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden transition-all duration-300 hover:border-[#B0DAC8] hover:shadow-[0_12px_40px_rgb(176,218,200,0.15)] p-8 cursor-pointer flex items-center justify-between group bg-white border-slate-100/60"
                    // onClick={() => setSelectedMainTopic(lesson.id)}
                  >
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#5E8C78] transition-colors">{lesson.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                        {/* <BookOpen size={14} /> */}
                        {lesson.lessons.length} дэд хичээл агуулсан
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#B0DAC8] group-hover:text-[#2D4F3F] transition-all transform group-hover:translate-x-1">
                      {/* <ChevronRight size={20} /> */}
                    </div>
                  </div>
        ))}
      </div>
    ) : (
      <div className="bg-gray-50 border rounded-xl p-10 text-center text-gray-500">
        Тохирох хичээл олдсонгүй
      </div>
    )}
  </div>
) : (
   <div className="flex flex-col items-center justify-center py-32 text-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#B0DAC8] blur-3xl opacity-20 animate-pulse" />
                <div className="relative w-24 h-24 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#B0DAC8]">
                  {/* <Sparkles size={40} /> */}
                </div>
              </div>
              <div className="max-w-sm space-y-3">
                <p className="text-2xl font-black text-slate-900 tracking-tight">Шүүлтүүрээ ашиглана уу</p>
                <p className="text-slate-400 font-medium leading-relaxed">Хайлтаа эхлүүлэхийн тулд хичээл, анги болон улирлын мэдээллээ сонгоно уу.</p>
              </div>
            </div>
)}

    </main>
  );
}
