// import { useState } from 'react';
// import FormInput from './FormInput';
// import FormButton from './FormButton';
// import { waitForDebugger } from 'inspector';
// import { useRouter } from 'next/navigation';

// export default function SignInForm() {
//   const router=useRouter()
//   const [formData, setFormData] = useState({

//     phoneNumber: '',
//     password: ' ',
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [loading, setLoading] = useState(false);
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const newErrors: Record<string, string> = {};
//     if (!formData.phoneNumber.trim()) {
//       newErrors.phoneNumber = 'Утасны дугаар оруулна уу';
//     }
//     if (!formData.password.trim()) {
//       newErrors.password = 'Нууц үг оруулна уу';
//     }
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     setLoading(true);
//     //Yg ene hesegt db ruu nemdeg logic orj irne e.g axiosInstance

//     // await new Promise((resolve) => setTimeout(resolve, 1500));
//     // console.log('Sign up:', formData);
//     // setLoading(false);
//   };
//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => {
//       return { ...prev, [field]: value };
//     });
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: '' }));
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-5">
//       <FormInput
//         label="Утасны дугаар"
//         type="tel"
//         value={formData.phoneNumber}
//         onChange={(value) => handleChange('phoneNumber', value)}
//         error={errors.phoneNumber}
//         placeholder="99119911"
//       />

//       <FormInput
//         label="Нууц үг"
//         type="password"
//         value={formData.password}
//         onChange={(value) => handleChange('password', value)}
//         error={errors.password}
//         placeholder="••••••••"
//       />

//       <FormButton loading={loading}>Нэвтрэх</FormButton>
//     </form>
//   );
// }
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { School, Phone, Lock, Eye, BookOpen } from 'lucide-react'; // Икон ашиглахын тулд lucide-react суулгаарай
import FormInput from './FormInput';
import FormButton from './FormButton';

export default function SignInForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    schoolCode: 'SCH23', // Зураг дээрх жишээ утга
    phoneNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!formData.schoolCode.trim()) {
      newErrors.schoolCode = 'Сургуулийн код оруулна уу';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Утасны дугаар оруулна уу';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Нууц үг оруулна уу';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // API logic goes here
    console.log('Form Submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center p-4 font-sans">
      {/* Дээд талын лого хэсэг */}
      <div className="flex flex-col items-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-16 h-16 bg-[#00955b] rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 mb-4 transform hover:scale-105 transition-transform">
          <BookOpen className="text-white w-9 h-9" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Хичээлийн Материал</h1>
        <p className="text-gray-500 text-sm mt-1">Багш нарын платформ</p>
      </div>

      {/* Форм карт */}
      <div className="bg-white w-full max-w-[480px] rounded-[40px] p-8 md:p-10 shadow-2xl shadow-gray-200/50 border border-white/20 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Нэвтрэх</h2>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            Сургуулийн код, утасны дугаар болон нууц үгээ оруулна уу
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Сургуулийн код"
            type="text"
            icon={<School className="w-5 h-5 text-gray-400" />}
            value={formData.schoolCode}
            onChange={(value) => handleChange('schoolCode', value)}
            error={errors.schoolCode}
            placeholder="SCH23"
          />

          <FormInput
            label="Утасны дугаар"
            type="tel"
            icon={<Phone className="w-5 h-5 text-gray-400" />}
            value={formData.phoneNumber}
            onChange={(value) => handleChange('phoneNumber', value)}
            error={errors.phoneNumber}
            placeholder="99001234"
          />

          <FormInput
            label="Нууц үг"
            type="password"
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            rightIcon={<Eye className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600" />}
            value={formData.password}
            onChange={(value) => handleChange('password', value)}
            error={errors.password}
            placeholder="••••••••"
          />

          <div className="pt-2">
            <FormButton loading={loading}>Нэвтрэх</FormButton>
          </div>
        </form>

        {/* Туршилтын мэдээлэл хэсэг */}
        <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-green-100 transition-colors">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-3">
            Туршилтын нэвтрэх мэдээлэл:
          </p>
          <div className="space-y-2 text-xs md:text-sm text-gray-600">
            <p className="flex justify-between">
              <span className="font-medium text-gray-400">Manager:</span>
              <span className="text-gray-700">SCH23 / 99001234 / pass123</span>
            </p>
            <p className="flex justify-between">
              <span className="font-medium text-gray-400">Teacher:</span>
              <span className="text-gray-700">SCH23 / 99005678 / pass123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}