// 'use client';

// import Link from 'next/link';
// import { Button } from '../ui/button';
// import {
//   ArrowRight,
//   Check,
//   Users,
//   FileText,
//   Shield,
//   Sparkles,
//   MousePointer2,
// } from 'lucide-react';

// export function Hero() {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-[#fcfdfe] pt-32 pb-24 lg:pt-48 lg:pb-40 text-slate-900">
//       <div className="absolute inset-0 z-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

//       <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-cyan-400/10 blur-[100px] rounded-full pointer-events-none" />

//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,91,183,0.05)_0%,transparent_50%)] pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
//         <div className="text-center max-w-4xl mx-auto">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-blue-100 bg-white/80 backdrop-blur-sm mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-top-4 duration-700">
//             <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#005bb7] shadow-lg shadow-blue-200">
//               <Sparkles className="h-3.5 w-3.5 text-white" />
//             </div>
//             <span className="text-xs text-slate-600 font-bold uppercase tracking-[0.15em]">
//               DocSprint v2.0 • Хүний нөөцийг хялбарчлав
//             </span>
//           </div>

//           <h1 className="  text-xl font-black  text-[#111827] animate-in  duration-1000">
//             <span className="text-6xl"> Ажилтны удирдлагыг</span> <br />
//             <span className="relative inline-block mt-4">
//               <span className="relative z-10 text-transparent text-4xl bg-clip-text bg-gradient-to-r from-[#005bb7] via-[#0072e5] to-cyan-500">
//                 автоматжуул
//               </span>
//               <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-100/50 -z-10 rounded-full" />
//             </span>
//           </h1>

//           <p className=" pt-10 ml-40 pl-20 text-lg lg:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 font-medium">
//             Хөдөлмөрийн гэрээ болон бусад баримт бичгийг
//             <span className="text-[#005bb7] font-bold"> хиймэл оюунаар </span>
//             автоматаар үүсгэж, байгууллагынхаа бүтээмжийг нэмэгдүүлээрэй.
//           </p>

//           <div className="mt-14 flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
//             <Link href="/dashboard">
//               <Button
//                 size="lg"
//                 className="bg-[#111827] hover:bg-slate-800 text-white px-12 h-16 text-lg font-bold rounded-2xl shadow-2xl shadow-slate-200 transition-all hover:scale-[1.03] active:scale-95 flex gap-3"
//               >
//                 Үнэгүй эхлэх
//                 <ArrowRight
//                   className="h-6 w-6 text-[#005bb7]"
//                   strokeWidth={3}
//                 />
//               </Button>
//             </Link>
//             <Link href="#features">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-slate-200 bg-white/50 backdrop-blur-md hover:bg-white px-12 h-16 text-lg text-slate-600 font-bold rounded-2xl shadow-sm transition-all"
//               >
//                 Дэлгэрэнгүй үзэх
//               </Button>
//             </Link>
//           </div>
//         </div>

//         <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
//           {[
//             {
//               icon: Users,
//               label: 'Нийт ажилтан',
//               value: '156',
//               accent: 'bg-blue-500',
//               trend: '+12%',
//             },
//             {
//               icon: Check,
//               label: 'Идэвхтэй',
//               value: '142',
//               accent: 'bg-emerald-500',
//               trend: '94%',
//             },
//             {
//               icon: FileText,
//               label: 'Гэрээ үүсгэсэн',
//               value: '432',
//               accent: 'bg-blue-600',
//               trend: 'Шинэ',
//             },
//             {
//               icon: Shield,
//               label: 'Хэлтэс',
//               value: '8',
//               accent: 'bg-slate-900',
//               trend: 'Нийт',
//             },
//           ].map((stat) => (
//             <div
//               key={stat.label}
//               className="group relative p-8 rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(0,91,183,0.08)] overflow-hidden"
//             >
//               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />

