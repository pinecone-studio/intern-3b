'use client';

import { useState } from 'react';

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

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
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
        <div className="mt-10 bg-gray-50 border rounded-xl p-10 text-center text-gray-500">
          Та бүх талбарыг амжилттай сонгосон байна!
        </div>
      ) : (
        <div className="mt-10 bg-gray-50 border rounded-xl p-10 text-center text-gray-500">
          Та бүх сонголтоо хийгээгүй байна.
        </div>
      )}
    </main>
  );
}
