interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function FormInput({ label, type, value, onChange, error, placeholder, icon, rightIcon }: FormInputProps) {
  return (
    <div className="space-y-2 text-left">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} ${rightIcon ? 'pr-11' : 'pr-4'} py-3 bg-white border ${
            error ? 'border-red-500' : 'border-gray-200'
          } rounded-xl outline-none focus:border-[#00955b] focus:ring-4 focus:ring-green-50 transition-all text-gray-700 placeholder:text-gray-300`}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}