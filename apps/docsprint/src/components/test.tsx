
'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  User,
  Briefcase,
  CreditCard,
  Plus,
  ChevronRight,
  ChevronLeft,
  Check,
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';

type Step = 'personal' | 'job' | 'bank';

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
  bankName: string;
  accountNo: string;
  accountHolder: string;
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
  bankName: '',
  accountNo: '',
  accountHolder: '',
};

export function AddEmployee() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Step>('personal');
  const [direction, setDirection] = React.useState(1);
  const [form, setForm] = React.useState<FormState>(initialForm);

  const steps: Step[] = ['personal', 'job', 'bank'];
  const stepIndex = steps.indexOf(step);

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
      return form.position.trim() && form.startDate.trim();
    }
    if (step === 'bank') {
      return form.bankName.trim() && form.accountNo.trim();
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
    setOpen(false);
    resetAll();
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 20 : -20, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -20 : 20, opacity: 0 }),
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) resetAll();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-[#005bb7] hover:bg-[#004a96] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center gap-2">
          <Plus className="h-4 w-4" strokeWidth={3} />
          Ажилтан нэмэх
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[640px] bg-white rounded-[32px] border-none shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 pb-4 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <User className="h-5 w-5 text-[#005bb7]" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900">
                Шинэ ажилтан бүртгэх
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs font-medium">
                Ажилтны мэдээллийг 3 алхамтайгаар оруулна уу
              </DialogDescription>
            </div>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-2 mt-6">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i <= stepIndex ? 'bg-[#005bb7]' : 'bg-slate-200'
                  }`}
                />
              </React.Fragment>
            ))}
          </div>
        </DialogHeader>

        <div className="p-8 pt-4">
          <Tabs value={step} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100/80 p-1 rounded-xl mb-8 pointer-events-none">
              <TabsTrigger
                value="personal"
                className="rounded-lg text-xs font-bold gap-2 data-[state=active]:bg-white data-[state=active]:text-[#005bb7] data-[state=active]:shadow-sm"
              >
                <User className="h-3.5 w-3.5" /> Хувийн
              </TabsTrigger>
              <TabsTrigger
                value="job"
                className="rounded-lg text-xs font-bold gap-2 data-[state=active]:bg-white data-[state=active]:text-[#005bb7] data-[state=active]:shadow-sm"
              >
                <Briefcase className="h-3.5 w-3.5" /> Ажлын
              </TabsTrigger>
              <TabsTrigger
                value="bank"
                className="rounded-lg text-xs font-bold gap-2 data-[state=active]:bg-white data-[state=active]:text-[#005bb7] data-[state=active]:shadow-sm"
              >
                <CreditCard className="h-3.5 w-3.5" /> Банк
              </TabsTrigger>
            </TabsList>

            <div className="relative min-h-[340px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  {step === 'personal' && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Овог
                        </Label>
                        <Input
                          value={form.lastName}
                          onChange={setField('lastName')}
                          placeholder="Овог"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Нэр
                        </Label>
                        <Input
                          value={form.firstName}
                          onChange={setField('firstName')}
                          placeholder="Нэр"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Регистрын дугаар
                        </Label>
                        <Input
                          value={form.regNo}
                          onChange={setField('regNo')}
                          placeholder="AA00000000"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          И-мэйл хаяг
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                          <Input
                            type="email"
                            value={form.email}
                            onChange={setField('email')}
                            placeholder="example@company.mn"
                            className="h-11 pl-10 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Утасны дугаар
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                          <Input
                            value={form.phone}
                            onChange={setField('phone')}
                            placeholder="9900...."
                            className="h-11 pl-10 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 'job' && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Албан тушаал
                        </Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                          <Input
                            value={form.position}
                            onChange={setField('position')}
                            placeholder="Жишээ: Ахлах менежер"
                            className="h-11 pl-10 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Хэлтэс
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                          <Input
                            value={form.department}
                            onChange={setField('department')}
                            placeholder="Жишээ: IT"
                            className="h-11 pl-10 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Ажилд орсон огноо
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                          <Input
                            type="date"
                            value={form.startDate}
                            onChange={setField('startDate')}
                            className="h-11 pl-10 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50 text-slate-600"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Гэрийн хаяг
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4.5 w-4.5 text-slate-400" />
                          <Input
                            value={form.address}
                            onChange={setField('address')}
                            placeholder="Дүүрэг, хороо, байр..."
                            className="h-11 pl-10 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 'bank' && (
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Банкны нэр
                        </Label>
                        <Input
                          value={form.bankName}
                          onChange={setField('bankName')}
                          placeholder="Жишээ: Хаан банк"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Дансны дугаар
                        </Label>
                        <Input
                          value={form.accountNo}
                          onChange={setField('accountNo')}
                          placeholder="5000000000"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                        />
                      </div>
                      <div className="space-y-2 col-span-2">
                        <Label className="text-slate-600 text-xs font-bold uppercase tracking-wider">
                          Данс эзэмшигчийн нэр
                        </Label>
                        <Input
                          value={form.accountHolder}
                          onChange={setField('accountHolder')}
                          placeholder="Овог Нэр"
                          className="h-11 rounded-xl border-slate-200 focus:border-[#005bb7] focus:ring-blue-50"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>

          <div className="mt-10 flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              className="text-slate-400 font-bold hover:text-slate-600 hover:bg-slate-100 rounded-xl"
              onClick={() => {
                setOpen(false);
                resetAll();
              }}
            >
              Болих
            </Button>

            <div className="flex gap-3">
              {stepIndex > 0 && (
                <Button
                  variant="outline"
                  className="border-slate-200 text-slate-600 font-bold rounded-xl h-11 px-6 hover:bg-slate-50 flex items-center gap-2"
                  onClick={goBack}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Буцах
                </Button>
              )}

              <Button
                className={`min-w-[140px] h-11 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  canGoNext
                    ? 'bg-[#005bb7] hover:bg-[#004a96] text-white shadow-lg shadow-blue-100'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
                onClick={stepIndex < steps.length - 1 ? goNext : onSubmit}
                disabled={!canGoNext}
              >
                {stepIndex < steps.length - 1 ? (
                  <>
                    Дараах <ChevronRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Хадгалах <Check className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
