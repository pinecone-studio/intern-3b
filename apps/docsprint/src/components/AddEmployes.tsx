// 'use client';

// import * as React from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '../components/ui/dialog';
// import { Button } from '../components/ui/button';
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from '../components/ui/tabs';
// import { Label } from '../components/ui/label';
// import { Input } from '../components/ui/input';
// import { Separator } from '@radix-ui/react-select';

// type Step = 'personal' | 'job' | 'bank';

// export function AddEmployeeDialog() {
//   const [open, setOpen] = React.useState(false);
//   const [step, setStep] = React.useState<Step>('personal');

//   const steps: Step[] = ['personal', 'job', 'bank'];
//   const stepIndex = steps.indexOf(step); // 0..2

//   const [form, setForm] = React.useState({
//     lastName: '',
//     firstName: '',
//     regNo: '',
//     address: '',
//     email: '',
//     phone: '',
//     // job
//     position: '',
//     department: '',
//     startDate: '',
//     // bank
//     bankName: '',
//     accountNo: '',
//     accountHolder: '',
//   });

//   const setField =
//     (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
//       setForm((p) => ({ ...p, [k]: e.target.value }));

//   // Алхам тус бүрийн маш энгийн шалгалт
//   const canGoNext = React.useMemo(() => {
//     if (step === 'personal') {
//       return (
//         form.lastName.trim() &&
//         form.firstName.trim() &&
//         form.regNo.trim() &&
//         form.phone.trim()
//       );
//     }
//     if (step === 'job') {
//       return form.position.trim() && form.startDate.trim();
//     }
//     if (step === 'bank') {
//       return form.bankName.trim() && form.accountNo.trim();
//     }
//     return false;
//   }, [step, form]);

//   const goNext = () => {
//     if (!canGoNext) return;
//     const next = steps[Math.min(stepIndex + 1, steps.length - 1)];
//     setStep(next);
//   };

//   const goBack = () => {
//     const prev = steps[Math.max(stepIndex - 1, 0)];
//     setStep(prev);
//   };

//   const resetAll = () => {
//     setStep('personal');
//     setForm({
//       lastName: '',
//       firstName: '',
//       regNo: '',
//       address: '',
//       email: '',
//       phone: '',
//       position: '',
//       department: '',
//       startDate: '',
//       bankName: '',
//       accountNo: '',
//       accountHolder: '',
//     });
//   };

//   const onSubmit = () => {
//     if (!canGoNext) return;

//     // энд API руу илгээх / save хийх логикоо хийнэ
//     console.log('SUBMIT:', form);

