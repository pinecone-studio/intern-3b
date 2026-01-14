// 'use client';

// import { useState } from 'react';
// import { Button } from './ui/CustomUI';

// const mockLessons = [
//   {
//     id: '1',
//     name: 'Магадлал ба Статистик',
//     subject: 'math',
//     grade: '8',
//     term: '1',
//     lessons: [
//       { id: '1-1', name: 'Үзэгдэл ба түүний магадлал', teacherCount: 3 },
//       { id: '1-2', name: 'Магадлалын сонгодог тодорхойлолт', teacherCount: 2 },
//       { id: '1-3', name: 'Бернуллийн туршилт', teacherCount: 1 },
//     ],
//   },
//   {
//     id: '2',
//     name: 'Бүхэл тооны үйлдлүүд',
//     subject: 'math',
//     grade: '8',
//     term: '1',
//     lessons: [
//       { id: '2-1', name: 'Бүхэл тоог нэмэх хасах', teacherCount: 4 },
//       { id: '2-2', name: 'Үлдэгдэлтэй хуваах', teacherCount: 2 },
//     ],
//   },
//   {
//     id: '3',
//     name: 'Магадлал ба Статистик',
//     subject: 'math',
//     grade: '8',
//     term: '1',
//     lessons: [
//       { id: '1-1', name: 'Үзэгдэл ба түүний магадлал', teacherCount: 3 },
//       { id: '1-2', name: 'Магадлалын сонгодог тодорхойлолт', teacherCount: 2 },
//       { id: '1-3', name: 'Бернуллийн туршилт', teacherCount: 1 },
//     ],
//   },
//   {
//     id: '4',
//     name: 'Бүхэл тооны үйлдлүүд',
//     subject: 'math',
//     grade: '8',
//     term: '1',
//     lessons: [
//       { id: '2-1', name: 'Бүхэл тоог нэмэх хасах', teacherCount: 4 },
//       { id: '2-2', name: 'Үлдэгдэлтэй хуваах', teacherCount: 2 },
//     ],
//   },
// ];

// export default function HomePage() {
//   const [subject, setSubject] = useState('');
//   const [grade, setGrade] = useState('');
//   const [term, setTerm] = useState('');
//   const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

//   const isProgressComplete = subject && grade && term;

//   const handleClear = () => {
//     setSubject('');
//     setGrade('');
//     setTerm('');
//   };
//   const filteredLessons = mockLessons.filter(
//     (lesson) =>
//       lesson.subject === subject &&
//       lesson.grade === grade &&
//       lesson.term === term,
//   );

//   const selectedTopic = mockLessons.find(
//     (lesson) => lesson.id === selectedTopicId,
//   );

//   return (
//     <main className="max-w-6xl mx-auto px-6 py-10 ">
//       {/* Title */}
//       <div className="px-3 py-px bg-emerald-50 w-fit rounded-[8px] border-emerald-200 border">
//         <span className="text-emerald-700 opacity-70 font-extrabold ">
//           Мэргэжлийн хөгжил
//         </span>
//       </div>
//       <h1 className="text-6xl font-extrabold ">Хичээлийн агуулга </h1>
//       <span className="text-6xl font-extrabold text-emerald-900 opacity-70">
//         нэг дороос.
//       </span>
//       <p className="text-gray-600 mt-4">
//         Багш нарын бэлтгэсэн шилдэг материалуудтай танилцаж, өөрийн
//       </p>
//       <p className="text-gray-600 mb-8">
//         бүтээлч туршлагаа бусадтай хуваалцаарай.
//       </p>

//       {/* Filter */}
//       <div className="bg-white border rounded p-6 shadow-sm">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
//               ${subject ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-400 border-2 border-emerald-600'}`}
//             >
//               1
//             </div>
//             <span className="font-medium">Хичээл</span>
//           </div>

//           <div className="flex-1 h-[1.5px] bg-emerald-600 mx-2" />

//           <div className="flex items-center gap-2">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
//               ${grade ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-400 border-2 border-emerald-600'}`}
//             >
//               2
//             </div>
//             <span className="font-medium">Анги</span>
//           </div>

