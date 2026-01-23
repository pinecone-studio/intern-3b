// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, School, Phone, Shield } from 'lucide-react';

// type Auth = {
//   role: 'manager' | 'teacher';
//   isLoggedIn: boolean;
// };

// export default function ProfilePage() {
//   const router = useRouter();
//   const [auth, setAuth] = useState<Auth | null>(null);

//   useEffect(() => {
//     const stored = localStorage.getItem('auth');

//     if (!stored) {
//       router.replace('/login');
//       return;
//     }

//     const parsed = JSON.parse(stored);

//     if (!parsed.isLoggedIn) {
//       router.replace('/login');
//       return;
//     }

//     setAuth(parsed);
//   }, []);

//   if (!auth) return null;

//   return (
//     <div className="min-h-screen bg-[#f8f9fa] flex justify-center p-6">
//       <div className="w-full max-w-xl bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8">

//         {/* HEADER */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="w-14 h-14 rounded-full bg-[#d1fae5] flex items-center justify-center">
//             <User className="text-[#047857]" />
//           </div>
//           <div>
//             <h1 className="text-xl font-extrabold text-gray-900">
//               Хэрэглэгчийн профайл
//             </h1>
//             <p className="text-sm text-gray-500">
//               Таны бүртгэлийн мэдээлэл
//             </p>
//           </div>
//         </div>

//         {/* INFO */}
//         <div className="space-y-4">

//           <InfoRow
//             icon={<Shield className="w-4 h-4" />}
//             label="Role"
//             value={auth.role === 'manager' ? 'Manager' : 'Teacher'}
//           />

//           <InfoRow
//             icon={<School className="w-4 h-4" />}
//             label="Сургуулийн код"
//             value="SCH23"
//           />

//           <InfoRow
//             icon={<Phone className="w-4 h-4" />}
//             label="Утасны дугаар"
//             value={
//               auth.role === 'manager'
//                 ? '99001234'
//                 : '99005678'
//             }
//           />
//         </div>

//         {/* ACTIONS */}
//         <div className="mt-10 flex gap-3">
//           <button
//             onClick={() => router.push('/')}
//             className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50"
//           >
//             Home
//           </button>

