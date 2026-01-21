// 'use client';

// import { useState } from 'react';
// import AuthPage from '../_components/AuthPage';
// import { Button } from '../_components/ui/CustomUI';

// export default function LoginPage() {
//   const [role, setRole] = useState<null | 'school' | 'teacher'>(null);

//   return (
//     <div className="min-h-screen bg-[#fafafa] font-sans text-slate-900 selection:bg-[#B0DAC8]/30 flex items-center justify-center">
//       {!role && (
//         <div className="flex gap-4">
//           <Button variant="primary" onClick={() => setRole('school')}>
//             Сургууль
//           </Button>

//           <Button onClick={() => setRole('teacher')}>
//             Багш
//           </Button>
//         </div>
//       )}
//       {role && (
//         <AuthPage role={role} onBack={() => setRole(null)} />
//       )}
//     </div>
//   );
// }
"use client";

import React, { useState } from 'react';
import { BookOpen, School, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

const InputField = ({ label, icon: Icon, type, placeholder, value, onChange }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1.5 ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#008c52] transition-colors">
          <Icon size={18} />
        </div>
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="block w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:ring-2 focus:ring-[#008c52]/20 focus:border-[#008c52] outline-none transition-all placeholder:text-gray-300"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};


export default function LoginPage() {
  return (
    <div className="min-h-screen  bg-[#f8f9fa] flex flex-col items-center justify-center p-6 font-sans">

      <div className="flex flex-col   items-center mb-10 text-center">
        <div className="bg-[#008c52] w-16 h-16 rounded-[20px] flex items-center justify-center shadow-lg shadow-[#008c52]/20 mb-5 text-white">
          <BookOpen size={32} strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold text-[#1a1a1a] tracking-tight mb-1">
          Хичээлийн Материал
        </h1>
        <p className="text-gray-500 font-medium text-sm tracking-wide">
          Багш нарын платформ
        </p>
      </div>


      <div className="bg-white w-full max-w-[540px] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10 border border-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Нэвтрэх</h2>
        <p className="text-gray-500 text-[14px] leading-relaxed mb-8">
          Сургуулийн код, утасны дугаар болон нууц үгээ оруулна уу
        </p>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <InputField 
            label="Сургуулийн код" 
            icon={School} 
            type="text" 
            placeholder="SCH23" 
          />
          
          <InputField 
            label="Утасны дугаар" 
            icon={Phone} 
            type="text" 
            placeholder="99001234" 
          />
          
          <InputField 
            label="Нууц үг" 
            icon={Lock} 
            type="password" 
            placeholder="••••••••" 
          />
       <Link href="/">
         <button

      
            type="submit"
            onClick={()=>alert("amjilttai nevterlee")}

            className="w-full bg-[#008c52] hover:bg-[#007a48] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#008c52]/20 transition-all active:scale-[0.98] mt-4"
          >
            Нэвтрэх
          </button>
      </Link>
         
        </form>


        <div className="mt-10 p-5 bg-[#f9fafb] rounded-[20px] border border-gray-100">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Туршилтын нэвтрэх мэдээлэл:
          </h4>
          <div className="space-y-2">
            <p className="text-[13px] text-gray-600 flex justify-between">
              <span className="font-semibold text-gray-700">Manager:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-gray-100">SCH23 / 99001234 / pass123</span>
            </p>
            <p className="text-[13px] text-gray-600 flex justify-between">
              <span className="font-semibold text-gray-700">Teacher:</span>
              <span className="font-mono bg-white px-2 py-0.5 rounded border border-gray-100">SCH23 / 99005678 / pass123</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}