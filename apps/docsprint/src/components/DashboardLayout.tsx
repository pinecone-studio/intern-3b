// 'use client';

// import { useState } from 'react';
// import Employees from './Employees';
// import History from './History';
// import ContractTemplate from './ContractTemplate';

// type PageType = 'employees' | 'history' | 'ContractTemplate';

// export default function DashboardLayout() {
//   const [page, setPage] = useState<PageType>('employees');
//   const [onePage, useOnePage] = useState('');

//   return (
//     <div className="flex h-screen bg-[#F8FAFC]">
//       <aside className="w-64 border-r border-slate-200 bg-white flex flex-col">
//         <div className="p-6">
//           <div className="flex items-center gap-2.5 px-2">
//             <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
//               <span className="font-bold text-lg">U</span>
//             </div>
//             <span className="font-bold text-slate-800 tracking-tight text-lg">
//               Uuniii
//             </span>
//           </div>
//         </div>

//         <nav className="flex-1 px-4 space-y-1">
//           <button
//             onClick={() => setPage('employees')}
//             className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
//               page === 'employees'
//                 ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
//                 : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
//             }`}
//           >
//             Ажилчид
//           </button>

//           <button
//             onClick={() => setPage('history')}
//             className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
//               page === 'history'
//                 ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
//                 : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
//             }`}
//           >
//             Түүх
//           </button>
//           <button
//             onClick={() => setPage('ContractTemplate')}
//             className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
//               page === 'ContractTemplate'
//                 ? 'bg-slate-900 text-white shadow-md shadow-slate-200'
//                 : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
//             }`}
//           >
//             Гэрээний загвар
//           </button>
//         </nav>

//         <div className="p-4 border-t border-slate-100">
//           <div className="flex items-center gap-3 px-2 py-2">
//             <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
//               ADMIN
//             </div>
//             <div className="overflow-hidden text-ellipsis">
//               <p className="text-xs font-semibold text-slate-700 truncate">
//                 Админ хэрэглэгч
//               </p>
//               <p className="text-[10px] text-slate-400 truncate">
//                 admin@company.mn
//               </p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       <main className="flex-1 overflow-y-auto px-10 py-8">
//         <div className="max-w-7xl mx-auto mt-10">
//           {page === 'employees' && <Employees />}
//           {page === 'history' && <History />}
//           {page === 'ContractTemplate' && <ContractTemplate />}
//         </div>
//       </main>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import {
  Users,
  History as HistoryIcon,
  FileText,
  LayoutDashboard,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import Employees from './Employees';
import History from './History';
import ContractTemplate from './ContractTemplate';

type PageType = 'employees' | 'history' | 'ContractTemplate';

export default function DashboardLayout() {
  const [page, setPage] = useState<PageType>('employees');

  const menuItems = [
    { id: 'employees', label: 'Ажилчид', icon: Users },
    { id: 'history', label: 'Үйлдэл түүх', icon: HistoryIcon },
    { id: 'ContractTemplate', label: 'Гэрээний загвар', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Aside Sidebar */}
      <aside className="w-72 border-r border-slate-200 bg-white flex flex-col shadow-sm">
        {/* Logo Section */}
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#005bb7] shadow-lg shadow-blue-100">
              <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#111827]">
              DocSprint
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">
            Үндсэн удирдлага
          </p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id as PageType)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group ${
                page === item.id
                  ? 'bg-[#111827] text-white shadow-lg shadow-slate-200'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-[#111827]'
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${page === item.id ? 'text-[#005bb7]' : 'text-slate-400 group-hover:text-slate-600'}`}
              />
              {item.label}
              {page === item.id && (
                <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white transition-colors cursor-pointer group">
            <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[11px] font-bold text-[#005bb7]">
              AD
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-bold text-slate-800 truncate">
                Админ хэрэглэгч
              </p>
              <p className="text-[11px] text-slate-500 truncate font-medium">
                admin@company.mn
              </p>
            </div>
            <LogOut className="h-4 w-4 text-slate-300 group-hover:text-rose-500 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-7xl mx-auto px-10 py-10">
          {page === 'employees' && <Employees />}
          {page === 'history' && <History />}
          {page === 'ContractTemplate' && <ContractTemplate />}
        </div>
      </main>
    </div>
  );
}
