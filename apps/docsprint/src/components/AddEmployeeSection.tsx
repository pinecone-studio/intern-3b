'use client';

import * as React from 'react';
import {
  CheckCircle2,
  CircleDollarSign,
  Github,
  Mail,
  MapPin,
  UserPlus,
  X,
} from 'lucide-react';

type EmployeeStatus = 'ACTIVE' | 'INACTIVE' | 'TERMINATED';

type AddEmployeeFormData = {
  firstName: string;
  lastName: string;
  firstNameEng: string;
  lastNameEng: string;
  email: string;
  employeeCode: string;
  department: string;
  branch: string;
  level: string;
  hireDate: string;
  numberOfVacationDays: number;
  birthDayAndMonth: string;
  isKpi: boolean;
  isSalaryCompany: boolean;
  github: string;
  imageUrl: string;
  status: EmployeeStatus;
};

type FieldName = keyof AddEmployeeFormData;
type Errors = Partial<Record<FieldName, string>>;

type TextFieldConfig = {
  label: string;
  name: FieldName;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

const initialForm: AddEmployeeFormData = {
  firstName: '',
  lastName: '',
  firstNameEng: '',
  lastNameEng: '',
  email: '',
  employeeCode: '',
  department: '',
  branch: '',
  level: '',
  hireDate: '',
  numberOfVacationDays: 15,
  birthDayAndMonth: '',
  isKpi: false,
  isSalaryCompany: false,
  github: '',
  imageUrl: '',
  status: 'ACTIVE',
};

const identityFields: TextFieldConfig[] = [
  {
    label: 'Last name',
    name: 'lastName',
    required: true,
    placeholder: 'Bat',
  },
  {
    label: 'First name',
    name: 'firstName',
    required: true,
    placeholder: 'Bold',
  },
  {
    label: 'Last name (English)',
    name: 'lastNameEng',
    required: true,
    placeholder: 'Bat',
  },
  {
    label: 'First name (English)',
    name: 'firstNameEng',
    required: true,
    placeholder: 'Bold',
  },
];

const jobFields: TextFieldConfig[] = [
  {
    label: 'Employee code',
    name: 'employeeCode',
    required: true,
    placeholder: 'EMP-001',
  },
  {
    label: 'Department',
    name: 'department',
    required: true,
    placeholder: 'Human Resources',
  },
  {
    label: 'Branch',
    name: 'branch',
    required: true,
    placeholder: 'Ulaanbaatar',
  },
  {
    label: 'Level',
    name: 'level',
    required: true,
    placeholder: 'Senior',
  },
  {
    label: 'Hire date',
    name: 'hireDate',
    type: 'date',
    required: true,
  },
  {
    label: 'Vacation days',
    name: 'numberOfVacationDays',
    type: 'number',
    required: true,
  },
  {
    label: 'Birthday',
    name: 'birthDayAndMonth',
    required: true,
    placeholder: 'MM-DD',
  },
];

const contactFields: TextFieldConfig[] = [
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
    placeholder: 'name@company.mn',
  },
  {
    label: 'GitHub',
    name: 'github',
    placeholder: 'github.com/username',
  },
  {
    label: 'Image URL',
    name: 'imageUrl',
    placeholder: 'https://...',
  },
];

const statusOptions: EmployeeStatus[] = ['ACTIVE', 'INACTIVE', 'TERMINATED'];

function validateEmployeeForm(form: AddEmployeeFormData) {
  const nextErrors: Errors = {};

  const requiredFields: FieldName[] = [
    'firstName',
    'lastName',
    'firstNameEng',
    'lastNameEng',
    'email',
    'employeeCode',
    'department',
    'branch',
    'level',
    'hireDate',
    'birthDayAndMonth',
  ];

  requiredFields.forEach((field) => {
    const value = form[field];
    if (typeof value === 'string' && !value.trim()) {
      nextErrors[field] = 'This field is required.';
    }
  });

  if (form.email.trim() && !/\S+@\S+\.\S+/.test(form.email)) {
    nextErrors.email = 'Please enter a valid email address.';
  }

  if (form.numberOfVacationDays < 0) {
    nextErrors.numberOfVacationDays = 'Vacation days cannot be negative.';
  }

  return nextErrors;
}

