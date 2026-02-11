'use client';

import React, { useMemo, useState } from 'react';
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
} from 'lucide-react';
import { AddEmployeeDialog } from './AddEmployes';
import { Dialog, DialogContent } from './ui/dialog';
import { AddEmployeeForm } from './AddEmployeeForm';
import { Button } from './ui/button';

type Employee = {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  salary: string;
  status: 'active' | 'trial';
};

const initialEmployees: Employee[] = [
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
type ContractType = 'employment' | 'nda' | 'liability' | 'probation';
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
export default function Employees() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [contractEmployee, setContractEmployee] = useState<Employee | null>(
    null,
  );
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = React.useState<FormState>(initialForm);

  const handleUpsertEmployee = (emp: Employee) => {
    setEmployees((prev) => {
      // Хэрэв id байгаа бол update хийнэ
      const index = prev.findIndex((e) => e.id === emp.id);
      if (index !== -1) {
        const updatedList = [...prev];
        updatedList[index] = emp;
        return updatedList;
      }
      // Байхгүй бол шинээр нэмнэ
      return [...prev, { ...emp, id: Date.now() }];
    });
    setEditEmployee(null);
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setOpenMenuId(null);
  };

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [employees, search]);

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
            onAdd={(newEmp) =>
              setEmployees((p) => [...p, { ...newEmp, id: Date.now() }])
            }
          />
        </div>
      </div>

      <div className="relative group max-w-sm">
        <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#005bb7] transition-colors">
          <Search className="h-4 w-4" strokeWidth={2.5} />
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
              {filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#005bb7] font-bold border border-blue-100/50 group-hover:scale-105 transition-transform">
                        {emp.name[0]}
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
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${emp.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}
                    >
                      {emp.status === 'active' ? 'Үндсэн ажилтан' : 'ТУРШИЛТЫН'}
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
                                setOpenMenuId(null);
                              }}
                              className="w-full text-left px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-[#005bb7] rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Eye className="h-4 w-4" /> Гэрээ харах
                            </button>
                            <button
                              onClick={() => {
                                setEditEmployee(emp);
                                setOpenMenuId(null);
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
            </tbody>
          </table>
        </div>
      </div>

      {editEmployee && (
        <Dialog
          open={!!editEmployee}
          onOpenChange={() => setEditEmployee(null)}
        >
          <DialogContent className="max-w-5xl h-[600px] bg-white p-0 overflow-hidden border-none rounded-[2rem]">
            <AddEmployeeForm
              isEdit
              initialData={editEmployee}
              onAdd={handleUpsertEmployee}
              onClose={() => setEditEmployee(null)}
            />
          </DialogContent>
        </Dialog>
      )}

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
                {[
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
                    title: 'Туршилтын гэрээ',
                    value: 'probation',
                    icon: Calendar,
                  },
                ].map((c) => {
                  const active = form.contractType === c.value;
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.value}
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
                          className={`h-4 w-4 ${active ? 'text-white' : 'text-blue-400'}`}
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
                      variant="ghost"
                      size="sm"
                      className="h-9 text-slate-500 hover:bg-blue-50 rounded-xl px-4"
                    >
                      <Download className="h-4 w-4 mr-2" /> Татах
                    </Button>
                    <Button
                      size="sm"
                      className="h-9 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-bold"
                    >
                      <Printer className="h-4 w-4 mr-2" /> Хэвлэх
                    </Button>
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-12 bg-blue-50/20 custom-scrollbar">
                  {form.contractType ? (
                    <div className="bg-white w-full max-w-[700px] mx-auto shadow-xl p-16 text-slate-900 min-h-[800px] rounded-sm relative text-[13px] leading-relaxed">
                      <div className="text-center mb-10">
                        <h2 className="font-black text-lg uppercase underline decoration-2 underline-offset-8">
                          {form.contractType === 'employment' &&
                            'Хөдөлмөрийн Гэрээ'}
                          {form.contractType === 'nda' && 'Нууц Хадгалах Гэрээ'}
                          {form.contractType === 'liability' &&
                            'Эд Хөрөнгийн Хариуцлагын Гэрээ'}
                          {form.contractType === 'probation' &&
                            'Туршилтын Хугацааны Гэрээ'}
                        </h2>
                      </div>

                      <p className="mb-6">
                        Энэхүү гэрээг нэг талаас{' '}
                        <strong>"Систем Консалтинг" ХХК</strong> (цаашид "Ажил
                        олгогч"), нөгөө талаас иргэн{' '}
                        <strong>{contractEmployee.name}</strong> (цаашид
                        "Ажилтан") нар харилцан тохиролцож Монгол Улсын
                        Хөдөлмөрийн тухай хууль болон бусад холбогдох хууль
                        тогтоомжийг үндэслэн байгуулав.
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

                      {form.contractType === 'probation' && (
                        <div className="space-y-4">
                          <h3 className="font-bold">1. Туршилтын хугацаа</h3>
                          <p>
                            1.1 Туршилтын хугацаа <strong>3</strong> сар байх
                            бөгөөд <strong>2024 оны 01 сарын 01</strong> өдрөөс
                            эхэлнэ.
                          </p>
                          <h3 className="font-bold">2. Үнэлгээ</h3>
                          <p>
                            2.1 Туршилтын хугацаанд ажилтны ур чадвар, хандлага,
                            ажлын үр дүнг үнэлж, цаашид үндсэн ажилтнаар
                            ажиллуулах эсэхийг шийдвэрлэнэ.
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
