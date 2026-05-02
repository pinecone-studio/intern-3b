'use client';

import React, { useMemo, useRef, useState } from 'react';

import {
  Search,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  FileText,
  ShieldCheck,
  Briefcase,
  Calendar,
  Download,
  Printer,
  type LucideIcon,
} from 'lucide-react';
import { useLazyQuery, useQuery } from '@apollo/client/react';

import { AddEmployeeForm } from '@/components/AddEmployeeForm';
import { AddEmployeeDialog } from '@/components/AddEmployes';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

import { EMPLOYEE, GET_EMPLOYEES_PAGE } from '@/app/api/graphql/queries';

type UIEmployee = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: string;
  status: 'active' | 'trial';
};

type GQLEmployee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  regNo: string;
  position: string;
  salary: number | null;
  status: 'ACTIVE' | 'INACTIVE';
  startDate: string;
  department: { id: string; name: string } | null;
};

type EmployeesPage = {
  items: GQLEmployee[];
  total: number;
  page: number;
  pageSize: number;
};

type ContractType = 'employment' | 'nda' | 'liability' | 'probation';

type ContractOption = {
  title: string;
  value: ContractType;
  icon: LucideIcon;
};

type FormState = {
  lastName: string;
  firstName: string;
  regNo: string;
  address: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  startDate: string;
  isProbation: boolean;
  probationMonths: string;
  bankName: string;
  accountNo: string;
  accountHolder: string;
  contractType?: ContractType;
};

const initialForm: FormState = {
  lastName: '',
  firstName: '',
  regNo: '',
  address: '',
  email: '',
  phone: '',
  position: '',
  department: '',
  startDate: '',
  isProbation: false,
  probationMonths: '3',
  bankName: '',
  accountNo: '',
  accountHolder: '',
  contractType: 'employment',
};

const CONTRACT_TYPE_OPTIONS: ContractOption[] = [
  {
    title: 'Хөдөлмөрийн гэрээ',
    value: 'employment',
    icon: FileText,
  },
  {
    title: 'Нууц хадгалах',
    value: 'nda',
    icon: ShieldCheck,
  },
  {
    title: 'Хариуцлагын гэрээ',
    value: 'liability',
    icon: Briefcase,
  },
  {
    title: 'Тушаал',
    value: 'probation',
    icon: Calendar,
  },
];

type EmployeeFull = {
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    regNo: string;
    position: string;
    startDate: string;
    status: 'ACTIVE' | 'INACTIVE';
    contractType: string;
    departmentId: string | null;
    department: { id: string; name: string } | null;
    bankAccounts: {
      id: string;
      bankName: string;
      accountNo: string;
      accountHolder: string;
      isPrimary: boolean;
    }[];
  };
};

const PAGE_SIZE = 10;

function formatMNT(value: number | null | undefined) {
  if (typeof value !== 'number') return '—';
  try {
    return new Intl.NumberFormat('mn-MN').format(value) + '₮';
  } catch {
    return `${value}₮`;
  }
}

function toUIStatus(status: 'ACTIVE' | 'INACTIVE'): 'active' | 'trial' {
  return status === 'ACTIVE' ? 'active' : 'trial';
}

function mapToUIEmployee(e: GQLEmployee): UIEmployee {
  return {
    id: e.id,
    name: `${e.lastName} ${e.firstName}`.trim(),
    email: e.email,
    role: e.position,
    department: e.department?.name ?? '—',
    salary: formatMNT(e.salary),
    status: toUIStatus(e.status),
  };
}

function safeDateOnly(isoOrDate: string | null | undefined) {
  if (!isoOrDate) return '';
  // ISO байвал YYYY-MM-DD
  if (isoOrDate.includes('T')) return isoOrDate.slice(0, 10);
  return isoOrDate.slice(0, 10);
}

