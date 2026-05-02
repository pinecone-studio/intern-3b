'use client';

import { useState, type ComponentType } from 'react';
import {
  ChevronRight,
  FileText,
  History as HistoryIcon,
  LogOut,
  type LucideIcon,
  Users,
} from 'lucide-react';

import History from '@/features/audit/components/History';
import ContractTemplate from '@/features/documents/components/ContractTemplate';
import Employees from '@/features/employees/components/Employees';

type PageType = 'employees' | 'history' | 'contractTemplates';

type DashboardModule = {
  id: PageType;
  label: string;
  description: string;
  icon: LucideIcon;
  component: ComponentType;
};

const dashboardModules: DashboardModule[] = [
  {
    id: 'employees',
    label: 'Ажилчид',
    description: 'HR records',
    icon: Users,
    component: Employees,
  },
  {
    id: 'history',
    label: 'Үйлдэл түүх',
    description: 'Audit trail',
    icon: HistoryIcon,
    component: History,
  },
  {
    id: 'contractTemplates',
    label: 'Гэрээний загвар',
    description: 'Document studio',
    icon: FileText,
    component: ContractTemplate,
  },
];

const adminUser = {
  initials: 'AD',
  name: 'Админ хэрэглэгч',
  email: 'admin@company.mn',
};

export default function DashboardLayout() {
  const [page, setPage] = useState<PageType>('employees');
  const activeModule =
    dashboardModules.find((module) => module.id === page) ??
    dashboardModules[0];
  const ActiveComponent = activeModule.component;

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <aside className="flex w-72 flex-col border-r border-slate-200 bg-white shadow-sm">
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

        <nav className="mt-2 flex-1 space-y-1.5 px-4">
          <p className="mb-4 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Үндсэн удирдлага
          </p>

          {dashboardModules.map((item) => {
            const Icon = item.icon;
            const isActive = page === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#111827] text-white shadow-lg shadow-slate-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-[#111827]'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive
                      ? 'text-[#005bb7]'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <span className="flex flex-1 flex-col items-start leading-tight">
                  <span>{item.label}</span>
                  <span
                    className={`text-[10px] font-semibold ${
                      isActive ? 'text-slate-300' : 'text-slate-400'
                    }`}
                  >
                    {item.description}
                  </span>
                </span>
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-100 bg-slate-50/50 p-4">
          <div className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[11px] font-bold text-[#005bb7]">
              {adminUser.initials}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-sm font-bold text-slate-800">
                {adminUser.name}
              </p>
              <p className="truncate text-[11px] font-medium text-slate-500">
                {adminUser.email}
              </p>
            </div>
            <LogOut className="h-4 w-4 text-slate-300 transition-colors group-hover:text-rose-500" />
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto max-w-7xl px-10 py-10">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