//     setOpen(false);
//     resetAll();
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(v: boolean | ((prevState: boolean) => boolean)) => {
//         setOpen(v);
//         if (!v) resetAll();
//       }}
//     >
//       <DialogTrigger asChild>
//         <Button>Add Employees</Button>
//       </DialogTrigger>

//       <DialogContent className="sm:max-w-[720px] bg-zinc-950 text-zinc-100 border-zinc-800">
//         <DialogHeader>
//           <DialogTitle className="text-lg font-semibold">
//             Шинэ ажилтан нэмэх
//           </DialogTitle>
//         </DialogHeader>

//         {/* Top step line */}
//         <div className="mt-2">
//           <div className="flex items-center gap-2">
//             {steps.map((s, i) => (
//               <React.Fragment key={s}>
//                 <div
//                   className={[
//                     'h-2 flex-1 rounded-full',
//                     i <= stepIndex ? 'bg-emerald-500' : 'bg-zinc-800',
//                   ].join(' ')}
//                 />
//                 {i !== steps.length - 1 ? <div className="w-1" /> : null}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         <Separator className="bg-zinc-800" />

//         <Tabs value={step} onValueChange={(v: string) => setStep(v as Step)}>
//           <TabsList className="w-full bg-zinc-900 border border-zinc-800">
//             <TabsTrigger value="personal" className="flex-1">
//               Хувийн мэдээлэл
//             </TabsTrigger>
//             <TabsTrigger value="job" className="flex-1">
//               Ажлын мэдээлэл
//             </TabsTrigger>
//             <TabsTrigger value="bank" className="flex-1">
//               Банкны мэдээлэл
//             </TabsTrigger>
//           </TabsList>

//           {/* PERSONAL */}
//           <TabsContent value="personal" className="mt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Овог</Label>
//                 <Input
//                   value={form.lastName}
//                   onChange={setField('lastName')}
//                   placeholder="Овог оруулах"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Нэр</Label>
//                 <Input
//                   value={form.firstName}
//                   onChange={setField('firstName')}
//                   placeholder="Нэр оруулах"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <Label>Регистрын дугаар</Label>
//                 <Input
//                   value={form.regNo}
//                   onChange={setField('regNo')}
//                   placeholder="AA00000000"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <Label>Гэрийн хаяг</Label>
//                 <Input
//                   value={form.address}
//                   onChange={setField('address')}
//                   placeholder="Хаяг оруулах"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>И-мэйл</Label>
//                 <Input
//                   value={form.email}
//                   onChange={setField('email')}
//                   placeholder="email@example.com"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Утас</Label>
//                 <Input
//                   value={form.phone}
//                   onChange={setField('phone')}
//                   placeholder="99001234"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>
//             </div>
//           </TabsContent>

//           {/* JOB */}
//           <TabsContent value="job" className="mt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Албан тушаал</Label>
//                 <Input
//                   value={form.position}
//                   onChange={setField('position')}
//                   placeholder="Жишээ: Developer"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Хэлтэс</Label>
//                 <Input
//                   value={form.department}
//                   onChange={setField('department')}
//                   placeholder="Жишээ: IT"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <Label>Ажилд орсон огноо</Label>
//                 <Input
//                   type="date"
//                   value={form.startDate}
//                   onChange={setField('startDate')}
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>
//             </div>
//           </TabsContent>

//           {/* BANK */}
//           <TabsContent value="bank" className="mt-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label>Банк</Label>
//                 <Input
//                   value={form.bankName}
//                   onChange={setField('bankName')}
//                   placeholder="Жишээ: Хаан банк"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Дансны дугаар</Label>
//                 <Input
//                   value={form.accountNo}
//                   onChange={setField('accountNo')}
//                   placeholder="5000...."
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>

//               <div className="space-y-2 md:col-span-2">
//                 <Label>Данс эзэмшигч</Label>
//                 <Input
//                   value={form.accountHolder}
//                   onChange={setField('accountHolder')}
//                   placeholder="Овог Нэр"
//                   className="bg-zinc-900 border-zinc-800"
//                 />
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>

//         {/* Footer buttons */}
//         <div className="mt-4 flex items-center justify-between">
//           <Button
//             variant="outline"
//             className="border-zinc-800 bg-transparent"
//             onClick={() => {
//               setOpen(false);
//               resetAll();
//             }}
//           >
//             Болих
//           </Button>

//           <div className="flex gap-2">
//             <Button
//               variant="secondary"
//               className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
//               onClick={goBack}
//               disabled={stepIndex === 0}
//             >
//               Буцах
//             </Button>

//             {stepIndex < steps.length - 1 ? (
//               <Button
//                 className="bg-emerald-500 text-black hover:bg-emerald-400"
//                 onClick={goNext}
//                 disabled={!canGoNext}
//               >
//                 Дараах
//               </Button>
//             ) : (
//               <Button
//                 className="bg-emerald-500 text-black hover:bg-emerald-400"
//                 onClick={onSubmit}
//                 disabled={!canGoNext}
//               >
//                 Хадгалах
//               </Button>
//             )}
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Separator } from '@radix-ui/react-select';

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

