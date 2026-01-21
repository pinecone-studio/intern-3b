'use client';

import { Button } from '@intern-3b/shadcn';

import { BookOpen, Sparkles, School, Crown,  } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
const router=useRouter()



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
            <h1 className="text-[22px] font-black text-slate-900 leading-tight">Хичээлийн Материал</h1>
            <p className="text-gray-400 text-sm font-medium">Батлагдсан хичээлийн материалаа хайж олох</p>
          </div>
        </div>

    
        <div className="flex items-center gap-3">
       
          <Button 
            onClick={()=>router.push('/manager')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <School className="w-5 h-5 text-slate-700" />
            <span className="font-bold text-slate-700 text-[15px]">manager</span>
          </Button>
   <Button 
            onClick={()=>router.push('/')}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <School className="w-5 h-5 text-slate-700" />
            <span className="font-bold text-slate-700 text-[15px]">home</span>
          </Button>

  
          <div className="ml-2 relative">
            <div className="w-11 h-11 rounded-full bg-[#d1fae5] flex items-center justify-center border-2 border-white shadow-sm">
              <span className="text-[#047857] font-black text-sm">БД</span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-[#f97316] p-0.5 rounded-full border-2 border-white">
              <Crown className="w-2.5 h-2.5 text-white fill-current" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}