//               <div className="relative z-10">
//                 <div className="flex items-center justify-between mb-8">
//                   <div
//                     className={`h-12 w-12 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all`}
//                   >
//                     <stat.icon className="h-6 w-6 text-slate-900" />
//                   </div>
//                   <span className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded-md text-slate-500 uppercase tracking-widest">
//                     {stat.trend}
//                   </span>
//                 </div>

//                 <p className="text-5xl font-black text-[#111827] mb-2 tracking-tighter italic">
//                   {stat.value}
//                 </p>
//                 <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
//                   {stat.label}
//                 </p>
//               </div>

//               <div
//                 className={`absolute bottom-0 left-0 h-1.5 w-0 group-hover:w-full transition-all duration-500 ${stat.accent}`}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-slate-300">
//           <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
//           <MousePointer2 className="w-4 h-4" />
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import {
  ArrowRight,
  Check,
  Users,
  FileText,
  Shield,
  Sparkles,
  MousePointer2,
  ChevronRight,
} from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#fcfdfe] pt-32 pb-24 lg:pt-48 lg:pb-32 text-slate-900">
      <div className="absolute inset-0 z-0 [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50" />

      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-300/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-white/80 backdrop-blur-md mb-8 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#005bb7]">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
              DocSprint v2.0 • AI Powered HR
            </span>
            <ChevronRight className="w-3 h-3 text-slate-300" />
          </div>

          <h1 className=" lg:text-8xl font-black tracking-[-0.04em] leading-[1] text-[#111827] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <span className="text-7xl"> Ажилтны удирдлагыг</span> <br />
            <span className="relative inline-block mt-2">
              <span className="relative text-6xl z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#005bb7] via-[#0072e5] to-cyan-500">
                автоматжуул
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-blue-100/40 -z-10 rounded-full blur-[2px]" />
            </span>
          </h1>

          <p className="mt-10 pt-10 text-lg lg:text-xl text-slate-500 max-w-6xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 font-medium">
            Хөдөлмөрийн гэрээ болон бусад баримт бичгийг
            <span className="text-[#005bb7] font-bold"> хиймэл оюунаар </span>
            автоматаар үүсгэж, байгууллагынхаа бүтээмжийг нэмэгдүүлээрэй.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-[#111827] hover:bg-slate-800 text-white px-10 h-16 text-base font-bold rounded-2xl shadow-2xl shadow-slate-200 transition-all hover:scale-[1.02] active:scale-95 flex gap-3"
              >
                эхлэх
                <ArrowRight
                  className="h-5 w-5 text-[#005bb7]"
                  strokeWidth={3}
                />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-200 bg-white hover:bg-slate-50 px-10 h-16 text-base text-slate-600 font-bold rounded-2xl transition-all"
              >
                Дэлгэрэнгүй үзэх
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
          {[
            {
              label: 'Нийт ажилтан',
              value: '156',
              icon: Users,
              trend: '+12%',
              color: 'blue',
            },
            {
              label: 'Идэвхтэй',
              value: '142',
              icon: Check,
              trend: '94%',
              color: 'emerald',
            },
            {
              label: 'Гэрээ үүсгэсэн',
              value: '432',
              icon: FileText,
              trend: 'New',
              color: 'blue',
            },
            {
              label: 'Хэлтэс',
              value: '8',
              icon: Shield,
              trend: 'Total',
              color: 'slate',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group relative p-8 rounded-[32px] border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/5 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full blur-3xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-white">
                    <stat.icon
                      className="h-6 w-6 text-slate-900"
                      strokeWidth={2}
                    />
                  </div>
                  <span className="text-[10px] font-black px-2 py-1 bg-slate-100 rounded-md text-slate-400 uppercase tracking-widest">
                    {stat.trend}
                  </span>
                </div>

                <p className="text-5xl font-black text-[#111827] mb-2 tracking-tighter">
                  {stat.value}
                </p>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 bg-[#005bb7]" />
            </div>
          ))}
        </div>

        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-slate-300">
          <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent" />
          <MousePointer2 className="w-4 h-4 opacity-50" />
        </div>
      </div>
    </section>
  );
}