export default function Employees() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const [contractEmployee, setContractEmployee] = useState<UIEmployee | null>(
    null,
  );

  // ✅ EDIT дээр LIST-ээс биш FULL employee query-оор татаж авна
  const [editEmployee, setEditEmployee] = useState<
    EmployeeFull['employee'] | null
  >(null);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Contract dialog дээр preview-д ашиглах локал form
  const [form, setForm] = useState<FormState>(initialForm);

  const { data, loading, error, refetch } = useQuery<{
    employees: EmployeesPage;
  }>(GET_EMPLOYEES_PAGE, {
    variables: {
      page,
      pageSize: PAGE_SIZE,
      search: search.trim() ? search.trim() : null,
      departmentId: null,
      status: null,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [fetchEmployee] = useLazyQuery<EmployeeFull>(EMPLOYEE, {
    fetchPolicy: 'network-only',
  });

  const employees: UIEmployee[] = useMemo(() => {
    const items = data?.employees?.items ?? [];
    return items.map(mapToUIEmployee);
  }, [data?.employees?.items]);

  const total = data?.employees?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleUpsertEmployee = async (_emp: any) => {
    setEditEmployee(null);
    await refetch();
  };

  const handleDeleteEmployee = async (_id: string) => {
    setOpenMenuId(null);
    await refetch();
  };

  const contractRef = useRef<HTMLDivElement>(null);

  function fillDemoDataFromContractEmployee() {
    if (!contractEmployee) return;

    const parts = (contractEmployee.name ?? '').trim().split(' ');
    const lastName = parts[0] ?? '';
    const firstName = parts.slice(1).join(' ') || 'Нэр';

    setForm((p) => ({
      ...p,
      lastName,
      firstName,
      regNo: p.regNo || 'AA12345678',
      email: contractEmployee.email || p.email,
      position: contractEmployee.role || p.position,
      department: contractEmployee.department || p.department,
      startDate: p.startDate || new Date().toISOString().slice(0, 10),

      bankName: p.bankName || 'Хаан Банк',
      accountNo: p.accountNo || '5000000000',
      accountHolder: p.accountHolder || contractEmployee.name,
    }));
  }

  function printContract() {
    if (!contractRef.current) return;

    const html = contractRef.current.outerHTML;
    const w = window.open('', '_blank', 'width=900,height=650');
    if (!w) return;

    w.document.open();
    w.document.write(`
      <html>
        <head>
          <title>Contract Print</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            .shadow-xl, .shadow-sm { box-shadow: none !important; }
            .border { border-color: #ddd !important; }
          </style>
        </head>
        <body>
          ${html}
          <script>
            window.onload = () => {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    w.document.close();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Ажилчид
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Байгууллагын нийт хүний нөөцийн мэдээлэл болон бүртгэл.
          </p>
        </div>

        <div className="bg-blue-600 rounded-xl overflow-hidden hover:bg-blue-700 transition-colors">
          <AddEmployeeDialog
            onAdd={async () => {
              setPage(1);
              await refetch();
            }}
          />
        </div>
      </div>

      <div className="relative group max-w-sm">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#005bb7] transition-colors">
          <Search className="h-4 w-4" strokeWidth={2.5} />
        </div>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Нэрээр хайх..."
          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#005bb7] transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Ажилтан
                </th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Албан тушаал
                </th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Цалин
                </th>
                <th className="px-6 py-4 text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Төлөв
                </th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {loading && (
                <tr>
                  <td className="px-6 py-6 text-sm text-slate-500" colSpan={5}>
                    Loading employees…
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td className="px-6 py-6 text-sm text-rose-600" colSpan={5}>
                    Failed to load employees: {error.message}
                    <button
                      className="ml-3 underline text-slate-600"
                      onClick={() => refetch()}
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                employees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="group hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#005bb7] font-bold border border-blue-100/50 group-hover:scale-105 transition-transform">
                          {emp.name?.[0] ?? '?'}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">
                            {emp.name}
                          </p>
                          <p className="text-xs text-slate-500 font-medium">
                            {emp.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <p className="text-slate-800 font-semibold">{emp.role}</p>
                      <p className="text-xs text-slate-400 font-medium">
                        {emp.department}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-slate-700">
                      {emp.salary}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${
                          emp.status === 'active'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                            : 'bg-amber-50 text-amber-600 border-amber-100'
                        }`}
                      >
                        {emp.status === 'active'
                          ? 'Үндсэн ажилтан'
                          : 'ТУРШИЛТЫН'}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === emp.id ? null : emp.id)
                          }
                          className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 text-slate-400 hover:text-[#005bb7]"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>

                        {openMenuId === emp.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setOpenMenuId(null)}
                            ></div>

                            <div className="absolute right-0 mt-2 z-20 w-44 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 animate-in zoom-in-95 duration-100">
                              <button
                                onClick={() => {
                                  setContractEmployee(emp);
                                  // contract dialog form-оо тухайн ажилтнаар автоматаар дүүргэнэ
                                  setForm((p) => ({
                                    ...p,
                                    lastName: emp.name.split(' ')[0] || '',
                                    firstName:
                                      emp.name.split(' ').slice(1).join(' ') ||
                                      '',
                                    email: emp.email || '',
                                    position: emp.role || '',
                                    department: emp.department || '',
                                  }));
                                  setOpenMenuId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#005bb7] rounded-lg flex items-center gap-2 transition-colors"
                              >
                                <Eye className="h-4 w-4" /> Гэрээ харах
                              </button>

                              <button
                                onClick={async () => {
                                  setOpenMenuId(null);
                                  try {
                                    const res = await fetchEmployee({
                                      variables: { id: emp.id },
                                    });
                                    const full = res.data?.employee;
                                    if (!full)
                                      throw new Error('Employee олдсонгүй.');
                                    setEditEmployee(full);
                                  } catch (e: any) {
                                    console.error(e);
                                    alert(
                                      e?.message ??
                                        'Ажилтны мэдээлэл татахад алдаа гарлаа',
                                    );
                                  }
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#005bb7] rounded-lg flex items-center gap-2 transition-colors"
                              >
                                <Pencil className="h-4 w-4" /> Засах
                              </button>

                              <div className="h-px bg-slate-100 my-1"></div>

                              <button
                                onClick={() => handleDeleteEmployee(emp.id)}
                                className="w-full text-left px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                              >
                                <Trash2 className="h-4 w-4" /> Устгах
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

              {!loading && !error && employees.length === 0 && (
                <tr>
                  <td className="px-6 py-6 text-sm text-slate-500" colSpan={5}>
                    Ажилтан олдсонгүй.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <div className="text-sm text-slate-500">
            Нийт: <span className="font-semibold text-slate-700">{total}</span>
            {' • '}
            Хуудас: <span className="font-semibold text-slate-700">
              {page}
            </span>{' '}
            / {totalPages}
          </div>

          <div className="flex gap-2">
            <button
              className="px-3 py-2 rounded-lg border text-sm disabled:opacity-50"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Өмнөх
            </button>

            <button
              className="px-3 py-2 rounded-lg border text-sm disabled:opacity-50"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Дараах
            </button>
          </div>
        </div>
      </div>

      {/* ✅ EDIT DIALOG: FULL data ашиглаж form дүүргэнэ */}
      {editEmployee && (
        <Dialog
          open={!!editEmployee}
          onOpenChange={() => setEditEmployee(null)}
        >
          <DialogContent className="max-w-5xl h-[600px] bg-white p-0 overflow-hidden border-none rounded-[2rem]">
            <AddEmployeeForm
              isEdit
              initialData={{
                id: editEmployee.id,
                name: `${editEmployee.lastName} ${editEmployee.firstName}`.trim(),

                email: editEmployee.email,
                regNo: editEmployee.regNo,
                role: editEmployee.position,
                position: editEmployee.position,

                startDate: safeDateOnly(editEmployee.startDate),
                department: editEmployee.department?.name ?? '',

                status: editEmployee.status === 'ACTIVE' ? 'active' : 'trial',

                bankName:
                  editEmployee.bankAccounts?.find((b) => b.isPrimary)
                    ?.bankName ?? '',
                accountNo:
                  editEmployee.bankAccounts?.find((b) => b.isPrimary)
                    ?.accountNo ?? '',
                accountHolder:
                  editEmployee.bankAccounts?.find((b) => b.isPrimary)
                    ?.accountHolder ?? '',
              }}
              onAdd={handleUpsertEmployee as any}
              onClose={() => setEditEmployee(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* CONTRACT PREVIEW DIALOG */}
      {contractEmployee && (
        <Dialog
          open={!!contractEmployee}
          onOpenChange={() => setContractEmployee(null)}
        >
          <DialogContent className="max-w-5xl bg-white rounded-2xl p-10 border-none">
            <div className="flex gap-8 h-[600px] -mx-4">
              <div className="w-64 space-y-3">
                <div className="mb-6 px-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Гэрээний төрөл
                  </h3>
                  <p className="text-xs text-slate-500">
                    Байгуулах гэрээгээ сонгоно уу
                  </p>
                </div>

                {CONTRACT_TYPE_OPTIONS.map((c) => {
                  const active = form.contractType === c.value;
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          contractType: c.value as any,
                        }))
                      }
                      className={`w-full flex flex-col gap-1 px-5 py-5 rounded-2xl transition-all ${
                        active
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]'
                          : 'hover:bg-blue-50 text-slate-500 bg-white border border-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 ${
                            active ? 'text-white' : 'text-blue-400'
                          }`}
                        />
                        <span className="text-[11px] font-black uppercase tracking-tight">
                          {c.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 flex flex-col rounded-[2.5rem] bg-slate-50 border border-blue-100 overflow-hidden shadow-sm relative">
                <div className="bg-white/80 backdrop-blur-md border-b border-blue-50 p-4 flex justify-between items-center px-8">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    {form.contractType
                      ? `${form.contractType.toUpperCase()}_FINAL.pdf`
                      : 'No_Document_Selected.pdf'}
                  </span>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 text-slate-500 hover:bg-blue-50 rounded-xl px-4"
                      onClick={() => {
                        // Энэ хэсэгт чи pdf download-оо (html2canvas/jspdf) холбоод явна.
                        // Одоогоор contract preview-г л хэвлэх/татах дээр өмнөх шийдлээр чинь барьж болно.
                        alert('Download функцээ энд холбоно (pdf).');
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" /> Татах
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      className="h-9 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-bold"
                      onClick={printContract}
                    >
                      <Printer className="h-4 w-4 mr-2" /> Хэвлэх
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-12 bg-blue-50/20 custom-scrollbar">
                  {form.contractType ? (
                    <div
                      ref={contractRef}
                      className="bg-white w-full max-w-[700px] mx-auto shadow-xl p-16 text-slate-900 min-h-[800px] rounded-sm relative text-[13px] leading-relaxed"
                    >
                      <div className="text-center mb-10">
                        <h2 className="font-black text-lg uppercase underline decoration-2 underline-offset-8">
                          {form.contractType === 'employment' &&
                            'Хөдөлмөрийн Гэрээ'}
                          {form.contractType === 'nda' && 'Нууц Хадгалах Гэрээ'}
                          {form.contractType === 'liability' &&
                            'Эд Хөрөнгийн Хариуцлагын Гэрээ'}
                          {form.contractType === 'probation' &&
                            'Ажилд авах тухай Тушаал'}
                        </h2>
                      </div>

                      <p className="mb-6">
                        Энэхүү гэрээг нэг талаас{' '}
                        <strong>"ДокСпринт" ХХК</strong> (цаашид “Ажил олгогч”),
                        нөгөө талаас иргэн{' '}
                        <strong>{contractEmployee.name}</strong> (цаашид
                        “Ажилтан”) нар харилцан тохиролцож Монгол Улсын
                        холбогдох хууль тогтоомжийг үндэслэн байгуулав.
                      </p>

                      {form.contractType === 'employment' && (
                        <div className="space-y-4">
                          <h3 className="font-bold">
                            1. Ажлын байр, чиг үүрэг
                          </h3>
                          <p>
                            1.1 Ажилтан нь{' '}
                            <strong>{contractEmployee.role}</strong> албан
                            тушаалд,{' '}
                            <strong>{contractEmployee.department}</strong>{' '}
                            хэлтэст ажиллана.
                          </p>

                          {contractEmployee.status === 'trial' && (
                            <p>
                              1.3 Ажилтан нь үндсэн ажилтнаар томилогдохоос өмнө{' '}
                              <strong>3</strong> сарын туршилтын хугацаатай
                              ажиллана.
                            </p>
                          )}

                          <h3 className="font-bold">
                            2. Цалин хөлс, нийгмийн баталгаа
                          </h3>
                          <p>
                            2.1 Ажил олгогч нь сар бүрийн цалинг тогтоосон
                            хугацаанд олгож, НДШ, ХХОАТ-ыг хуулийн дагуу суутган
                            төлнө.
                          </p>
                        </div>
                      )}

                      {form.contractType === 'nda' && (
                        <div className="space-y-4">
                          <h3 className="font-bold">
                            1. Нууц мэдээллийн тодорхойлолт
                          </h3>
                          <p>
                            1.1 Компанийн бизнес төлөвлөгөө, харилцагчийн
                            мэдээлэл болон бусад дотоод мэдээллийг ажилтан{' '}
                            <strong>{contractEmployee.name}</strong> нь
                            гуравдагч этгээдэд задруулахгүй байх үүрэг хүлээнэ.
                          </p>
                        </div>
                      )}

                      {form.contractType === 'liability' && (
                        <div className="space-y-4">
                          <h3 className="font-bold">
                            1. Эд хөрөнгийн ашиглалт
                          </h3>
                          <p>
                            1.1 Ажил олгогчоос хүлээлгэн өгсөн эд хөрөнгийг
                            ажилтан зориулалтын дагуу ашиглана.
                          </p>
                        </div>
                      )}

                      {form.contractType === 'probation' && (
                        <div className="space-y-6">
                          <div className="text-center">
                            <p className="font-bold text-sm">
                              ................................................
                              ХХК
                            </p>
                            <p className="font-bold text-sm">
                              ЕРӨНХИЙ ЗАХИРЛЫН ТУШААЛ
                            </p>
                            <p className="text-sm mt-2">
                              {form.startDate || '____-__-__'} өдөр
                            </p>
                            <p className="text-sm">Дугаар ________</p>
                            <p className="font-bold mt-4 underline">
                              {contractEmployee.name}-ийг ажилд авах тухай
                            </p>
                          </div>

                          <p>
                            Монгол Улсын Хөдөлмөрийн тухай хуулийн холбогдох
                            заалтууд болон ажилтны өргөдлийг үндэслэн ТУШААХ НЬ:
                          </p>

                          <div className="space-y-3">
                            <p>
                              1. <strong>{contractEmployee.name}</strong>-ийг{' '}
                              {form.startDate || '____-__-__'} өдрөөс эхлэн{' '}
                              <strong>{contractEmployee.department}</strong>{' '}
                              нэгжид <strong>{contractEmployee.role}</strong>{' '}
                              албан тушаалд{' '}
                              <strong>{form.probationMonths || '3'}</strong>{' '}
                              хүртэл сарын туршилтын хугацаатай ажиллуулсугай.
                            </p>
                            <p>
                              2. Ажил үүрэгтэй нь танилцуулж, ажлын зааварчилгаа
                              өгч ажилд нь оруулахыг Хүний нөөцийн менежерт
                              үүрэг болгосугай.
                            </p>
                            <p>
                              3. Туршилтын хугацааны сарын үндсэн цалинг{' '}
                              <strong>__________</strong> төгрөгөөр бодож
                              олгохыг Ерөнхий нягтлан бодогчид зөвшөөрсүгэй.
                            </p>
                            <p>
                              4. Тушаалын хэрэгжилтэд хяналт тавьж ажиллахыг{' '}
                              <strong>{contractEmployee.department}</strong>{' '}
                              нэгжийн удирдлагад даалгасугай.
                            </p>
                          </div>

                          <div className="mt-16 text-right">
                            <p className="font-bold">ЕРӨНХИЙ ЗАХИРАЛ</p>
                            <div className="border-b w-48 ml-auto mt-6"></div>
                          </div>
                        </div>
                      )}

                      <div className="mt-20 flex justify-between items-end gap-10 border-t pt-10">
                        <div className="flex-1 space-y-8">
                          <p className="font-bold uppercase text-[10px] text-slate-400">
                            Ажил олгогчийг төлөөлж:
                          </p>
                          <div className="border-b border-slate-300 w-full h-8"></div>
                          <p className="text-[11px]">/Тамга, тэмдэг/</p>
                        </div>
                        <div className="flex-1 space-y-8">
                          <p className="font-bold uppercase text-[10px] text-slate-400">
                            Ажилтан:
                          </p>
                          <div className="border-b border-slate-300 w-full h-8 flex items-end">
                            <span className="text-[11px] font-bold text-blue-600 pb-1">
                              {contractEmployee.name}
                            </span>
                          </div>
                          <p className="text-[11px]">/Гарын үсэг/</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-blue-200 gap-4">
                      <FileText className="h-20 w-20 opacity-20" />
                      <p className="font-bold text-blue-300 uppercase tracking-tighter">
                        Гэрээний төрөл сонгоно уу
                      </p>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={fillDemoDataFromContractEmployee}
                      >
                        Demo fill
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