//           <div className="flex-1 h-[1.5px] bg-emerald-600 mx-2" />

//           <div className="flex items-center gap-2">
//             <div
//               className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold
//               ${term ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-400 border-2 border-emerald-600'}`}
//             >
//               3
//             </div>
//             <span className="font-medium">Улирал</span>
//           </div>
//         </div>

//         {/* Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
//               1. Хичээл сонгоно
//             </label>
//             <select
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
//               value={subject}
//               onChange={(e) => {
//                 setSubject(e.target.value);
//                 setGrade('');
//                 setTerm('');
//               }}
//             >
//               <option value="">Сонгох...</option>
//               <option value="math">Математик</option>
//               <option value="mongolian">Монгол хэл</option>
//             </select>
//           </div>
//           <div>
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
//               2. Анги сонгоно
//             </label>
//             <select
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none disabled:opacity-50"
//               disabled={!subject}
//               value={grade}
//               onChange={(e) => {
//                 setGrade(e.target.value);
//                 setTerm('');
//               }}
//             >
//               <option value="">Сонгох...</option>
//               <option value="8">8-р анги</option>
//             </select>
//           </div>
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
//               3. Улирал сонгоно
//             </label>
//             <select
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none disabled:opacity-50"
//               disabled={!grade}
//               value={term}
//               onChange={(e) => setTerm(e.target.value)}
//             >
//               <option value="">Сонгох...</option>
//               <option value="1">1 улирал</option>
//             </select>
//           </div>
//         </div>

//         {/* Clear button */}
//         <div className="mt-4">
//           <button
//             onClick={handleClear}
//             className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors flex items-center gap-1 group"
//           >
//             <span>Шүүлтүүр цэвэрлэх</span>
//             <span className="text-lg leading-none group-hover:rotate-90 transition-transform">
//               ×
//             </span>
//           </button>
//         </div>
//       </div>

//       {/* Lessons map */}
//       {isProgressComplete && !selectedTopicId && (
//         <div className="animate-in mt-20 fade-in slide-in-from-bottom-2 duration-500">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-black text-slate-800">
//               Ерөнхий сэдвүүд
//             </h2>
//             <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold">
//               {filteredLessons.length} үр дүн
//             </span>
//           </div>
//           {filteredLessons.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {filteredLessons.map((lesson) => (
//                 <div
//                   key={lesson.id}
//                   className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden transition-all duration-300 hover:border-[#B0DAC8] hover:shadow-[0_12px_40px_rgb(176,218,200,0.15)] p-8 cursor-pointer flex items-center justify-between group bg-white border-slate-100/60"
//                   onClick={() => setSelectedTopicId(lesson.id)}
//                 >
//                   <div>
//                     <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#5E8C78] transition-colors">
//                       {lesson.name}
//                     </h4>
//                     <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
//                       {/* <BookOpen size={14} /> */}
//                       {lesson.lessons.length} дэд хичээл агуулсан
//                     </div>
//                   </div>
//                   <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#B0DAC8] group-hover:text-[#2D4F3F] transition-all transform group-hover:translate-x-1">
//                     {/* <ChevronRight size={20} /> */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="bg-gray-50 border rounded-xl p-10 text-center text-gray-500">
//               Тохирох хичээл олдсонгүй
//             </div>
//           )}
//         </div>
//       )}

