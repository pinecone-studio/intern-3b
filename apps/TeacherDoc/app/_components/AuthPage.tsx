// 'use client';

// import { useState } from "react";
// import { SignUpForm } from "./SignUpForm";
// import SignInForm from "./SignInForm";
// import SignInSchoolForm from "./SignInSchoolForm";
// import { SignUpSchoolForm } from "./SignUpSchoolForm";


// const BookIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
//     <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
//     <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
//   </svg>
// );

// type AuthPageProps = {
//   role: 'school' | 'teacher';
//   onBack: () => void;
// };

// export default function AuthPage({ role, onBack }: AuthPageProps) {
//   const [isSignUp, setIsSignUp] = useState(false);

//   return (
//     <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#f8fafc] p-4">
//       {/* Header section with Logo and Title */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="bg-[#008a5b] p-3 rounded-xl mb-4 shadow-sm">
//           <BookIcon />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900 mb-1">Хичээлийн Материал</h1>
//         <p className="text-gray-500 text-sm">Багш нарын платформ</p>
//       </div>

//       <div className="w-full max-w-[540px]">
//         <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
//           <div className="mb-6">
//             <h2 className="text-xl font-bold text-gray-900 mb-2">
//               {isSignUp ? 'Бүртгүүлэх' : 'Нэвтрэх'}
//             </h2>
//             <p className="text-gray-500 text-sm leading-relaxed">
//               {isSignUp
//                 ? 'Шинэ хэрэглэгчийн данс үүсгэх'
//                 : 'Сургуулийн код, утасны дугаар болон нууц үгээ оруулна уу'}
//             </p>
//           </div>

//           {/* Logic remains the same */}
//           {role === "school" ? (
//             isSignUp ? <SignUpSchoolForm /> : <SignInSchoolForm />
//           ) : (
//             isSignUp ? <SignUpForm /> : <SignInForm />
//           )}

//           {/* Switch Sign In/Up */}
//           <div className="mt-6 text-center">
//             <button
//               onClick={() => setIsSignUp(!isSignUp)}
//               className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
//             >
//               {isSignUp ? (
//                 <>Танд данс байна уу? <span className="font-semibold text-[#008a5b]">Нэвтрэх</span></>
//               ) : (
//                 <>Шинэ хэрэглэгч үү? <span className="font-semibold text-[#008a5b]">Бүртгүүлэх</span></>
//               )}
//             </button>
//           </div>

//           {/* Test Info Box - Зураг дээрх мэдээлэл */}
//           {!isSignUp && (
//             <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-[12px] text-gray-500 leading-relaxed">
//               <p className="font-medium mb-1">Туршилтын нэвтрэх мэдээлэл:</p>
//               <p>Manager: SCH23 / 99001234 / pass123</p>
//               <p>Teacher: SCH23 / 99005678 / pass123</p>
//             </div>
//           )}
//         </div>

//         <button 
//           onClick={onBack} 
//           className="mt-6 w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
//         >
//           ← Буцах
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'manager' | 'teacher';

export default function AuthPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('manager');
  const [schoolCode, setSchoolCode] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    // 🔹 TEST USERS
    const manager =
      role === 'manager' &&
      schoolCode === 'SCH23' &&
      phone === '99001234' &&
      password === 'pass123';

    const teacher =
      role === 'teacher' &&
      schoolCode === 'SCH23' &&
      phone === '99005678' &&
      password === 'pass123';

    if (manager || teacher) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          role,
          isLoggedIn: true,
        })
      );

      router.push('/');
    } else {
      setError('Нэвтрэх мэдээлэл буруу');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">

        <h1 className="text-2xl font-bold text-center mb-6">
          Нэвтрэх
        </h1>

        {/* ROLE SWITCH */}
        <div className="flex mb-4 gap-2">
          <button
            onClick={() => setRole('manager')}
            className={`flex-1 py-2 rounded-xl font-semibold ${
              role === 'manager'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            Manager
          </button>

          <button
            onClick={() => setRole('teacher')}
            className={`flex-1 py-2 rounded-xl font-semibold ${
              role === 'teacher'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            Teacher
          </button>
        </div>

        {/* INPUTS */}
        <div className="space-y-3">
          <input
            placeholder="School code"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setSchoolCode(e.target.value)}
          />

          <input
            placeholder="Phone"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-emerald-600 text-white py-2 rounded-xl font-bold"
        >
          Нэвтрэх
        </button>

        {/* TEST INFO */}
        <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold mb-1">Туршилтын аккаунт</p>
          <p>Manager: SCH23 / 99001234 / pass123</p>
          <p>Teacher: SCH23 / 99005678 / pass123</p>
        </div>
      </div>
    </div>
  );
}