export default function AddEmployeeSection() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<AddEmployeeFormData>(initialForm);
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');

  const fullName = React.useMemo(() => {
    return `${form.lastName} ${form.firstName}`.trim();
  }, [form.firstName, form.lastName]);

  const completionCount = React.useMemo(() => {
    return Object.entries(form).filter(([, value]) => {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') return value > 0;
      return value.trim().length > 0;
    }).length;
  }, [form]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = event.target;
    const fieldName = name as FieldName;

    setSuccessMessage('');
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));

    if (type === 'checkbox') {
      const checked = (event.target as HTMLInputElement).checked;
      setForm((prev) => ({
        ...prev,
        [fieldName]: checked,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [fieldName]:
        fieldName === 'numberOfVacationDays' ? Number(value || 0) : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
  };

  const closeModal = () => {
    setOpen(false);
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateEmployeeForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    try {
      const payload = {
        ...form,
        action: 'add_employee',
        displayName: fullName,
      };

      console.log('Submitting employee:', payload);
      setSuccessMessage('Employee payload is ready to connect with the API.');
      closeModal();
    } catch (error) {
      console.error(error);
      setSuccessMessage('Failed to prepare employee payload.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-10 w-full max-w-5xl rounded-[28px] border border-slate-200 bg-white/90 p-5 text-left shadow-sm backdrop-blur">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#005bb7]">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-slate-400">
              HR quick action
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-900">
              Add employee draft
            </h2>
            <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-500">
              Prepare employee identity, job, payroll and onboarding flags in a
              single structured payload.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-[#111827] px-5 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-800"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Employee
        </button>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <SummaryItem
          icon={Mail}
          label="Contact"
          value={form.email || 'Email pending'}
        />
        <SummaryItem
          icon={MapPin}
          label="Department"
          value={form.department || 'Department pending'}
        />
        <SummaryItem
          icon={CircleDollarSign}
          label="Vacation"
          value={`${form.numberOfVacationDays} days`}
        />
      </div>

      {successMessage && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                  {completionCount} fields filled
                </p>
                <h3 className="mt-1 text-xl font-black text-slate-900">
                  Add Employee
                </h3>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Close add employee modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(92vh-73px)] overflow-y-auto p-6"
            >
              <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Preview full name
                </p>
                <p className="mt-1 text-lg font-black text-slate-900">
                  {fullName || 'No employee name yet'}
                </p>
              </div>

              <FormSection title="Identity">
                {identityFields.map((field) => (
                  <InputField
                    key={field.name}
                    config={field}
                    value={String(form[field.name])}
                    onChange={handleChange}
                    error={errors[field.name]}
                  />
                ))}
              </FormSection>

              <FormSection title="Job details">
                {jobFields.map((field) => (
                  <InputField
                    key={field.name}
                    config={field}
                    value={String(form[field.name])}
                    onChange={handleChange}
                    error={errors[field.name]}
                  />
                ))}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-slate-900"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </FormSection>

              <FormSection title="Contact and profile">
                {contactFields.map((field) => (
                  <InputField
                    key={field.name}
                    config={field}
                    value={String(form[field.name])}
                    onChange={handleChange}
                    error={errors[field.name]}
                  />
                ))}
              </FormSection>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <CheckboxCard
                  icon={CheckCircle2}
                  id="isKpi"
                  name="isKpi"
                  title="KPI enabled"
                  description="Employee can be included in KPI tracking."
                  checked={form.isKpi}
                  onChange={handleChange}
                />
                <CheckboxCard
                  icon={CircleDollarSign}
                  id="isSalaryCompany"
                  name="isSalaryCompany"
                  title="Salary company"
                  description="Employee belongs to payroll company list."
                  checked={form.isSalaryCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="h-12 rounded-xl border border-slate-300 px-5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="h-12 rounded-xl bg-[#111827] px-6 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h4 className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#005bb7]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}

function InputField({
  config,
  value,
  onChange,
  error,
}: {
  config: TextFieldConfig;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  error?: string;
}) {
  const Icon = config.name === 'github' ? Github : undefined;

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {config.label}{' '}
        {config.required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        <input
          name={config.name}
          type={config.type ?? 'text'}
          value={value}
          min={config.type === 'number' ? 0 : undefined}
          placeholder={config.placeholder}
          onChange={onChange}
          className={`h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 ${
            Icon ? 'pl-11' : ''
          } ${
            error
              ? 'border-rose-400 focus:border-rose-500'
              : 'border-slate-300 focus:border-slate-900'
          }`}
        />
      </div>
      {error && <p className="mt-1 text-sm font-medium text-rose-500">{error}</p>}
    </div>
  );
}

function CheckboxCard({
  icon: Icon,
  id,
  name,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  id: string;
  name: FieldName;
  title: string;
  description: string;
  checked: boolean;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition ${
        checked
          ? 'border-blue-200 bg-blue-50'
          : 'border-slate-200 bg-white hover:bg-slate-50'
      }`}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-1 h-4 w-4"
      />
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#005bb7]">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-black text-slate-900">{title}</p>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
    </label>
  );
}
