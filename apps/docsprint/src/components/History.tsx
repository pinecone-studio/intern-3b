'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client/react';
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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

import { GET_AUDIT_LOGS } from '../app/api/graphql/queries';

type AuditLog = {
  id: string;
  createdAt: string;
  action:
    | 'EMPLOYEE_CREATED'
    | 'EMPLOYEE_UPDATED'
    | 'EMPLOYEE_DEACTIVATED'
    | 'DOC_GENERATED'
    | 'DOC_DOWNLOADED';
  entityType: string;
  entityId: string;
  metadata: any;
  user: { id: string; email: string } | null;
};

const PAGE_SIZE = 10;

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function actionLabel(action: AuditLog['action']) {
  switch (action) {
    case 'EMPLOYEE_CREATED':
      return 'Үүсгэсэн';
    case 'EMPLOYEE_UPDATED':
      return 'Шинэчилсэн';
    case 'EMPLOYEE_DEACTIVATED':
      return 'Устгасан';
    case 'DOC_GENERATED':
      return 'Үүсгэсэн';
    case 'DOC_DOWNLOADED':
      return 'Үзсэн';
    default:
      return action;
  }
}

function typeLabel(entityType: string) {
  switch (entityType) {
    case 'Employee':
      return 'Ажилтан';
    case 'GeneratedDocument':
      return 'Баримт';
    case 'User':
      return 'Хэрэглэгч';
    default:
      return entityType;
  }
}

function employeeNameFromMeta(meta: any) {
  const ln = meta?.employeeLastName ?? '';
  const fn = meta?.employeeFirstName ?? '';
  const reg = meta?.employeeRegNo ? ` (${meta.employeeRegNo})` : '';
  const name = `${ln} ${fn}`.trim();
  return name ? name + reg : null;
}

function detailText(log: any) {
  if (log.entityType === 'Employee') {
    const emp = employeeNameFromMeta(log.metadata);

    if (log.action === 'EMPLOYEE_CREATED') {
      return emp ? `Ажилтан нэмсэн: ${emp}` : 'Ажилтан нэмсэн';
    }
    if (log.action === 'EMPLOYEE_UPDATED') {
      return emp ? `Ажилтан шинэчилсэн: ${emp}` : 'Ажилтан шинэчилсэн';
    }
    if (log.action === 'EMPLOYEE_DEACTIVATED') {
      return emp
        ? `Ажилтан идэвхгүй болгосон: ${emp}`
        : 'Ажилтан идэвхгүй болгосон';
    }
  }

  if (log.entityType === 'GeneratedDocument') {
    const docType = log.metadata?.docType;
    if (log.action === 'DOC_GENERATED')
      return docType ? `Баримт үүсгэсэн: ${docType}` : 'Баримт үүсгэсэн';
    if (log.action === 'DOC_DOWNLOADED')
      return docType ? `Баримт татсан: ${docType}` : 'Баримт татсан';
  }

  return '—';
}

export default function History() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('Үйлдэл');
  const [typeFilter, setTypeFilter] = useState('Төрөл');
  const [page, setPage] = useState(1);

  const actions = ['Бүх үйлдэл', 'Үүсгэсэн', 'Шинэчилсэн', 'Устгасан', 'Үзсэн'];
  const types = ['Бүх төрөл', 'Ажилтан', 'Баримт', 'Хэрэглэгч'];

  const actionArg = useMemo(() => {
    if (actionFilter === 'Үйлдэл' || actionFilter === 'Бүх үйлдэл') return null;
    if (actionFilter === 'Үүсгэсэн') return null;
    if (actionFilter === 'Шинэчилсэн') return 'EMPLOYEE_UPDATED';
    if (actionFilter === 'Устгасан') return 'EMPLOYEE_DEACTIVATED';
    if (actionFilter === 'Үзсэн') return 'DOC_DOWNLOADED';
    return null;
  }, [actionFilter]);

  const entityTypeArg = useMemo(() => {
    if (typeFilter === 'Төрөл' || typeFilter === 'Бүх төрөл') return null;
    if (typeFilter === 'Ажилтан') return 'Employee';
    if (typeFilter === 'Баримт') return 'GeneratedDocument';
    if (typeFilter === 'Хэрэглэгч') return 'User';
    return null;
  }, [typeFilter]);

  const skip = (page - 1) * PAGE_SIZE;

  const { data, loading, error } = useQuery<{ auditLogs: AuditLog[] }>(
    GET_AUDIT_LOGS,
    {
      variables: {
        action: actionArg,
        entityType: entityTypeArg,
        take: PAGE_SIZE,
        skip,
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  const filteredData = useMemo(() => {
    const list = data?.auditLogs ?? [];
    const q = search.trim().toLowerCase();
    if (!q) return list;

    return list.filter((item) => {
      const user = item.user?.email ?? '';
      const detail = detailText(item);
      return user.toLowerCase().includes(q) || detail.toLowerCase().includes(q);
    });
  }, [data?.auditLogs, search]);

  const hasNext = (data?.auditLogs?.length ?? 0) === PAGE_SIZE;
  const hasPrev = page > 1;

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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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
                      onClick={() => {
                        setActionFilter(act);
                        setPage(1);
                      }}
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
                      onClick={() => {
                        setTypeFilter(t);
                        setPage(1);
                      }}
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
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-14 text-center text-slate-500 text-sm"
                >
                  Ачаалж байна...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-14 text-center text-rose-600 text-sm"
                >
                  Алдаа: {error.message}
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => {
                const act = actionLabel(item.action);
                const typ = typeLabel(item.entityType);
                const detail = detailText(item);
                const who = item.user?.email ?? '—';

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {formatDate(item.createdAt)}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                          act === 'Устгасан'
                            ? 'bg-rose-50 text-rose-600 border-rose-100'
                            : act === 'Үүсгэсэн'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : 'bg-blue-50 text-[#005bb7] border-blue-100'
                        }`}
                      >
                        {act.toUpperCase()}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 font-semibold">
                      {typ}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                      {detail}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5 text-sm font-bold text-slate-900">
                        <div className="w-8 h-8 bg-blue-50 text-[#005bb7] rounded-lg flex items-center justify-center text-[11px] border border-blue-100 group-hover:scale-110 transition-transform">
                          {who.charAt(0).toUpperCase()}
                        </div>
                        {who}
                      </div>
                    </td>
                  </tr>
                );
              })
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

        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
          <div className="text-sm text-slate-500">
            Хуудас: <span className="font-semibold text-slate-700">{page}</span>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasPrev) setPage((p) => p - 1);
                  }}
                  aria-disabled={!hasPrev}
                  className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  isActive
                >
                  {page}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (hasNext) setPage((p) => p + 1);
                  }}
                  aria-disabled={!hasNext}
                  className={!hasNext ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
