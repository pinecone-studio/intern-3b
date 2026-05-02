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
  FileText,
  Download,
  Printer,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
} from 'lucide-react';

import { useMutation, useQuery } from '@apollo/client/react';
import {
  DEPARTMENTS,
  CREATE_DEPARTMENT,
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_BANK_ACCOUNT,
} from '../app/api/graphql/queries';

import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { DialogHeader, DialogTitle } from '../components/ui/dialog';

type Step = 'personal' | 'job' | 'bank' | 'contract';
type ContractTypeUI = 'employment' | 'nda' | 'liability' | 'probation';

interface AddEmployeeFormProps {
  onClose: () => void;
  onAdd: (employee: any) => void;
  isEdit?: boolean;
  initialData?: any;
}

type FormState = {
  id?: string;
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
  contractType?: ContractTypeUI;
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
  contractType: undefined,
};

type DepartmentsQuery = {
  departments: { id: string; name: string }[];
};

function escapeHtml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function AddEmployeeForm({
  onClose,
  onAdd,
  isEdit,
  initialData,
}: AddEmployeeFormProps) {
  const [step, setStep] = React.useState<Step>('personal');
  const [direction, setDirection] = React.useState(1);
  const [isDemo, setIsDemo] = React.useState(false);

  function toISODateInput(value: any) {
    if (!value) return '';
    const d = value instanceof Date ? value : new Date(String(value));
    if (Number.isNaN(d.getTime())) return '';
    return d.toISOString().slice(0, 10);
  }

  const [form, setForm] = React.useState<FormState>(() => {
    if (isEdit && initialData) {
      const fallbackNames = initialData.name
        ? String(initialData.name).trim().split(' ')
        : ['', ''];
      const lastName = initialData.lastName ?? fallbackNames[0] ?? '';
      const firstName =
        initialData.firstName ?? fallbackNames.slice(1).join(' ') ?? '';

      return {
        ...initialForm,
        id: initialData.id,
        lastName: lastName || '',
        firstName: firstName || '',
        email: initialData.email || '',

        regNo: initialData.regNo || '',

        phone: initialData.phone || '',
        address: initialData.address || '',

        position: initialData.position || initialData.role || '',
        department: initialData.departmentName || initialData.department || '',

        startDate: toISODateInput(initialData.startDate),

        isProbation:
          initialData.status === 'trial' ||
          initialData.contractType === 'PROBATION',

        probationMonths: initialData.probationMonths || '3',

        bankName: initialData.bankName || '',
        accountNo: initialData.accountNo || '',
        accountHolder: initialData.accountHolder || '',
        contractType: initialData.contractTypeUI || initialForm.contractType,
      };
    }
    return initialForm;
  });

  const steps: Step[] = ['personal', 'job', 'bank', 'contract'];
  const stepIndex = steps.indexOf(step);

  const { data: deptData } = useQuery<DepartmentsQuery>(DEPARTMENTS, {
    fetchPolicy: 'cache-and-network',
  });

  const [createDepartment] = useMutation(CREATE_DEPARTMENT);
  const [createEmployee, { loading: creatingEmployee }] =
    useMutation(CREATE_EMPLOYEE);
  const [createBankAccount, { loading: creatingBank }] = useMutation(
    CREATE_EMPLOYEE_BANK_ACCOUNT,
  );

  const contractRef = React.useRef<HTMLDivElement | null>(null);

  const fillDemoData = () => {
    setIsDemo(true);
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
      setIsDemo(false);
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const canGoNext = React.useMemo(() => {
    if (step === 'personal')
      return form.lastName.trim() && form.firstName.trim() && form.regNo.trim();
    if (step === 'job') return form.position.trim() && form.startDate.trim();
    if (step === 'bank') return form.bankName.trim() && form.accountNo.trim();
    if (step === 'contract') return !!form.contractType;
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

  const CREATED_BY_ID = (process.env.NEXT_PUBLIC_CREATED_BY_ID || '').trim();

  async function getOrCreateDepartmentIdByName(name: string) {
    const trimmed = name.trim();
    if (!trimmed) throw new Error('Хэлтэс хоосон байна.');

    const existing = deptData?.departments?.find(
      (d) => d.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (existing) return existing.id;

    const res = await createDepartment({
      variables: { input: { name: trimmed } },
      refetchQueries: [{ query: DEPARTMENTS }],
    });

    const created = (res.data as any)?.createDepartment;
    if (!created?.id) throw new Error('Хэлтэс үүсгэж чадсангүй.');
    return created.id as string;
  }

  function mapContractTypeToSchema(
    ui: ContractTypeUI,
    isProbationFlag: boolean,
  ) {
    if (isProbationFlag) return 'PROBATION';
    if (ui === 'probation') return 'PROBATION';
    return 'FULL_TIME';
  }

  const contractTitle =
    form.contractType === 'employment'
      ? 'Хөдөлмөрийн Гэрээ'
      : form.contractType === 'nda'
        ? 'Нууц Хадгалах Гэрээ'
        : form.contractType === 'liability'
          ? 'Эд Хөрөнгийн Хариуцлагын Гэрээ'
          : form.contractType === 'probation'
            ? 'Ажилд авах тухай тушаал'
            : '';

  const buildContractHtml = () => {
    const fullName = `${form.lastName} ${form.firstName}`.trim();
    const position = form.position || '__________';
    const department = form.department || '__________';
    const probationMonths = form.probationMonths || '3';
    const startDate = form.startDate || '____-__-__';

    const header = `
      <div style="text-align:center;margin-bottom:28px;">
        <h2 style="margin:0;font-size:18px;text-transform:uppercase;text-decoration:underline;text-underline-offset:6px;">${escapeHtml(
          contractTitle || 'Document',
        )}</h2>
        <div style="margin-top:10px;color:#64748b;font-size:12px;font-weight:600;">
          ${escapeHtml(startDate)} өдөр · Улаанбаатар хот
        </div>
      </div>
    `;

    const commonIntroEmployment = `
      <p style="margin:0 0 18px 0;">
        Энэхүү баримт бичгийг нэг талаас <strong>"ДокСпринт" ХХК</strong> (цаашид “Ажил олгогч”),
        нөгөө талаас иргэн <strong>${escapeHtml(fullName)}</strong> (цаашид “Ажилтан”) нар Монгол Улсын холбогдох хууль тогтоомжийг
        үндэслэн харилцан тохиролцож үйлдэв.
      </p>
    `;

    const employment = `
      ${commonIntroEmployment}
      <div style="margin-top:18px;">
        <h3 style="margin:0 0 10px 0;font-size:14px;">Нэг. Ерөнхий нөхцөл</h3>
        <p style="margin:0 0 10px 0;">
          1.1 Ажилтан нь <strong>${escapeHtml(department)}</strong> нэгжид
          <strong> ${escapeHtml(position)}</strong> албан тушаалд ажил үүрэг гүйцэтгэнэ.
        </p>
        <p style="margin:0 0 14px 0;">
          1.2 Ажлын байрны тодорхойлолт болон байгууллагын дотоод журам нь энэхүү гэрээний салшгүй хэсэг байна.
        </p>

        <h3 style="margin:18px 0 10px 0;font-size:14px;">Хоёр. Гол нөхцөл</h3>
        <p style="margin:0 0 10px 0;">2.1 Ажилтан үүргээ гүйцэтгэж эхэлснээр хөдөлмөр эрхлэлтийн харилцаа үүснэ.</p>
        <p style="margin:0 0 10px 0;">2.2 Ажил олгогч нь ажилтныг хөдөлмөрийн аюулгүй байдал, эрүүл ахуйн шаардлага хангасан ажлын байранд ажиллуулна.</p>
        ${
          form.isProbation
            ? `<p style="margin:0 0 10px 0;">2.3 Туршилтын хугацаа: <strong>${escapeHtml(
                probationMonths,
              )}</strong> сар.</p>`
            : ''
        }
        <p style="margin:0 0 14px 0;">2.4 Ажилтны сарын үндсэн цалин: <strong>__________</strong> төгрөг.</p>

        <h3 style="margin:18px 0 10px 0;font-size:14px;">Гурав. Гэрээ цуцлах</h3>
        <p style="margin:0;">3.1 Хөдөлмөрийн харилцааг холбогдох хуульд заасан нөхцөл, үндэслэлээр дуусгавар болгоно.</p>
      </div>
    `;

    const nda = `
      ${commonIntroEmployment}
      <div style="margin-top:18px;">
        <h3 style="margin:0 0 10px 0;font-size:14px;">Нэг. Ерөнхий нөхцөл</h3>
        <p style="margin:0 0 10px 0;">1.1 Энэхүү гэрээ нь байгууллагын мэдээллийн аюулгүй байдлыг хангах зорилготой.</p>
        <p style="margin:0 0 14px 0;">1.2 Ажилтан нь нууц мэдээллийг албан ёсны зөвшөөрөлгүйгээр гуравдагч этгээдэд задруулахгүй байх үүргийг хугацаагүй хүлээнэ.</p>

        <h3 style="margin:18px 0 10px 0;font-size:14px;">Хоёр. Нууц мэдээллийн хүрээ</h3>
        <ul style="margin:0 0 14px 18px;padding:0;">
          <li>Баримт бичиг, мэдээлэл, материал, программ хангамж</li>
          <li>Харилцагч/түншийн мэдээлэл, нөхцөл</li>
          <li>Төсөв, төлөвлөгөө, дотоод тайлан, үзүүлэлтүүд</li>
          <li>Дотоод журам, процессыг илэрхийлэх мэдээ, мэдээлэл</li>
        </ul>

        <h3 style="margin:18px 0 10px 0;font-size:14px;">Гурав. Хариуцлага</h3>
        <p style="margin:0;">3.1 Гэрээг зөрчсөнөөс үүсэх хохирлыг хууль тогтоомжийн дагуу нөхөн төлүүлнэ.</p>
      </div>
    `;

    const liability = `
      ${commonIntroEmployment}
      <div style="margin-top:18px;">
        <h3 style="margin:0 0 10px 0;font-size:14px;">Нэг. Зорилго</h3>
        <p style="margin:0 0 14px 0;">1.1 Ажилтанд хүлээлгэн өгсөн эд хөрөнгийг зориулалтын дагуу ашиглуулах, бүрэн бүтэн байдлыг хангах нөхцөлийг тодорхойлно.</p>

        <h3 style="margin:18px 0 10px 0;font-size:14px;">Хоёр. Эд хөрөнгийн хүрээ</h3>
        <p style="margin:0 0 10px 0;">2.1 Эд хөрөнгийн жагсаалт, серийн дугаар, тоо ширхэгийг хавсралтаар баталгаажуулна.</p>
        <div style="border:1px solid #e2e8f0;border-radius:12px;padding:14px;background:#fff;margin-top:10px;">
          <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:8px;">Хавсралт (жишиг)</div>
          <div style="font-size:13px;color:#334155;line-height:1.6;">
            <div>• Зөөврийн компьютер: __________ /SN: ________/</div>
            <div>• Утас: __________ /IMEI: ________/</div>
            <div>• Түлхүүр/карт: __________</div>
            <div>• Бусад: __________</div>
          </div>
        </div>

        <h3 style="margin:18px 0 10px 0;font-size:14px;">Гурав. Хариуцлага</h3>
        <p style="margin:0;">3.1 Эд хөрөнгө алдагдах, гэмтэх тохиолдолд холбогдох хууль, байгууллагын журмаар хариуцлага тооцно.</p>
      </div>
    `;

    const order = `
      <div style="margin-top:8px;">
        <div style="text-align:center;margin-bottom:18px;">
          <div style="font-weight:700;">................................................ ХХК</div>
          <div style="font-weight:800;">ЕРӨНХИЙ ЗАХИРЛЫН ТУШААЛ</div>
          <div style="margin-top:10px;">${escapeHtml(startDate)} өдөр</div>
          <div>Дугаар ________</div>
          <div style="margin-top:14px;font-weight:800;text-decoration:underline;text-underline-offset:4px;">
            ${escapeHtml(fullName)}-ийг ажилд авах тухай
          </div>
        </div>

        <p style="margin:0 0 12px 0;">
          Монгол Улсын Хөдөлмөрийн тухай хуулийн холбогдох заалтууд болон ажилтны өргөдлийг үндэслэн ТУШААХ НЬ:
        </p>

        <p style="margin:0 0 10px 0;">
          1. <strong>${escapeHtml(fullName)}</strong>-ийг ${escapeHtml(
            startDate,
          )} өдрөөс эхлэн
          <strong> ${escapeHtml(department)}</strong> нэгжид
          <strong> ${escapeHtml(position)}</strong> албан тушаалд
          <strong> ${escapeHtml(probationMonths)}</strong> хүртэл сарын туршилтын хугацаатай ажиллуулсугай.
        </p>

        <p style="margin:0 0 10px 0;">
          2. Ажил үүрэгтэй нь танилцуулж, ажлын зааварчилгаа өгч ажилд нь оруулахыг Хүний нөөцийн менежерт үүрэг болгосугай.
        </p>

        <p style="margin:0 0 10px 0;">
          3. Туршилтын хугацааны сарын үндсэн цалинг <strong>__________</strong> төгрөгөөр бодож олгохыг Ерөнхий нягтлан бодогчид зөвшөөрсүгэй.
        </p>

        <p style="margin:0 0 10px 0;">
          4. Тушаалын хэрэгжилтэд хяналт тавьж ажиллахыг <strong>${escapeHtml(
            department,
          )}</strong> нэгжийн удирдлагад даалгасугай.
        </p>

        <div style="margin-top:56px;text-align:right;">
          <div style="font-weight:800;">ЕРӨНХИЙ ЗАХИРАЛ</div>
          <div style="border-bottom:1px solid #0f172a;height:28px;width:220px;margin-left:auto;margin-top:18px;"></div>
        </div>
      </div>
    `;

    const sign = `
      <div style="margin-top:64px;border-top:1px solid #e2e8f0;padding-top:28px;display:flex;gap:40px;">
        <div style="flex:1;">
          <div style="font-weight:800;font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;">Ажил олгогчийг төлөөлж:</div>
          <div style="border-bottom:1px solid #94a3b8;height:28px;margin-top:22px;"></div>
          <div style="font-size:11px;color:#64748b;margin-top:10px;">/Тамга, тэмдэг/</div>
        </div>
        <div style="flex:1;">
          <div style="font-weight:800;font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.12em;">Ажилтан:</div>
          <div style="border-bottom:1px solid #94a3b8;height:28px;margin-top:22px;display:flex;align-items:flex-end;">
            <span style="font-size:11px;font-weight:800;color:#2563eb;padding-bottom:4px;">${escapeHtml(
              fullName,
            )}</span>
          </div>
          <div style="font-size:11px;color:#64748b;margin-top:10px;">/Гарын үсэг/</div>
        </div>
      </div>
    `;

    const body = `
      <div style="max-width:700px;margin:0 auto;padding:48px;font-family:Arial,sans-serif;color:#0f172a;font-size:13px;line-height:1.7;">
        ${header}
        ${
          form.contractType === 'employment'
            ? employment
            : form.contractType === 'nda'
              ? nda
              : form.contractType === 'liability'
                ? liability
                : form.contractType === 'probation'
                  ? order
                  : ''
        }
        ${sign}
      </div>
    `;

    return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
      <title>${escapeHtml(contractTitle || 'Document')}</title>
      <style>@media print{body{margin:0}} body{margin:24px;background:#fff}</style>
      </head><body>${body}</body></html>`;
  };

  const handlePrint = () => {
    if (!form.contractType) return;
    const w = window.open('', '_blank');
    if (!w) {
      alert('Pop-up block хийгдсэн байна.');
      return;
    }
    w.document.open();
    w.document.write(buildContractHtml());
    w.document.close();
    w.focus();
    w.print();
  };

  const handleDownload = async () => {
    try {
      if (!contractRef.current) return;

      const html2canvas = (await import('html2canvas')).default;
      const jspdfMod: any = await import('jspdf');
      const jsPDF = jspdfMod.jsPDF || jspdfMod.default;

      const canvas = await html2canvas(contractRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const root = clonedDoc.querySelector(
            '[data-contract-root]',
          ) as HTMLElement | null;
          if (!root) return;

          const all = root.querySelectorAll('*');
          const cleanse = (el: HTMLElement) => {
            const cs = clonedDoc.defaultView?.getComputedStyle(el);
            if (!cs) return;

            const bad = (v: string) =>
              v.includes('lab(') ||
              v.includes('oklab(') ||
              v.includes('color(');

            const pick = (prop: string) => cs.getPropertyValue(prop) || '';

            const color = pick('color');
            const bg = pick('background-color');
            const border = pick('border-top-color');
            const shadow = pick('box-shadow');

            if (bad(color)) el.style.color = '#0f172a';
            if (bad(bg)) el.style.backgroundColor = '#ffffff';
            if (bad(border)) {
              el.style.borderTopColor = '#cbd5e1';
              el.style.borderRightColor = '#cbd5e1';
              el.style.borderBottomColor = '#cbd5e1';
              el.style.borderLeftColor = '#cbd5e1';
            }

            if (
              bad(shadow) ||
              shadow.includes('lab(') ||
              shadow.includes('oklab(')
            ) {
              el.style.boxShadow = 'none';
            }

            el.style.filter = 'none';
            el.style.backdropFilter = 'none';
            el.style.textShadow = 'none';
          };

          root.style.background = '#ffffff';
          root.style.color = '#0f172a';
          root.style.filter = 'none';
          root.style.backdropFilter = 'none';
          root.style.boxShadow = 'none';

          all.forEach((n) => cleanse(n as HTMLElement));
        },
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = 210;
      const pageHeight = 297;

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        form.contractType
          ? `${form.contractType.toUpperCase()}_FINAL.pdf`
          : 'contract.pdf',
      );
    } catch (e: any) {
      console.error(e);
      alert(e?.message ? String(e.message) : String(e));
    }
  };

  const onSubmit = async () => {
    if (!canGoNext) return;

    const uiEmployee = {
      id: form.id ?? String(Date.now()),
      name: `${form.lastName} ${form.firstName}`,
      email: form.email,
      role: form.position,
      department: form.department,
      salary: isEdit ? initialData?.salary : 'Тохиролцоно',
      status: form.isProbation ? 'trial' : 'active',
    };

    if (isDemo) {
      onAdd(uiEmployee);
      onClose();
      return;
    }

    if (!CREATED_BY_ID) {
      alert('NEXT_PUBLIC_CREATED_BY_ID тохируулаагүй байна.');
      return;
    }

    try {
      const departmentId = await getOrCreateDepartmentIdByName(form.department);

      const startDateIso = new Date(form.startDate).toISOString();
      const contractType = mapContractTypeToSchema(
        form.contractType!,
        form.isProbation,
      );

      const empRes = await createEmployee({
        variables: {
          input: {
            departmentId,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            regNo: form.regNo,
            position: form.position,
            startDate: startDateIso,
            contractType,
            contractEndDate: null,
            salary: null,
            createdById: CREATED_BY_ID,
          },
        },
      });

      const createdEmp = (empRes.data as any)?.createEmployee;
      if (!createdEmp?.id) throw new Error('Employee үүсгэж чадсангүй.');

      await createBankAccount({
        variables: {
          input: {
            employeeId: createdEmp.id,
            bankName: form.bankName,
            accountNo: form.accountNo,
            accountHolder: form.accountHolder,
            isPrimary: true,
          },
        },
      });

      onAdd({
        id: createdEmp.id,
        name: `${createdEmp.lastName} ${createdEmp.firstName}`,
        email: createdEmp.email,
        role: createdEmp.position,
        department: form.department,
        salary: 'Тохиролцоно',
        status: createdEmp.status === 'ACTIVE' ? 'active' : 'trial',
      });

      onClose();
    } catch (e: any) {
      console.error(e);
      alert(e?.message ?? 'Алдаа гарлаа');
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 30 : -30, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -30 : 30, opacity: 0 }),
  };

  return (
    <div className="flex h-full min-h-[700px]">
      <div className="w-64 bg-gradient-to-b from-blue-50/50 to-white border-r border-blue-50 p-8 hidden md:flex flex-col">
        <div className="mb-12">
          <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm border border-blue-100">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="font-extrabold text-slate-800 text-xl tracking-tight">
            {isEdit ? 'Засварлах' : 'Бүртгэл'}
          </h2>
          <p className="text-blue-400 text-[11px] font-bold uppercase tracking-wider">
            {isEdit ? 'Мэдээлэл шинэчлэх' : 'Шинэ ажилтан үүсгэх'}
          </p>
        </div>

        <div className="space-y-7 relative flex-1">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-4 relative z-10">
              <div
                className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-300 border-2 ${
                  i === stepIndex
                    ? 'bg-blue-600 border-blue-600 shadow-blue-100 text-white'
                    : i < stepIndex
                      ? 'bg-blue-100 border-blue-100 text-blue-600'
                      : 'bg-white border-slate-100 text-slate-300'
                }`}
              >
                {i < stepIndex ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  <span className="text-xs font-bold">0{i + 1}</span>
                )}
              </div>
              <span
                className={`text-sm font-bold transition-colors ${
                  i === stepIndex ? 'text-blue-700' : 'text-slate-400'
                }`}
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
          ))}
        </div>
        {!isEdit && (
          <Button
            type="button"
            variant="ghost"
            onClick={fillDemoData}
            className="mt-auto bg-blue-50/50 text-blue-600 hover:bg-blue-100 rounded-2xl py-6 flex items-center gap-2 border border-blue-100 transition-all"
          >
            <Sparkles className="h-4 w-4" />{' '}
            <span className="text-xs font-bold">Demo Data</span>
          </Button>
        )}
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
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-sm font-semibold"
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
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-sm font-semibold"
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
                      className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-mono tracking-widest uppercase text-sm font-bold"
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
                        className="h-14 pl-14 rounded-2xl border-slate-100 bg-slate-50/50"
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
                        className="h-14 pl-14 rounded-2xl border-slate-100 bg-slate-50/50"
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
                        type="button"
                        onClick={() => {
                          setIsDemo(false);
                          setForm((p) => ({
                            ...p,
                            isProbation: !p.isProbation,
                          }));
                        }}
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
                            : 'Үндсэн ажилтан'}
                        </span>
                      </button>
                      {form.isProbation && (
                        <div className="w-24">
                          <Input
                            type="number"
                            value={form.probationMonths}
                            onChange={setField('probationMonths')}
                            className="h-14 rounded-2xl text-center font-bold"
                          />
                        </div>
                      )}
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
                            type="button"
                            key={bank.name}
                            onClick={() => {
                              setIsDemo(false);
                              setForm((prev) => ({
                                ...prev,
                                bankName: bank.name,
                              }));
                            }}
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
                              className={`text-xs font-bold ${
                                isSelected ? 'text-blue-700' : 'text-slate-600'
                              }`}
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
                        title: 'Тушаал',
                        value: 'probation',
                        icon: Calendar,
                      },
                    ].map((c) => {
                      const active = form.contractType === (c.value as any);
                      const Icon = c.icon;
                      return (
                        <button
                          type="button"
                          key={c.value}
                          onClick={() => {
                            setIsDemo(false);
                            setForm((prev) => ({
                              ...prev,
                              contractType: c.value as any,
                            }));
                          }}
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
                          onClick={handleDownload}
                        >
                          <Download className="h-4 w-4 mr-2" /> Татах
                        </Button>

                        <Button
                          type="button"
                          size="sm"
                          className="h-9 bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-bold"
                          onClick={handlePrint}
                        >
                          <Printer className="h-4 w-4 mr-2" /> Хэвлэх
                        </Button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-auto p-12 bg-blue-50/20 custom-scrollbar">
                      {form.contractType ? (
                        <div
                          ref={contractRef}
                          data-contract-root
                          className="bg-white w-full max-w-[700px] mx-auto shadow-xl p-16 text-slate-900 min-h-[800px] rounded-sm relative text-[13px] leading-relaxed"
                        >
                          <div className="text-center mb-10">
                            <h2 className="font-black text-lg uppercase underline decoration-2 underline-offset-8">
                              {form.contractType === 'employment' &&
                                'Хөдөлмөрийн гэрээ'}
                              {form.contractType === 'nda' &&
                                'Нууц хадгалах гэрээ'}
                              {form.contractType === 'liability' &&
                                'Эд хөрөнгийн бүрэн хариуцлагын гэрээ'}
                              {form.contractType === 'probation' &&
                                'Ажилд авах тухай тушаал'}
                            </h2>

                            <div className="mt-3 text-[11px] text-slate-500 font-semibold">
                              <div>
                                {form.startDate
                                  ? `${form.startDate}`
                                  : '____-__-__'}{' '}
                                өдөр
                              </div>
                              <div>Улаанбаатар хот</div>
                            </div>
                          </div>

                          {form.contractType === 'employment' && (
                            <>
                              <p className="mb-6">
                                Энэхүү баримт бичгийг нэг талаас{' '}
                                <strong>"ДокСпринт" ХХК</strong> (цаашид “Ажил
                                олгогч”), нөгөө талаас иргэн{' '}
                                <strong>
                                  {form.lastName} {form.firstName}
                                </strong>{' '}
                                (цаашид “Ажилтан”) нар Монгол Улсын холбогдох
                                хууль тогтоомжийг үндэслэн харилцан тохиролцож
                                үйлдэв.
                              </p>

                              <div className="space-y-5">
                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Нэг. Ерөнхий нөхцөл
                                  </h3>
                                  <p>
                                    1.1 Ажилтан нь{' '}
                                    <strong>
                                      {form.department || '__________'}
                                    </strong>{' '}
                                    нэгжид
                                    <strong>
                                      {' '}
                                      {form.position || '__________'}
                                    </strong>{' '}
                                    албан тушаалд ажил үүрэг гүйцэтгэнэ.
                                  </p>
                                  <p>
                                    1.2 Ажлын байрны тодорхойлолт болон
                                    байгууллагын дотоод журам нь энэхүү гэрээний
                                    салшгүй хэсэг байна.
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Хоёр. Хөдөлмөрийн гэрээний гол нөхцөл
                                  </h3>
                                  <p>
                                    2.1 Ажилтан үүргээ гүйцэтгэж эхэлснээр
                                    хөдөлмөр эрхлэлтийн харилцаа үүснэ.
                                  </p>
                                  <p>
                                    2.2 Ажил олгогч нь ажилтныг хөдөлмөрийн
                                    аюулгүй байдал, эрүүл ахуйн шаардлага
                                    хангасан ажлын байранд ажиллуулна.
                                  </p>
                                  {form.isProbation && (
                                    <p>
                                      2.3 Туршилтын хугацаа:{' '}
                                      <strong>
                                        {form.probationMonths || '3'}
                                      </strong>{' '}
                                      сар.
                                    </p>
                                  )}
                                  <p>
                                    2.4 Ажилтны сарын үндсэн цалин:{' '}
                                    <strong>{'__________'} төгрөг</strong>.
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Гурав. Гэрээний бусад нөхцөл
                                  </h3>
                                  <p>
                                    3.1 Нэмэгдэл, нэмэгдэл хөлс, шагнал
                                    урамшуулал олгох асуудлыг хууль болон
                                    байгууллагын хөдөлмөрийн дотоод хэм хэмжээнд
                                    заасны дагуу хэрэгжүүлнэ.
                                  </p>
                                  <p>
                                    3.2 Ажлын цагийг хуульд нийцүүлэн уян хатан
                                    байдлаар талууд тохиролцож болно.
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Дөрөв. Талуудын эрх, үүрэг (товч)
                                  </h3>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                      Ажил олгогч: ажил үүргээ биелүүлэхийг
                                      шаардах, заавар зөвлөгөө өгөх.
                                    </li>
                                    <li>
                                      Ажилтан: дотоод журам мөрдөх, байгууллагын
                                      эд хөрөнгө, мэдээллийг хамгаалах.
                                    </li>
                                  </ul>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Тав. Гэрээг цуцлах, дуусгавар болгох
                                  </h3>
                                  <p>
                                    5.1 Хөдөлмөрийн харилцааг холбогдох хуульд
                                    заасан нөхцөл, үндэслэлээр дуусгавар
                                    болгоно.
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">Зургаа. Бусад</h3>
                                  <p>
                                    6.1 Энэхүү гэрээ нь талууд гарын үсэг зурсан
                                    өдрөөс хүчин төгөлдөр болно.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {form.contractType === 'nda' && (
                            <>
                              <p className="mb-6">
                                Энэхүү баримт бичгийг нэг талаас{' '}
                                <strong>"ДокСпринт" ХХК</strong> (цаашид “Ажил
                                олгогч”), нөгөө талаас иргэн{' '}
                                <strong>
                                  {form.lastName} {form.firstName}
                                </strong>{' '}
                                (цаашид “Ажилтан”) нар байгууллагын мэдээллийн
                                аюулгүй байдлыг хангах зорилгоор харилцан
                                тохиролцож үйлдэв.
                              </p>

                              <div className="space-y-5">
                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Нэг. Ерөнхий нөхцөл
                                  </h3>
                                  <p>
                                    1.1 Энэхүү гэрээ нь компанийн мэдээллийг
                                    хадгалах, хууль ёсны ашиг сонирхлыг
                                    хамгаалах зорилготой.
                                  </p>
                                  <p>
                                    1.2 Ажилтан нь нууц мэдээллийг
                                    зөвшөөрөлгүйгээр задруулахгүй, ашиглуулахгүй
                                    байх үүргийг хугацаагүй хүлээнэ.
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Хоёр. Нууц мэдээллийн хүрээ (жишээ)
                                  </h3>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                      Баримт бичиг, мэдээлэл, материал, программ
                                      хангамж
                                    </li>
                                    <li>Харилцагч/түншийн мэдээлэл</li>
                                    <li>Төсөв, төлөвлөгөө, төсөл</li>
                                    <li>Дотоод журам, процессын мэдээлэл</li>
                                  </ul>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Гурав. Хариуцлага
                                  </h3>
                                  <p>
                                    3.1 Гэрээг зөрчсөнөөс үүсэх хохирлыг
                                    холбогдох хууль тогтоомжийн дагуу нөхөн
                                    төлүүлнэ.
                                  </p>
                                </div>
                              </div>
                            </>
                          )}

                          {form.contractType === 'liability' && (
                            <>
                              <p className="mb-6">
                                Энэхүү баримт бичгийг нэг талаас{' '}
                                <strong>"ДокСпринт" ХХК</strong> (цаашид “Ажил
                                олгогч”), нөгөө талаас иргэн{' '}
                                <strong>
                                  {form.lastName} {form.firstName}
                                </strong>{' '}
                                (цаашид “Ажилтан”) нар эд хөрөнгийг зориулалтын
                                дагуу ашиглах, бүрэн бүтэн байдлыг хангах
                                нөхцөлөөр харилцан тохиролцож үйлдэв.
                              </p>

                              <div className="space-y-5">
                                <div className="space-y-2">
                                  <h3 className="font-bold">Нэг. Зорилго</h3>
                                  <p>
                                    1.1 Энэхүү гэрээ нь ажилтанд хүлээлгэн өгсөн
                                    эд хөрөнгө, техник хэрэгслийг зориулалтын
                                    дагуу ашиглуулах, бүрэн бүтэн байдлыг хангах
                                    зорилготой.
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Хоёр. Эд хөрөнгийн хүрээ
                                  </h3>
                                  <p>
                                    2.1 Хүлээлгэн өгөх эд хөрөнгийн жагсаалт,
                                    серийн дугаар, тоо ширхэгийг хавсралтаар
                                    баталгаажуулна.
                                  </p>
                                  <div className="mt-2 border border-slate-200 rounded-xl p-4 bg-white">
                                    <div className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">
                                      Хавсралт (жишиг)
                                    </div>
                                    <div className="text-sm text-slate-600 space-y-1">
                                      <div>
                                        • Зөөврийн компьютер: __________ /SN:
                                        ________/
                                      </div>
                                      <div>
                                        • Утас: __________ /IMEI: ________/
                                      </div>
                                      <div>• Түлхүүр/карт: __________</div>
                                      <div>• Бусад: __________</div>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Гурав. Ажилтны үүрэг
                                  </h3>
                                  <ul className="list-disc pl-5 space-y-1">
                                    <li>
                                      Эд хөрөнгийг эвдрэл гэмтэлгүй ашиглах.
                                    </li>
                                    <li>Зөвшөөрөлгүйгээр шилжүүлэхгүй байх.</li>
                                    <li>
                                      Алдагдал, эвдрэл гарвал нэн даруй
                                      мэдэгдэх.
                                    </li>
                                  </ul>
                                </div>

                                <div className="space-y-2">
                                  <h3 className="font-bold">
                                    Дөрөв. Хариуцлага
                                  </h3>
                                  <p>
                                    4.1 Эд хөрөнгө алдагдах, гэмтэх, зориулалтын
                                    бусаар ашигласнаас хохирол учирвал
                                    хариуцлага тооцно.
                                  </p>
                                </div>
                              </div>
                            </>
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
                                  {form.lastName} {form.firstName}-ийг ажилд
                                  авах тухай
                                </p>
                              </div>

                              <p>
                                Монгол Улсын Хөдөлмөрийн тухай хуулийн холбогдох
                                заалтууд болон ажилтны өргөдлийг үндэслэн ТУШААХ
                                НЬ:
                              </p>

                              <div className="space-y-3">
                                <p>
                                  1.{' '}
                                  <strong>
                                    {form.lastName} {form.firstName}
                                  </strong>
                                  -ийг {form.startDate || '____-__-__'} өдрөөс
                                  эхлэн
                                  <strong>
                                    {' '}
                                    {form.department || '__________'}
                                  </strong>{' '}
                                  нэгжид
                                  <strong>
                                    {' '}
                                    {form.position || '__________'}
                                  </strong>{' '}
                                  албан тушаалд
                                  <strong>
                                    {' '}
                                    {form.probationMonths || '3'}
                                  </strong>{' '}
                                  хүртэл сарын туршилтын хугацаатай
                                  ажиллуулсугай.
                                </p>

                                <p>
                                  2. Ажил үүрэгтэй нь танилцуулж, ажлын
                                  зааварчилгаа өгч ажилд нь оруулахыг Хүний
                                  нөөцийн менежерт үүрэг болгосугай.
                                </p>

                                <p>
                                  3. Туршилтын хугацааны сарын үндсэн цалинг{' '}
                                  <strong>__________</strong> төгрөгөөр бодож
                                  олгохыг Ерөнхий нягтлан бодогчид зөвшөөрсүгэй.
                                </p>

                                <p>
                                  4. Тушаалын хэрэгжилтэд хяналт тавьж ажиллахыг{' '}
                                  <strong>
                                    {form.department || '__________'}
                                  </strong>{' '}
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
            type="button"
            variant="ghost"
            className="text-slate-400 font-bold hover:text-red-500"
            onClick={onClose}
          >
            Болих
          </Button>
          <div className="flex gap-4">
            {stepIndex > 0 && (
              <Button
                type="button"
                variant="outline"
                className="border-slate-100 font-bold rounded-2xl h-14 px-8"
                onClick={goBack}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Буцах
              </Button>
            )}
            <Button
              type="button"
              className="min-w-[200px] h-14 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white border-b-4 border-blue-800"
              onClick={stepIndex < steps.length - 1 ? goNext : onSubmit}
              disabled={!canGoNext || creatingEmployee || creatingBank}
            >
              {stepIndex < steps.length - 1 ? (
                <>
                  Үргэлжлүүлэх <ChevronRight className="h-5 w-5" />
                </>
              ) : (
                <>
                  {isEdit ? 'Засварыг хадгалах' : 'Бүртгэлийг дуусгах'}{' '}
                  <Check className="h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
