'use client';

import { useState } from 'react';
import Employees from './Employees';
import History from './History';

type PageType = 'employees' | 'history';

export default function DashboardLayout() {
  const [page, setPage] = useState<PageType>('employees');
  const [onePage, useOnePage] = useState('');

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2.5 px-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <span className="font-bold text-lg">U</span>
            </div>
            <span className="font-bold text-slate-800 tracking-tight text-lg">
              Uuniii
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button
            onClick={() => setPage('employees')}
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              page === 'employees'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Ажилчид
          </button>

          <button
            onClick={() => setPage('history')}
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              page === 'history'
                ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Түүх
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
              ADMIN
            </div>
            <div className="overflow-hidden text-ellipsis">
              <p className="text-xs font-semibold text-slate-700 truncate">
                Админ хэрэглэгч
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                admin@company.mn
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto px-10 py-8">
        <div className="max-w-7xl mx-auto mt-10">
          {page === 'employees' && <Employees />}
          {page === 'history' && <History />}
        </div>
      </main>
    </div>
  );
}
