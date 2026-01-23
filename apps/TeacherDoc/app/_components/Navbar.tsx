// 'use client';

// import { Button } from '@intern-3b/shadcn';

// import { BookOpen, Sparkles, School, Crown,  } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// export default function Navbar() {
// const router=useRouter()



//   return (
//     <nav className="relative w-full border-b border-gray-100 bg-white/80 backdrop-blur-md z-40">
//          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        
    
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <div className="bg-[#059669] p-3 rounded-[18px] shadow-lg shadow-emerald-200/50">
//               <BookOpen className="w-7 h-7 text-white" />
//             </div>
//             <div className="absolute -bottom-1.5 -right-1.5 bg-[#f97316] p-1 rounded-lg border-2 border-white shadow-sm">
//               <Sparkles className="w-3 h-3 text-white" />
//             </div>
//           </div>
//           <div className="flex flex-col">
//             <h1 className="text-[22px] font-black text-slate-900 leading-tight">Хичээлийн Материал</h1>
//             <p className="text-gray-400 text-sm font-medium">Батлагдсан хичээлийн материалаа хайж олох</p>
//           </div>
//         </div>

    
//         <div className="flex items-center gap-3">
       
//           <Button 
//             onClick={()=>router.push('/manager')}
//             className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
//           >
//             <School className="w-5 h-5 text-slate-700" />
//             <span className="font-bold text-slate-700 text-[15px]">manager</span>
//           </Button>
//    <Button 
//             onClick={()=>router.push('/')}
//             className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
//           >
//             <School className="w-5 h-5 text-slate-700" />
//             <span className="font-bold text-slate-700 text-[15px]">home</span>
//           </Button>

  
//           <div className="ml-2 relative">
//             <div className="w-11 h-11 rounded-full bg-[#d1fae5] flex items-center justify-center border-2 border-white shadow-sm">
//               <span className="text-[#047857] font-black text-sm">БД</span>
//             </div>
//             <div className="absolute -bottom-0.5 -right-0.5 bg-[#f97316] p-0.5 rounded-full border-2 border-white">
//               <Crown className="w-2.5 h-2.5 text-white fill-current" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
'use client';

import { Button } from '@intern-3b/shadcn';
import { BookOpen, Sparkles, School, Crown, User, Building2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Role = 'manager' | 'teacher' | null;

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
const [open, setOpen] = useState(false);

const logout = () => {
  localStorage.removeItem('auth');
  router.replace('/login');
};
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const parsed = JSON.parse(auth);
      setRole(parsed.role);
    }
  }, []);

  return (
    <nav className="relative w-full border-b border-gray-100 bg-white/80 backdrop-blur-md z-40">
      <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">
        
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-[#059669] p-3 rounded-[18px] shadow-lg shadow-emerald-200/50">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -bottom-1.5 -right-1.5 bg-[#f97316] p-1 rounded-lg border-2 border-white shadow-sm">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[22px] font-black text-slate-900 leading-tight">
              Хичээлийн Материал
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              Батлагдсан хичээлийн материалаа хайж олох
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          {/* ⭐ ЗӨВХӨН MANAGER */}
          {role === 'manager' && (
            <Button 
              onClick={() => router.push('/manager')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
            >
              <School className="w-5 h-5 text-slate-700" />
              <span className="font-bold text-slate-700 text-[15px]">
                manager
              </span>
            </Button>
          )}

          {/* HOME */}
          <Button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <School className="w-5 h-5 text-slate-700" />
            <span className="font-bold text-slate-700 text-[15px]">
              home
            </span>
          </Button>

        {/* AVATAR */}
        <div className="ml-2 relative">
  <button
    onClick={() => setOpen(!open)}
    className="relative focus:outline-none"
  >
    <div className="w-10 h-10 rounded-full bg-[#d1fae5] flex items-center justify-center border-2 border-white shadow-sm transition-transform active:scale-95">
      <span className="text-[#047857] font-black text-xs">БД</span>
    </div>

    {role === 'manager' && (
      <div className="absolute -bottom-0.5 -right-0.5 bg-[#f97316] p-0.5 rounded-full border-2 border-white">
        <Crown className="w-2 h-2 text-white fill-current" />
      </div>
    )}
  </button>

  {open && (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
      
      <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
        
        {/* Толгой хэсэг: Нэр, Сургууль */}
        <div className="px-4 py-3">
          <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
            Оюунчимэг Болд
          </h3>
          <p className="text-[13px] text-gray-500 mt-0.5">
            23-р сургууль
          </p>
        </div>

        {/* Цэсүүд */}
        <div className="border-t border-gray-50">
          <button
            onClick={() => { setOpen(false); router.push('/profile'); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <User className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <span className="text-[15px] text-gray-700 font-medium">Профайл</span>
          </button>

          <button
            onClick={() => { setOpen(false); router.push('/school'); }}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
          >
            <Building2 className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <span className="text-[15px] text-gray-700 font-medium">Сургууль</span>
          </button>
        </div>

        {/* Гарах товч */}
        <div className="border-t border-gray-50">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50/50 transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-400 rotate-180" strokeWidth={1.5} />
            <span className="text-[15px] text-red-500 font-medium">Гарах</span>
          </button>
        </div>

      </div>
    </>
  )}
</div>



         
        </div>
      </div>
    </nav>
  );
}
