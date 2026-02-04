'use client';
import { useState } from 'react';

const employeesData = [
  {
    id: 1,
    name: 'Ганболд Батбаяр',
    email: 'batbayar@company.mn',
    role: 'Ахлах Программист',
    department: 'IT',
    salary: '3,500,000₮',
    status: 'active',
  },
  {
    id: 2,
    name: 'Төмөрбаатар Сарангэрэл',
    email: 'sarangrel@company.mn',
    role: 'Маркетингийн Менежер',
    department: 'Маркетинг',
    salary: '2,800,000₮',
    status: 'active',
  },
  {
    id: 3,
    name: 'Нямдорж Энхбаатар',
    email: 'enkhbaatar@company.mn',
    role: 'Санхүүгийн Мэргэжилтэн',
    department: 'Санхүү',
    salary: '2,500,000₮',
    status: 'trial',
  },
];

export default function Employees() {
  const [employees, setEmployees] = useState(employeesData);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500  ">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Ажилчид
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Байгууллагын нийт хүний нөөцийн мэдээлэл
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-100 active:scale-95">
          + Ажилтан нэмэх
        </button>
      </div>

      <div className="relative group max-w-sm">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          placeholder="Нэрээр хайх..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-200">
        <table className="w-full text-left border-collapse overflow-y-auto ">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
                Ажилтан
              </th>
              <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
                Албан тушаал
              </th>
              <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
                Цалин
              </th>
              <th className="px-6 py-4 text-[13px] font-semibold text-slate-500 uppercase tracking-wider">
                Төлөв
              </th>
              <th className="px-6 py-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="group hover:bg-slate-50/80 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100/50 group-hover:scale-110 transition-transform">
                      {emp.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">
                        {emp.name}
                      </p>
                      <p className="text-xs text-slate-400">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <p className="text-slate-700 font-medium">{emp.role}</p>
                  <p className="text-xs text-slate-400">{emp.department}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">
                  {emp.salary}
                </td>
                <td className="px-6 py-4 text-sm">
                  {emp.status === 'active' ? (
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                      Идэвхтэй
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
                      Туршилтын
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === emp.id ? null : emp.id)
                      }
                      className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-400"
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                    </button>
                    {openMenuId === emp.id && (
                      <div className="absolute right-0 mt-2 z-20 w-40 bg-white border border-slate-200 rounded-xl shadow-xl shadow-slate-200/50 p-1.5 animate-in zoom-in-95 duration-100">
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                          Харах
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
                          Засах
                        </button>
                        <div className="h-px bg-slate-100 my-1"></div>
                        <button className="w-full text-left px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 rounded-lg font-medium">
                          Устгах
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
