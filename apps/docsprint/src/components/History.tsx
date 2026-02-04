'use client';

import { useState } from 'react';
import {
  Search,
  Filter,
  ChevronDown,
  History as HistoryIcon,
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
    <div className="p-8 bg-gray-50 min-h-screen text-slate-800">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <h3 className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-5">
          Шүүлтүүр
        </h3>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Хайх..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <Menubar className="border-slate-200 bg-slate-50 rounded-lg px-2">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-sm">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                {actionFilter}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </MenubarTrigger>
              <MenubarContent className="bg-white border-slate-200">
                {actions.map((act) => (
                  <MenubarItem
                    key={act}
                    onClick={() => setActionFilter(act)}
                    className="text-sm"
                  >
                    {act}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <Menubar className="border-slate-200 bg-slate-50 rounded-lg px-2">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 cursor-pointer text-sm">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                {typeFilter}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </MenubarTrigger>
              <MenubarContent className="bg-white border-slate-200">
                {types.map((t) => (
                  <MenubarItem
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="text-sm"
                  >
                    {t}
                  </MenubarItem>
                ))}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Огноо
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Үйлдэл
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Төрөл
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Дэлгэрэнгүй
              </th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">
                Хэн хийсэн
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {item.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-[13px] font-bold px-2 py-1 rounded ${
                        item.action === 'Устгасан'
                          ? 'bg-red-50 text-red-600'
                          : item.action === 'Үүсгэсэн'
                            ? 'bg-green-50 text-green-600'
                            : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {item.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-xs">
                    {item.detail}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                      <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-[10px]">
                        {item.user.charAt(0)}
                      </div>
                      {item.user}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <HistoryIcon className="w-10 h-10 opacity-20" />
                    <p className="text-sm">Түүх олдсонгүй</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-slate-500 font-medium">
        {filteredData.length} / {historyData.length} бичлэг харуулж байна
      </div>
    </div>
  );
}
