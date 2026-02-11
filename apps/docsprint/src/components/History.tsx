'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  History as HistoryIcon,
  Calendar,
} from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from './ui/menubar';

const historyData = [
  {
    id: 1,
    date: '2024-02-04 10:30',
    action: 'Үүсгэсэн',
    type: 'Баримт',
    detail: 'Гэрээ_01.pdf шинээр үүсгэв',
    user: 'Г.Болд',
  },
  {
    id: 2,
    date: '2024-02-04 11:15',
    action: 'Устгасан',
    type: 'Хэрэглэгч',
    detail: 'Түр хэрэглэгч системээс хасав',
    user: 'А.Сарнай',
  },
  {
    id: 3,
    date: '2024-02-04 12:00',
    action: 'Шинэчилсэн',
    type: 'Ажилтан',
    detail: 'Мэдээлэл шинэчлэгдсэн',
    user: 'Б.Тулга',
  },
];

export default function History() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('Үйлдэл');
  const [typeFilter, setTypeFilter] = useState('Төрөл');

  const actions = ['Бүх үйлдэл', 'Үүсгэсэн', 'Шинэчилсэн', 'Устгасан', 'Үзсэн'];
  const types = ['Бүх төрөл', 'Ажилтан', 'Баримт', 'Хэрэглэгч'];

  const filteredData = historyData.filter((item) => {
    const matchesSearch =
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.detail.toLowerCase().includes(search.toLowerCase());
    const matchesAction =
      actionFilter === 'Үйлдэл' ||
      actionFilter === 'Бүх үйлдэл' ||
      item.action === actionFilter;
    const matchesType =
      typeFilter === 'Төрөл' ||
      typeFilter === 'Бүх төрөл' ||
      item.type === typeFilter;
    return matchesSearch && matchesAction && matchesType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Үйлдэл түүх
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Систем дээр хийгдсэн бүх үйлдлүүдийн бүртгэл.
        </p>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4 group-focus-within:text-[#005bb7] transition-colors" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Хайх (Хэрэглэгч, дэлгэрэнгүй)..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#005bb7] transition-all"
            />
          </div>

          <div className="flex gap-2">
            <Menubar className="border-slate-200 bg-slate-50 rounded-xl px-2 h-11">
              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-600">
                  <Filter className="w-3.5 h-3.5 text-[#005bb7]" />
                  {actionFilter}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </MenubarTrigger>
                <MenubarContent className="bg-white border-slate-200 rounded-xl p-1 shadow-xl">
                  {actions.map((act) => (
                    <MenubarItem
                      key={act}
                      onClick={() => setActionFilter(act)}
                      className="text-sm rounded-lg cursor-pointer hover:bg-blue-50 hover:text-[#005bb7]"
                    >
                      {act}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>

            <Menubar className="border-slate-200 bg-slate-50 rounded-xl px-2 h-11">
              <MenubarMenu>
                <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-600">
                  <Filter className="w-3.5 h-3.5 text-[#005bb7]" />
                  {typeFilter}
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </MenubarTrigger>
                <MenubarContent className="bg-white border-slate-200 rounded-xl p-1 shadow-xl">
                  {types.map((t) => (
                    <MenubarItem
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className="text-sm rounded-lg cursor-pointer hover:bg-blue-50 hover:text-[#005bb7]"
                    >
                      {t}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Огноо
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Үйлдэл
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Төрөл
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Дэлгэрэнгүй
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                Хэн хийсэн
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                        item.action === 'Устгасан'
                          ? 'bg-rose-50 text-rose-600 border-rose-100'
                          : item.action === 'Үүсгэсэн'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : 'bg-blue-50 text-[#005bb7] border-blue-100'
                      }`}
                    >
                      {item.action.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-semibold">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                    {item.detail}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
                      <div className="w-8 h-8 bg-blue-50 text-[#005bb7] rounded-lg flex items-center justify-center text-[11px] border border-blue-100 group-hover:scale-110 transition-transform">
                        {item.user.charAt(0)}
                      </div>
                      {item.user}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-24 text-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <HistoryIcon className="w-12 h-12 opacity-10" />
                    <p className="text-sm font-medium">Түүх олдсонгүй</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