//           <button
//             onClick={() => {
//               localStorage.removeItem('auth');
//               router.replace('/login');
//             }}
//             className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600"
//           >
//             Гарах
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoRow({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center justify-between bg-[#f9fafb] rounded-xl px-4 py-3 border border-gray-100">
//       <div className="flex items-center gap-2 text-gray-600 text-sm font-semibold">
//         {icon}
//         {label}
//       </div>
//       <div className="text-gray-900 font-bold text-sm">
//         {value}
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, School, Phone, Shield, 
  BookOpen, Hash, Edit2, Plus, Search, 
  GraduationCap, ChevronLeft 
} from 'lucide-react';

type Auth = {
  role: 'manager' | 'teacher';
  isLoggedIn: boolean;
};

export default function ProfilePage() {
  const router = useRouter();
  const [auth, setAuth] = useState<Auth | null>(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (!stored) {
      router.replace('/login');
      return;
    }
    const parsed = JSON.parse(stored);
    if (!parsed.isLoggedIn) {
      router.replace('/login');
      return;
    }
    setAuth(parsed);
  }, []);

  if (!auth) return null;

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl space-y-6">
        
        {/* TOP HEADER CARD */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100">
          <div className="h-32 bg-gradient-to-r from-[#d1fae5] via-[#e0f2f1] to-[#ffedd5]" />
          <div className="px-10 pb-10 -mt-12 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-md bg-[#fef3c7] overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left pt-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-[28px] font-bold text-gray-900 leading-none">
                    {auth.role === 'manager' ? 'Менежер Бат' : 'Батбаяр Дорж'}
                  </h1>
                  <span className="flex items-center gap-1 bg-[#dcfce7] text-[#15803d] px-3 py-1 rounded-full text-xs font-bold">
                    <GraduationCap className="w-3 h-3" />
                    {auth.role === 'manager' ? 'Менежер' : 'Багш'}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5 text-sm">
                    <BookOpen className="w-4 h-4" /> Математик
                  </div>
                  <div className="flex items-center gap-1.5 text-sm">
                    <School className="w-4 h-4" /> 23-р сургууль
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#f0f9ff] px-6 py-4 rounded-2xl text-center min-w-[120px]">
              <div className="text-[#0369a1] text-2xl font-black">3</div>
              <div className="text-[#0369a1] text-xs font-bold opacity-70">Материал</div>
            </div>
          </div>
        </div>

        {/* TAB SWITCHER */}
        <div className="bg-[#e9efec] p-1.5 rounded-2xl flex gap-1">
          <button 
            onClick={() => setActiveTab('info')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'info' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <User className="w-4 h-4" /> Хувийн мэдээлэл
          </button>
          <button 
            onClick={() => setActiveTab('materials')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${activeTab === 'materials' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <BookOpen className="w-4 h-4" /> Миний материалууд (3)
          </button>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Хувийн мэдээлэл</h2>
              <p className="text-gray-500 text-sm mt-1">Профайлын мэдээллийг засах</p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              <Edit2 className="w-4 h-4" /> Засах
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoBox 
              icon={<User className="text-[#059669]" />} 
              bgColor="bg-[#ecfdf5]" 
              label="Нэр" 
              value={auth.role === 'manager' ? 'Менежер Бат' : 'Батбаяр Дорж'} 
            />
            <InfoBox 
              icon={<Hash className="text-[#0891b2]" />} 
              bgColor="bg-[#ecfeff]" 
              label="Дугаар" 
              value="1001" 
            />
            <InfoBox 
              icon={<BookOpen className="text-[#10b981]" />} 
              bgColor="bg-[#f0fdf4]" 
              label="Хичээл" 
              value="Математик" 
            />
            <InfoBox 
              icon={<School className="text-[#059669]" />} 
              bgColor="bg-[#ecfdf5]" 
              label="Сургууль" 
              value="23-р сургууль" 
            />
          </div>
        </div>

        {/* QUICK LINKS AREA */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900 px-2">Түргэн холбоосууд</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickLink 
              icon={<Plus className="text-[#10b981]" />} 
              bgColor="bg-[#ecfdf5]" 
              title="Хичээл нэмэх" 
              desc="Шинэ материал оруулах"
            />
            <QuickLink 
              icon={<Search className="text-[#f97316]" />} 
              bgColor="bg-[#fff7ed]" 
              title="Материал хайх" 
              desc="Бусад багшийн материал"
            />
          </div>
        </div>

        {/* FOOTER ACTIONS (LOGOUT & HOME) */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-gray-200 font-bold text-gray-600 hover:bg-white transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" /> Буцах
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('auth');
              router.replace('/login');
            }}
            className="flex-1 py-4 rounded-2xl bg-[#ef4444] text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-100"
          >
            Системээс гарах
          </button>
        </div>

      </div>
    </div>
  );
}

function InfoBox({ icon, bgColor, label, value }: { icon: any, bgColor: string, label: string, value: string }) {
  return (
    <div className="flex items-center justify-between p-5 bg-[#f9fafb] border border-gray-50 rounded-[24px]">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center`}>
          {icon}
        </div>
        <span className="text-gray-500 font-medium">{label}</span>
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}

function QuickLink({ icon, bgColor, title, desc }: { icon: any, bgColor: string, title: string, desc: string }) {
  return (
    <button className="flex items-center gap-5 p-6 bg-white border border-gray-100 rounded-[28px] text-left hover:shadow-md transition-all active:scale-[0.98]">
      <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-gray-900">{title}</div>
        <div className="text-sm text-gray-400 font-medium">{desc}</div>
      </div>
    </button>
  );
}