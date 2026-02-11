'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  Briefcase,
  CreditCard,
  Check,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock, // Нэмэлтээр цагны icon авлаа
} from 'lucide-react';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { DialogHeader, DialogTitle } from '../components/ui/dialog';

type Step = 'personal' | 'job' | 'bank' | 'contract';
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
  // Шинэ талбарууд:
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
  isProbation: false, // Default утга
  probationMonths: '3', // Default 3 сар
  bankName: '',
  accountNo: '',
  accountHolder: '',
  contractType: undefined,
};

interface AddEmployeeFormProps {
  onClose: () => void;
}

export function AddEmployeeForm({ onClose }: AddEmployeeFormProps) {
  const [step, setStep] = React.useState<Step>('personal');
  const [direction, setDirection] = React.useState(1);
  const [form, setForm] = React.useState<FormState>(initialForm);

  const steps: Step[] = ['personal', 'job', 'bank', 'contract'];
  const stepIndex = steps.indexOf(step);

  const fillDemoData = () => {
    setForm({
      lastName: 'Бат',
      firstName: 'Болд',
      regNo: 'УУ90010111',
      address: 'Улаанбаатар хот, Хан-Уул дүүрэг, 15-р хороо',
      email: 'bold.b@company.mn',
      phone: '99112233',
      position: 'Ахлах систем администратор',
      department: 'Мэдээлэл Технологийн Хэлтэс',
      startDate: '2024-03-01',
      isProbation: true,
      probationMonths: '3',
      bankName: 'Хаан Банк',
      accountNo: '5001234567',
      accountHolder: 'Бат Болд',
      contractType: 'employment',
    });
  };

  const setField =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const canGoNext = React.useMemo(() => {
    if (step === 'personal') {
      return (
        form.lastName.trim() &&
        form.firstName.trim() &&
        form.regNo.trim() &&
        form.phone.trim()
      );
    }
    if (step === 'job') {
      const basicJob = form.position.trim() && form.startDate.trim();
      // Хэрэв туршилтын хугацаатай бол сараа заавал бөглөсөн байх
      if (form.isProbation) {
        return basicJob && form.probationMonths.trim();
      }
      return basicJob;
    }
    if (step === 'bank') {
      return form.bankName.trim() && form.accountNo.trim();
    }
    if (step === 'contract') {
      return !!form.contractType;
    }
    return false;
  }, [step, form]);

  const goNext = () => {
    if (!canGoNext) return;
    setDirection(1);
    setStep(steps[Math.min(stepIndex + 1, steps.length - 1)]);
  };

  const goBack = () => {
    setDirection(-1);
    setStep(steps[Math.max(stepIndex - 1, 0)]);
  };

  const resetAll = () => {
    setStep('personal');
    setDirection(1);
    setForm(initialForm);
  };

  const onSubmit = () => {
    if (!canGoNext) return;
    console.log('SUBMIT:', form);
    onClose();
    resetAll();
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  return (
    <div className="flex h-full min-h-[780px]">
      {/* Sidebar - Same */}
      <div className="w-64 bg-gradient-to-b from-blue-50/50 to-white border-r border-blue-50 p-8 hidden md:flex flex-col">
        <div className="mb-12">
          <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-blue-100">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="font-extrabold text-slate-800 text-xl tracking-tight">
            Бүртгэл
          </h2>
          <p className="text-blue-400 text-[11px] font-bold uppercase tracking-wider">
            Шинэ ажилтан үүсгэх
          </p>
        </div>

        <div className="space-y-7 relative flex-1">
          {steps.map((s, i) => {
            const isActive = i === stepIndex;
            const isCompleted = i < stepIndex;
            return (
              <div key={s} className="flex items-center gap-4 relative z-10">
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300 border-2 ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-100 scale-110'
                      : isCompleted
                        ? 'bg-blue-100 border-blue-100 text-blue-600'
                        : 'bg-white border-slate-100'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" strokeWidth={3} />
                  ) : (
                    <span
                      className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}
                    >
                      0{i + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm font-bold tracking-tight transition-colors ${isActive ? 'text-blue-700' : 'text-slate-400'}`}
                >
                  {s === 'personal'
                    ? 'Хувийн'
                    : s === 'job'
                      ? 'Ажлын'
                      : s === 'bank'
                        ? 'Санхүү'
                        : 'Гэрээ'}
                </span>
              </div>
            );
          })}
        </div>

        <Button
          variant="ghost"
          onClick={fillDemoData}
          className="mt-auto bg-blue-50/50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-2xl py-6 flex items-center gap-2 border border-blue-100 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold">Demo Data</span>
        </Button>
      </div>

      <div className="flex-1 flex flex-col bg-white relative">
        <DialogHeader className="p-10 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1 w-8 bg-blue-600 rounded-full" />
            <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em]">
              Алхам 0{stepIndex + 1}
            </span>
          </div>
          <DialogTitle className="text-3xl font-black text-slate-900 tracking-tight">
            {step === 'personal' && 'Хувийн мэдээлэл'}
            {step === 'job' && 'Ажлын мэдээлэл'}
            {step === 'bank' && 'Банкны мэдээлэл'}
            {step === 'contract' && 'Гэрээ байгуулах'}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 px-10 py-4 overflow-y-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              {step === 'personal' && (
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Овог
                    </Label>
                    <Input
                      value={form.lastName}
                      onChange={setField('lastName')}
                      placeholder="Овог"
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Нэр
                    </Label>
                    <Input
                      value={form.firstName}
                      onChange={setField('firstName')}
                      placeholder="Нэр"
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all text-sm font-semibold"
                    />
                  </div>
                  <div className="space-y-3 col-span-2">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Регистрын дугаар
                    </Label>
                    <Input
                      value={form.regNo}
                      onChange={setField('regNo')}
                      placeholder="AA00000000"
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:ring-4 focus:ring-blue-50 font-mono tracking-[0.2em] uppercase text-sm font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      И-мэйл хаяг
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                      <Input
                        type="email"
                        value={form.email}
                        onChange={setField('email')}
                        placeholder="mail@company.mn"
                        className="h-14 pl-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-sm font-semibold"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Утасны дугаар
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                      <Input
                        value={form.phone}
                        onChange={setField('phone')}
                        placeholder="99000000"
                        className="h-14 pl-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-sm font-bold font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 'job' && (
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Албан тушаал
                    </Label>
                    <div className="relative">
                      <Briefcase className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                      <Input
                        value={form.position}
                        onChange={setField('position')}
                        placeholder="Албан тушаал"
                        className="h-14 pl-14 rounded-2xl border-slate-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Хэлтэс, алба
                    </Label>
                    <div className="relative">
                      <Building2 className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                      <Input
                        value={form.department}
                        onChange={setField('department')}
                        placeholder="Хэлтэс"
                        className="h-14 pl-14 rounded-2xl border-slate-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Ажилд орсон огноо
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                      <Input
                        type="date"
                        value={form.startDate}
                        onChange={setField('startDate')}
                        className="h-14 pl-14 rounded-2xl border-slate-100 font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Туршилтын хугацаа
                    </Label>
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          setForm((p) => ({
                            ...p,
                            isProbation: !p.isProbation,
                          }))
                        }
                        className={`flex-1 h-14 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all ${
                          form.isProbation
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-slate-100 bg-slate-50/50 text-slate-400'
                        }`}
                      >
                        <Clock className="h-5 w-5" />
                        <span className="text-sm font-bold">
                          {form.isProbation
                            ? 'Туршилтаар авна'
                            : 'ндсэн ажилтан'}
                        </span>
                      </button>

                      {form.isProbation && (
                        <div className="w-24">
                          <Input
                            type="number"
                            value={form.probationMonths}
                            onChange={setField('probationMonths')}
                            className="h-14 rounded-2xl border-blue-100 text-center font-bold"
                            placeholder="Сар"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 col-span-2">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-widest ml-1">
                      Оршин суугаа хаяг
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                      <Input
                        value={form.address}
                        onChange={setField('address')}
                        placeholder="Дэлгэрэнгүй хаяг..."
                        className="h-14 pl-14 rounded-2xl border-slate-100"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 'bank' && (
                <div className="space-y-10 py-4">
                  <div className="space-y-5">
                    <Label className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] ml-1">
                      Банк сонгох
                    </Label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: 'Хаан Банк', color: '#00A950' },
                        { name: 'Голомт Банк', color: '#1B3168' },
                        { name: 'ХХБ', color: '#004A99' },
                        { name: 'Хас Банк', color: '#E30613' },
                        { name: 'Төрийн Банк', color: '#005CAB' },
                        { name: 'Капитрон', color: '#0054A6' },
                      ].map((bank) => {
                        const isSelected = form.bankName === bank.name;
                        return (
                          <button
                            key={bank.name}
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                bankName: bank.name,
                              }))
                            }
                            className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group ${
                              isSelected
                                ? 'border-blue-600 bg-blue-50/40 shadow-md'
                                : 'border-slate-50 bg-white hover:border-blue-100 hover:bg-slate-50/50'
                            }`}
                          >
                            <div
                              className={`w-2 h-8 rounded-full`}
                              style={{ backgroundColor: bank.color }}
                            />
                            <span
                              className={`text-xs font-bold ${isSelected ? 'text-blue-700' : 'text-slate-600'}`}
                            >
                              {bank.name}
                            </span>
                            {isSelected && (
                              <div className="ml-auto bg-blue-600 text-white rounded-full p-1 shadow-sm">
                                <Check className="h-3 w-3" strokeWidth={4} />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 bg-blue-50/30 p-8 rounded-[2.5rem] border border-blue-50">
                    <div className="space-y-3">
                      <Label className="text-slate-400 text-[10px] font-black uppercase ml-1">
                        Дансны дугаар
                      </Label>
                      <div className="relative">
                        <CreditCard className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                        <Input
                          value={form.accountNo}
                          onChange={setField('accountNo')}
                          placeholder="0000000000"
                          className="h-14 pl-14 rounded-2xl border-white bg-white focus:ring-4 focus:ring-blue-100 font-mono text-lg font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-400 text-[10px] font-black uppercase ml-1">
                        Эзэмшигчийн нэр
                      </Label>
                      <div className="relative">
                        <User className="absolute left-5 top-4.5 h-5 w-5 text-blue-300" />
                        <Input
                          value={form.accountHolder}
                          onChange={setField('accountHolder')}
                          placeholder="Нэр"
                          className="h-14 pl-14 rounded-2xl border-white bg-white font-bold"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 'contract' && (
                <div className="flex gap-8 h-[500px] -mx-4">
                  <div className="w-64 space-y-3">
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
                              {form.contractType === 'nda' &&
                                'Нууц Хадгалах Гэрээ'}
                              {form.contractType === 'liability' &&
                                'Эд Хөрөнгийн Хариуцлагын Гэрээ'}
                              {form.contractType === 'probation' &&
                                'Туршилтын Хугацааны Гэрээ'}
                            </h2>
                          </div>

                          <p className="mb-6">
                            Энэхүү гэрээг нэг талаас{' '}
                            <strong>"Систем Консалтинг" ХХК</strong> (цаашид
                            "Ажил олгогч"), нөгөө талаас иргэн{' '}
                            <strong>
                              {form.lastName} {form.firstName}
                            </strong>{' '}
                            (цаашид "Ажилтан") нар харилцан тохиролцож Монгол
                            Улсын Хөдөлмөрийн тухай хууль болон бусад холбогдох
                            хууль тогтоомжийг үндэслэн байгуулав.
                          </p>

                          {form.contractType === 'employment' && (
                            <div className="space-y-4">
                              <h3 className="font-bold">
                                1. Ажлын байр, чиг үүрэг
                              </h3>
                              <p>
                                1.1 Ажилтан нь{' '}
                                <strong>{form.position || 'тусгагдсан'}</strong>{' '}
                                албан тушаалд,{' '}
                                <strong>{form.department || 'үндсэн'}</strong>{' '}
                                хэлтэст ажиллана.
                              </p>
                              {form.isProbation && (
                                <p>
                                  1.3 Ажилтан нь үндсэн ажилтнаар томилогдохоос
                                  өмнө <strong>{form.probationMonths}</strong>{' '}
                                  сарын туршилтын хугацаатай ажиллана.
                                </p>
                              )}
                              <h3 className="font-bold">
                                2. Цалин хөлс, нийгмийн баталгаа
                              </h3>
                              <p>
                                2.1 Ажил олгогч нь сар бүрийн цалинг тогтоосон
                                хугацаанд олгож, НДШ, ХХОАТ-ыг хуулийн дагуу
                                суутган төлнө.
                              </p>
                            </div>
                          )}

                          {form.contractType === 'probation' && (
                            <div className="space-y-4">
                              <h3 className="font-bold">
                                1. Туршилтын хугацаа
                              </h3>
                              <p>
                                1.1 Туршилтын хугацаа{' '}
                                <strong>{form.probationMonths || '3'}</strong>{' '}
                                сар байх бөгөөд{' '}
                                <strong>
                                  {form.startDate || '____ оны __ сарын __'}
                                </strong>{' '}
                                өдрөөс эхэлнэ.
                              </p>
                              <h3 className="font-bold">2. Үнэлгээ</h3>
                              <p>
                                2.1 Туршилтын хугацаанд ажилтны ур чадвар,
                                хандлага, ажлын үр дүнг үнэлж, цаашид үндсэн
                                ажилтнаар ажиллуулах эсэхийг шийдвэрлэнэ.
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
                                мэдээлэл...
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
                                  {form.lastName} {form.firstName}
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
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="p-10 bg-white border-t border-slate-50 flex items-center justify-between">
          <Button
            variant="ghost"
            className="text-slate-400 font-bold hover:text-red-500 transition-colors px-6"
            onClick={() => {
              onClose();
              resetAll();
            }}
          >
            Болих
          </Button>

          <div className="flex gap-4">
            {stepIndex > 0 && (
              <Button
                variant="outline"
                className="border-slate-100 text-slate-500 font-bold rounded-2xl h-14 px-8 hover:bg-slate-50 transition-all"
                onClick={goBack}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Буцах
              </Button>
            )}

            <Button
              className={`min-w-[200px] h-14 rounded-2xl font-black tracking-tight transition-all flex items-center justify-center gap-2 ${
                canGoNext
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-100 scale-100 hover:translate-y-[-2px] border-b-4 border-blue-800'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
              onClick={stepIndex < steps.length - 1 ? goNext : onSubmit}
              disabled={!canGoNext}
            >
              {stepIndex < steps.length - 1 ? (
                <>
                  Үргэлжлүүлэх <ChevronRight className="h-5 w-5" />
                </>
              ) : (
                <>
                  Бүртгэлийг дуусгах{' '}
                  <Check className="h-5 w-5" strokeWidth={3} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