export function AddEmployeeDialog() {
  const [open, setOpen] = React.useState(false);

  const [step, setStep] = React.useState<Step>('personal');
  const steps: Step[] = ['personal', 'job', 'bank'];
  const stepIndex = steps.indexOf(step);

  const [direction, setDirection] = React.useState(1); // 1 = next, -1 = back

  const [form, setForm] = React.useState<FormState>(initialForm);

  const setField =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  // 🔒 Алхам тус бүрийн хамгийн basic required шалгалт
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
    enter: (dir: number) => ({ x: dir > 0 ? 24 : -24, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -24 : 24, opacity: 0 }),
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
        <div className='p-1 bg-[oklch(0.72_0.19_155)] w-fit rounded-[5px] border-'>
          <Button>Add Employees</Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[720px] bg-zinc-950 text-zinc-100 border-zinc-800">
        <DialogHeader>
          <DialogTitle>Шинэ ажилтан нэмэх</DialogTitle>
        </DialogHeader>

        {/* ✅ Step progress line */}
        <div className="mt-2">
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div
                  className={[
                    'h-2 flex-1 rounded-full',
                    i <= stepIndex ? 'bg-emerald-500' : 'bg-zinc-800',
                  ].join(' ')}
                />
                {i !== steps.length - 1 ? <div className="w-1" /> : null}
              </React.Fragment>
            ))}
          </div>
        </div>

        <Separator className="bg-zinc-800" />

        {/* ✅ Tabs зөвхөн харагдац: click хийж step солихгүй */}
        <Tabs value={step}>
          {/* pointer-events-none => tab дээр дарж болохгүй */}
          <TabsList className="w-full bg-zinc-900 border border-zinc-800 pointer-events-none">
            <TabsTrigger value="personal" className="flex-1">
              Хувийн мэдээлэл
            </TabsTrigger>
            <TabsTrigger value="job" className="flex-1">
              Ажлын мэдээлэл
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex-1">
              Банкны мэдээлэл
            </TabsTrigger>
          </TabsList>

          {/* ✅ Smooth animated content */}
          <div className="relative mt-4 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {step === 'personal' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Овог</Label>
                      <Input
                        value={form.lastName}
                        onChange={setField('lastName')}
                        placeholder="Овог оруулах"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Нэр</Label>
                      <Input
                        value={form.firstName}
                        onChange={setField('firstName')}
                        placeholder="Нэр оруулах"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Регистрын дугаар</Label>
                      <Input
                        value={form.regNo}
                        onChange={setField('regNo')}
                        placeholder="AA00000000"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Гэрийн хаяг</Label>
                      <Input
                        value={form.address}
                        onChange={setField('address')}
                        placeholder="Хаяг оруулах"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>И-мэйл</Label>
                      <Input
                        value={form.email}
                        onChange={setField('email')}
                        placeholder="email@example.com"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Утас</Label>
                      <Input
                        value={form.phone}
                        onChange={setField('phone')}
                        placeholder="99001234"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                  </div>
                )}

                {step === 'job' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Албан тушаал</Label>
                      <Input
                        value={form.position}
                        onChange={setField('position')}
                        placeholder="Жишээ: Developer"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Хэлтэс</Label>
                      <Input
                        value={form.department}
                        onChange={setField('department')}
                        placeholder="Жишээ: IT"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Ажилд орсон огноо</Label>
                      <Input
                        type="date"
                        value={form.startDate}
                        onChange={setField('startDate')}
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                  </div>
                )}

                {step === 'bank' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Банк</Label>
                      <Input
                        value={form.bankName}
                        onChange={setField('bankName')}
                        placeholder="Жишээ: Хаан банк"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Дансны дугаар</Label>
                      <Input
                        value={form.accountNo}
                        onChange={setField('accountNo')}
                        placeholder="5000...."
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label>Данс эзэмшигч</Label>
                      <Input
                        value={form.accountHolder}
                        onChange={setField('accountHolder')}
                        placeholder="Овог Нэр"
                        className="bg-zinc-900 border-zinc-800"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Tabs>

        {/* ✅ Footer buttons: зөвхөн эндээс л step солигдоно */}
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="outline"
            className="border-zinc-800 bg-transparent"
            onClick={() => {
              setOpen(false);
              resetAll();
            }}
          >
            Болих
          </Button>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              className="bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
              onClick={goBack}
              disabled={stepIndex === 0}
            >
              Буцах
            </Button>

            {stepIndex < steps.length - 1 ? (
              <Button
                className="bg-emerald-500 text-black hover:bg-emerald-400"
                onClick={goNext}
                disabled={!canGoNext}
              >
                Дараах
              </Button>
            ) : (
              <Button
                className="bg-emerald-500 text-black hover:bg-emerald-400"
                onClick={onSubmit}
                disabled={!canGoNext}
              >
                Хадгалах
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