//       {/* Selected topic details */}
//       {selectedTopicId && selectedTopic && (
//         <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-10">
//           <div className="flex items-center gap-4 mb-8">
//             <button
//               onClick={() => setSelectedTopicId(null)}
//               className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
//             >
//               {/* <ICONS.ArrowLeft className="w-5 h-5" /> */}
//             </button>
//             <div>
//               <h2 className="text-3xl font-black text-slate-900">
//                 {selectedTopic.name}
//               </h2>
//               <p className="text-slate-500 font-medium">
//                 Нийт {selectedTopic.lessons.length} дэд сэдэв байна
//               </p>
//             </div>
//           </div>
//           <div className="lg:col-span-2 space-y-4">
//             {selectedTopic.lessons.map((lesson) => (
//               <div
//                 key={lesson.id}
//                 className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#B0DAC8] hover:shadow-lg hover:shadow-[#B0DAC8]/10 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
//               >
//                 <div className="flex items-center gap-6">
//                   <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-[#B0DAC8]/20 group-hover:text-[#2D4F3F] transition-all">
//                     {/* <BookOpen size={28} /> */}
//                   </div>
//                   <div>
//                     <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#5E8C78] transition-colors">
//                       {lesson.name}
//                     </h4>
//                     <div className="flex items-center gap-4 mt-1">
//                       <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
//                         {lesson.teacherCount} багш
//                       </span>
//                       <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
//                         {' '}
//                         Батлагдсан
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Button variant="outline" className="h-11 px-6 font-bold">
//                     Материал нэмэх
//                   </Button>
//                   <Button variant="primary" className="h-11 px-8 font-bold">
//                     Үзэх{' '}
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {!isProgressComplete && (
//         <div className="flex flex-col items-center justify-center py-32 text-center space-y-8">
//           <div className="relative">
//             <div className="absolute inset-0 bg-[#B0DAC8] blur-3xl opacity-20 animate-pulse" />
//             <div className="relative w-24 h-24 rounded-3xl bg-white border shadow-sm flex items-center justify-center text-[#B0DAC8]">
//               {/* Icon */}
//             </div>
//           </div>
//           <div className="max-w-sm space-y-3">
//             <p className="text-2xl font-black">Шүүлтүүрээ ашиглана уу</p>
//             <p className="text-gray-400">
//               Хайлтаа эхлүүлэхийн тулд хичээл, анги болон улирлын мэдээллээ
//               сонгоно уу.
//             </p>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/CustomUI';

const mockLessons = [
  {
    id: '1',
    name: 'Магадлал ба Статистик',
    subject: 'math',
    grade: '8',
    term: '1',
    lessons: [
      { id: '1-1', name: 'Үзэгдэл ба түүний магадлал', teacherCount: 3 },
      { id: '1-2', name: 'Магадлалын сонгодог тодорхойлолт', teacherCount: 2 },
      { id: '1-3', name: 'Бернуллийн туршилт', teacherCount: 1 },
    ],
  },
  {
    id: '2',
    name: 'Бүхэл тооны үйлдлүүд',
    subject: 'math',
    grade: '8',
    term: '1',
    lessons: [
      { id: '2-1', name: 'Бүхэл тоог нэмэх хасах', teacherCount: 4 },
      { id: '2-2', name: 'Үлдэгдэлтэй хуваах', teacherCount: 2 },
    ],
  },
  {
    id: '3',
    name: 'Магадлал ба Статистик',
    subject: 'math',
    grade: '8',
    term: '1',
    lessons: [
      { id: '1-1', name: 'Үзэгдэл ба түүний магадлал', teacherCount: 3 },
      { id: '1-2', name: 'Магадлалын сонгодог тодорхойлолт', teacherCount: 2 },
      { id: '1-3', name: 'Бернуллийн туршилт', teacherCount: 1 },
    ],
  },
  {
    id: '4',
    name: 'Бүхэл тооны үйлдлүүд',
    subject: 'math',
    grade: '8',
    term: '1',
    lessons: [
      { id: '2-1', name: 'Бүхэл тоог нэмэх хасах', teacherCount: 4 },
      { id: '2-2', name: 'Үлдэгдэлтэй хуваах', teacherCount: 2 },
    ],
  },
];

export default function HomePage() {
  const router = useRouter();

  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

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
      lesson.term === term,
  );

  const selectedTopic = mockLessons.find(
    (lesson) => lesson.id === selectedTopicId,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2  ">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              1. Хичээл сонгоно
            </label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none"
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
              <option value="literature">Уран зохиол</option>

              <option value="english">Англи хэл</option>
              <option value="russian">Орос хэл</option>
              <option value="foreign_language">Гадаад хэл (бусад)</option>

              <option value="history">Түүх</option>
              <option value="social_studies">Нийгмийн ухаан</option>

              <option value="physics">Физик</option>
              <option value="chemistry">Хими</option>
              <option value="biology">Биологи</option>
              <option value="geography">Газарзүй</option>

              <option value="informatics">Мэдээллийн технологи</option>
              <option value="technology">Технологи</option>

              <option value="music">Хөгжим</option>
              <option value="art">Дүрслэх урлаг</option>

              <option value="physical_education">Биеийн тамир</option>
              <option value="health">Эрүүл мэнд</option>

              <option value="civics">Иргэний боловсрол</option>
            </select>
          </div>

          <div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                2. Анги сонгоно
              </label>
              <select
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none disabled:opacity-50"
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
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              3. Улирал сонгоно
            </label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none disabled:opacity-50"
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
          <button
            onClick={handleClear}
            className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors flex items-center gap-1 group"
          >
            <span>Шүүлтүүр цэвэрлэх</span>
            <span className="text-lg leading-none group-hover:rotate-90 transition-transform">
              ×
            </span>
          </button>
        </div>
      </div>

      {/* Lessons map */}
      {isProgressComplete && !selectedTopicId && (
        <div className="animate-in mt-20 fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-800">
              Ерөнхий сэдвүүд
            </h2>
            <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-xs font-bold">
              {filteredLessons.length} үр дүн
            </span>
          </div>

          {filteredLessons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.01)] overflow-hidden transition-all duration-300 hover:border-[#B0DAC8] hover:shadow-[0_12px_40px_rgb(176,218,200,0.15)] p-8 cursor-pointer flex items-center justify-between group bg-white border-slate-100/60"
                  onClick={() => {
                    setSelectedTopicId(lesson.id);
                  }}
                >
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#5E8C78] transition-colors">
                      {lesson.name}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                      {lesson.lessons.length} дэд хичээл агуулсан
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#B0DAC8] group-hover:text-[#2D4F3F] transition-all transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border rounded-xl p-10 text-center text-gray-500">
              Тохирох хичээл олдсонгүй
            </div>
          )}
        </div>
      )}

      {/* Selected topic details (энэ хэсэг чинь хэвээрээ үлдэж байгаа) */}
      {selectedTopicId && selectedTopic && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-10">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedTopicId(null)}
              className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
            >
              {/* <ICONS.ArrowLeft className="w-5 h-5" /> */}
            </button>
            <div>
              <h2 className="text-3xl font-black text-slate-900">
                {selectedTopic.name}
              </h2>
              <p className="text-slate-500 font-medium">
                Нийт {selectedTopic.lessons.length} дэд сэдэв байна
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            {selectedTopic.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-[#B0DAC8] hover:shadow-lg hover:shadow-[#B0DAC8]/10 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-[#B0DAC8]/20 group-hover:text-[#2D4F3F] transition-all">
                    {/* <BookOpen size={28} /> */}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-[#5E8C78] transition-colors">
                      {lesson.name}
                    </h4>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                        {lesson.teacherCount} багш
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-black text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
                        Батлагдсан
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" className="h-11 px-6 font-bold">
                    Материал нэмэх
                  </Button>

                  <Button
                    variant="primary"
                    className="h-11 px-8 font-bold"
                    onClick={() => {
                      router.push(`/sub-module/${selectedTopic.id}`);
                    }}
                  >
                    Үзэх
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isProgressComplete && (
        <div className="flex flex-col items-center justify-center py-32 text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[#B0DAC8] blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-24 h-24 rounded-3xl bg-white border shadow-sm flex items-center justify-center text-[#B0DAC8]">
              {/* Icon */}
            </div>
          </div>
          <div className="max-w-sm space-y-3">
            <p className="text-2xl font-black">Шүүлтүүрээ ашиглана уу</p>
            <p className="text-gray-400">
              Хайлтаа эхлүүлэхийн тулд хичээл, анги болон улирлын мэдээллээ
              сонгоно уу.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
