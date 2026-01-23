

// 'use client';

// import { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import { 
//   Sparkles, 
//   Search, 
//   ChevronLeft, 
//   ArrowRight,
//   Layers,
//   Users,
//   Plus,
//   BookOpen,
//   GraduationCap
// } from "lucide-react";
// import { Badge, Card, CardContent } from './ui/buttton';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// interface SubModule {
//   id: string;
//   name: string;
// }

// interface Module {
//   id: string;
//   name: string;
//   subModules: SubModule[];
// }

// export default function HomePage() {
//  const router = useRouter();
//   const [subject, setSubject] = useState('');
//   const [grade, setGrade] = useState('');
//   const [term, setTerm] = useState('');
//   const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
//   const [modules, setModules] = useState<Module[]>([]);
//   const [isLoading, setIsLoading] = useState(false);


//     useEffect(() => {
//     const auth = localStorage.getItem('auth');

//     if (!auth) {
//       router.replace('/login'); // login page route
//       return;
//     }

//     const parsed = JSON.parse(auth);

//     if (!parsed.isLoggedIn) {
//       router.replace('/login');
//     }
//   }, []);

//   const isProgressComplete = subject && grade && term;

//   const handleClear = () => {
//     setSubject('');
//     setGrade('');
//     setTerm('');
//   };

//   const fetchModules = async () => {
//     if (!isProgressComplete) return;
//     setIsLoading(true);
//     try {
//       const res = await fetch(`/api/module?subject=${subject}&grade=${grade}&term=${term}`);
//       if (!res.ok) throw new Error('Failed to fetch modules');
//       const data: Module[] = await res.json();
//       setModules(data);
//     } catch (err) {
//       console.error("Failed to fetch modules:", err);
//       setModules([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchModules();
//   }, [subject, grade, term]);

//   const selectedTopic = modules.find(m => m.id === selectedTopicId);


//   return (
//     <div className="min-h-screen bg-[#F8FAFA]  relative overflow-hidden">
     
//       <div className="absolute inset-0 z-0 opacity-[0.03]  pointer-events-none" 
//            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
//       </div>

//       <main className="max-w-[1504px] mx-auto px-6 py-10 relative z-10">
//         <Navbar
//           // onAddModule={(newModule) => setModules((prev) => [...prev, newModule])}
//           // onAddSubModule={(moduleId, newSub) => {
//           //   setModules((prev) =>
//           //     prev.map((m) =>
//           //       m.id === moduleId ? { ...m, subModules: [...m.subModules, newSub] } : m
//           //     )
//           //   );
//           // }}
//         />
       
//         <div className="mb-16 mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
//            <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary hover:bg-primary/20">
//           <Sparkles className="mr-1 size-3" />
//           Багш нарын платформ
//         </Badge>
//           <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight text-[#1A1A1A]">
//             Хичээлийн материалаа 
//             <span className="bg-gradient-to-r from-[#059669] via-[#10B981] to-[#F97316] bg-clip-text  from-primary text-transparent px-2">
//               хялбар
//             </span> 
//             хуваалцаарай
//           </h1>
//           <p className="mx-auto max-w-2xl text-pretty text-muted-foreground md:text-lg">
//             Монголын багш нарт зориулсан хичээлийн материал хуваалцах, хайх, ашиглах боломжтой нэгдсэн платформ
//           </p>
//         </div>


//         <Card className="border-none shadow-2xl shadow-emerald-900/5 rounded-[32px] overflow-hidden bg-white mb-12">
//           <CardContent className="p-10">
//             <div className="flex items-center gap-4 mb-10">
//               <div className="size-12 rounded-full bg-emerald-50 flex items-center justify-center">
//                 <Search className="size-6 text-emerald-600" />
//               </div>
//               <div>
//                 <h3 className="text-2xl font-bold text-[#1A1A1A]">Хайлт</h3>
//                 <p className="text-sm text-[#888]">Дараалалд нь сонголтоо хийнэ үү</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">1</span>
//                   <label className="text-sm font-bold text-[#444]">Хичээл сонгоно</label>
//                 </div>
//                 <select
//                   className="w-full bg-[#F9FAFB] border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-emerald-500/20 text-[#1A1A1A] font-medium appearance-none cursor-pointer"
//                   value={subject}
//                   onChange={(e) => { setSubject(e.target.value); setGrade(''); setTerm(''); }}
//                 >
//                   <option value="">Сонгох...</option>
//                   <option value="math">Математик</option>
//                   <option value="mongolian">Монгол хэл</option>
//                   <option value="literature">Уран зохиол</option>
//                 </select>
//               </div>

          
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs font-bold">2</span>
//                   <label className="text-sm font-bold text-[#444]">Анги сонгоно</label>
//                 </div>
//                 <select
//                   className="w-full bg-[#F9FAFB] border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-emerald-500/20 text-[#1A1A1A] font-medium appearance-none cursor-pointer disabled:opacity-50"
//                   disabled={!subject}
//                   value={grade}
//                   onChange={(e) => { setGrade(e.target.value); setTerm(''); }}
//                 >
//                   <option value="">Сонгох...</option>
//                   <option value="1">1-р анги</option>
//                   <option value="2">2-р анги</option>
//                   <option value="8">8-р анги</option>
//                 </select>
//               </div>

          
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3">
//                   <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs font-bold">3</span>
//                   <label className="text-sm font-bold text-[#444]">Улирал сонгоно</label>
//                 </div>
//                 <select
//                   className="w-full bg-[#F9FAFB] border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-emerald-500/20 text-[#1A1A1A] font-medium appearance-none cursor-pointer disabled:opacity-50"
//                   disabled={!grade}
//                   value={term}
//                   onChange={(e) => setTerm(e.target.value)}
//                 >
//                   <option value="">Сонгох...</option>
//                   <option value="1">1 улирал</option>
//                   <option value="2">2 улирал</option>
//                 </select>
//               </div>
//             </div>

//             {isProgressComplete && (
//               <div className="mt-8 flex justify-end">
//                  <button onClick={handleClear} className="text-sm font-bold text-emerald-600 hover:text-orange-500 transition-colors">
//                   Шүүлтүүр цэвэрлэх
//                 </button>
//               </div>
//             )}
//           </CardContent>
//         </Card>

   
//         {isProgressComplete && !selectedTopicId && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
//             {isLoading ? (
//               <p className="col-span-full text-center py-20 text-emerald-600 font-bold">Ачааллаж байна...</p>
//             ) : modules.map(mod => (
//               <Card 
//                 key={mod.id} 
//                 onClick={() => setSelectedTopicId(mod.id)}
//                 className="group cursor-pointer border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[24px] bg-white p-2"
//               >
//                 <CardContent className="p-6">
//                   <div className="mb-4 size-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
//                     <Layers className="size-6" />
//                   </div>
//                   <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">{mod.name}</h3>
//                   <div className="flex items-center justify-between text-[#888] text-sm font-bold">
//                     <span>{mod.subModules?.length ?? 0} дэд сэдэв</span>
//                     <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}

    
//        {selectedTopic && (
//   <div className="mt-10 animate-in slide-in-from-right-8 duration-500 max-w-full">
//     <button 
//       onClick={() => setSelectedTopicId(null)} 
//       className="mb-6 flex items-center gap-2 font-bold text-[#666] hover:text-emerald-600 transition-colors text-sm"
//     >
//       <ChevronLeft className="size-4" /> Буцах
//     </button>

//     <div className="flex items-center gap-4 mb-8">
//       <div className="size-12 rounded-full bg-emerald-50 flex items-center justify-center">
//         <GraduationCap className="size-6 text-emerald-600" />
//       </div>
//       <div>
//         <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedTopic.name}</h2>
//         <p className="text-sm text-slate-500 font-medium">{selectedTopic.subModules.length} хичээл</p>
//       </div>
//     </div>

  
//     <div className="grid  gap-5">
//       {selectedTopic.subModules.map((sub, idx) => (
//         <div 
//           key={sub.id} 
//           className="relative bg-white border border-slate-100 rounded-[24px] p-10 shadow-sm hover:shadow-md transition-all overflow-hidden group"
//         >
//           <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-500 to-orange-400" />

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
//             <div className="flex items-center gap-6">
             
//               <div className="size-12 shrink-0 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-black text-lg">
//                 {idx + 1}
//               </div>

//               <div className="space-y-1.5">
//                 <div className="flex items-center flex-wrap gap-3">
//                   <h3 className="text-lg font-extrabold text-[#059669] group-hover:text-emerald-700 transition-colors">
//                     {sub.name}
//                   </h3>
                 
//                   <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[11px] font-bold text-emerald-600">
//                     <div className="size-3.5 rounded-full border border-emerald-600 flex items-center justify-center">
//                        <svg className="size-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
//                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                        </svg>
//                     </div>
//                     Батлагдсан
//                   </div>
//                 </div>
                
             
//                 <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
//                   <Users className="size-4" />
//                   <span>{Math.floor(Math.random() * 5) + 1} багш материал бэлтгэсэн</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
//                 <Plus className="size-4" /> Материал нэмэх
//               </button>
//               <Link href={`/sub-module/${sub.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
//                 <BookOpen className="size-4" /> Дэлгэрэнгүй
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// )}
//       </main>
//     </div>
//   );
// }

// function FeatureCard({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: 'emerald' | 'orange' | 'blue' }) {
//   const styles = {
//     emerald: "bg-emerald-50/50 border-emerald-100/50 text-emerald-600",
//     orange: "bg-orange-50/50 border-orange-100/50 text-orange-500",
//     blue: "bg-blue-50/50 border-blue-100/50 text-blue-500"
//   };

//   return (
//     <Card className={`border-none rounded-[32px] p-4 ${styles[color]} shadow-sm`}>
//       <CardContent className="p-6">
//         <div className={`size-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6`}>
//           <Icon className="size-6" />
//         </div>
//         <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{title}</h3>
//         <p className="text-[#666] text-sm font-medium leading-relaxed">{desc}</p>
//       </CardContent>
//     </Card>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { 
  Sparkles, 
  Search, 
  ChevronLeft, 
  ArrowRight,
  Layers,
  Users,
  Plus,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { Badge, Card, CardContent } from './ui/buttton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SubModule {
  id: string;
  name: string;
}

interface Module {
  id: string;
  name: string;
  subModules: SubModule[];
}

export default function HomePage() {
 const router = useRouter();
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
    const auth = localStorage.getItem('auth');

    if (!auth) {
      router.replace('/login'); // login page route
      return;
    }

    const parsed = JSON.parse(auth);

    if (!parsed.isLoggedIn) {
      router.replace('/login');
    }
  }, []);

  const isProgressComplete = subject && grade && term;

  const handleClear = () => {
    setSubject('');
    setGrade('');
    setTerm('');
  };

  const fetchModules = async () => {
    if (!isProgressComplete) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/module?subject=${subject}&grade=${grade}&term=${term}`);
      if (!res.ok) throw new Error('Failed to fetch modules');
      const data: Module[] = await res.json();
      setModules(data);
    } catch (err) {
      console.error("Failed to fetch modules:", err);
      setModules([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [subject, grade, term]);

  const selectedTopic = modules.find(m => m.id === selectedTopicId);


  return (
    <div className="min-h-screen bg-[#F8FAFA]  relative overflow-hidden">
     
      <div className="absolute inset-0 z-0 opacity-[0.03]  pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      <main className="max-w-[1504px] mx-auto px-6 py-10 relative z-10">
        <Navbar
          // onAddModule={(newModule) => setModules((prev) => [...prev, newModule])}
          // onAddSubModule={(moduleId, newSub) => {
          //   setModules((prev) =>
          //     prev.map((m) =>
          //       m.id === moduleId ? { ...m, subModules: [...m.subModules, newSub] } : m
          //     )
          //   );
          // }}
        />
       
        <div className="mb-16 mt-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
           <Badge className="mb-4 border-primary/20 bg-primary/10 text-primary hover:bg-primary/20">
          <Sparkles className="mr-1 size-3" />
          Багш нарын платформ
        </Badge>
          <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-tight text-[#1A1A1A]">
            Хичээлийн материалаа 
            <span className="bg-gradient-to-r from-[#059669] via-[#10B981] to-[#F97316] bg-clip-text  from-primary text-transparent px-2">
              хялбар
            </span> 
            хуваалцаарай
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground md:text-lg">
            Монголын багш нарт зориулсан хичээлийн материал хуваалцах, хайх, ашиглах боломжтой нэгдсэн платформ
          </p>
        </div>


        <Card className="border-none shadow-2xl shadow-emerald-900/5 rounded-[32px] overflow-hidden bg-white mb-12">
          <CardContent className="p-10">
            <div className="flex items-center gap-4 mb-10">
              <div className="size-12 rounded-full bg-emerald-50 flex items-center justify-center">
                <Search className="size-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Хайлт</h3>
                <p className="text-sm text-[#888]">Дараалалд нь сонголтоо хийнэ үү</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">1</span>
                  <label className="text-sm font-bold text-[#444]">Хичээл сонгоно</label>
                </div>
                <select
                  className="w-full bg-[#F9FAFB] border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-emerald-500/20 text-[#1A1A1A] font-medium appearance-none cursor-pointer"
                  value={subject}
                  onChange={(e) => { setSubject(e.target.value); setGrade(''); setTerm(''); }}
                >
                  <option value="">Сонгох...</option>
                  <option value="math">Математик</option>
                  <option value="mongolian">Монгол хэл</option>
                  <option value="literature">Уран зохиол</option>
                </select>
              </div>

          
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs font-bold">2</span>
                  <label className="text-sm font-bold text-[#444]">Анги сонгоно</label>
                </div>
                <select
                  className="w-full bg-[#F9FAFB] border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-emerald-500/20 text-[#1A1A1A] font-medium appearance-none cursor-pointer disabled:opacity-50"
                  disabled={!subject}
                  value={grade}
                  onChange={(e) => { setGrade(e.target.value); setTerm(''); }}
                >
                  <option value="">Сонгох...</option>
                  <option value="1">1-р анги</option>
                  <option value="2">2-р анги</option>
                  <option value="8">8-р анги</option>
                </select>
              </div>

          
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-slate-200 text-slate-500 text-xs font-bold">3</span>
                  <label className="text-sm font-bold text-[#444]">Улирал сонгоно</label>
                </div>
                <select
                  className="w-full bg-[#F9FAFB] border-none rounded-2xl px-5 py-4 outline-none focus:ring-2 ring-emerald-500/20 text-[#1A1A1A] font-medium appearance-none cursor-pointer disabled:opacity-50"
                  disabled={!grade}
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="">Сонгох...</option>
                  <option value="1">1 улирал</option>
                  <option value="2">2 улирал</option>
                </select>
              </div>
            </div>

            {isProgressComplete && (
              <div className="mt-8 flex justify-end">
                 <button onClick={handleClear} className="text-sm font-bold text-emerald-600 hover:text-orange-500 transition-colors">
                  Шүүлтүүр цэвэрлэх
                </button>
              </div>
            )}
          </CardContent>
        </Card>

   
        {isProgressComplete && !selectedTopicId && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {isLoading ? (
              <p className="col-span-full text-center py-20 text-emerald-600 font-bold">Ачааллаж байна...</p>
            ) : modules.map(mod => (
              <Card 
                key={mod.id} 
                onClick={() => setSelectedTopicId(mod.id)}
                className="group cursor-pointer border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[24px] bg-white p-2"
              >
                <CardContent className="p-6">
                  <div className="mb-4 size-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Layers className="size-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-4">{mod.name}</h3>
                  <div className="flex items-center justify-between text-[#888] text-sm font-bold">
                    <span>{mod.subModules?.length ?? 0} дэд сэдэв</span>
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

    
       {selectedTopic && (
  <div className="mt-10 animate-in slide-in-from-right-8 duration-500 max-w-full">
    <button 
      onClick={() => setSelectedTopicId(null)} 
      className="mb-6 flex items-center gap-2 font-bold text-[#666] hover:text-emerald-600 transition-colors text-sm"
    >
      <ChevronLeft className="size-4" /> Буцах
    </button>

    <div className="flex items-center gap-4 mb-8">
      <div className="size-12 rounded-full bg-emerald-50 flex items-center justify-center">
        <GraduationCap className="size-6 text-emerald-600" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedTopic.name}</h2>
        <p className="text-sm text-slate-500 font-medium">{selectedTopic.subModules.length} хичээл</p>
      </div>
    </div>

  
    <div className="grid  gap-5">
      {selectedTopic.subModules.map((sub, idx) => (
        <div 
          key={sub.id} 
          className="relative bg-white border border-slate-100 rounded-[24px] p-10 shadow-sm hover:shadow-md transition-all overflow-hidden group"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-500 to-orange-400" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
             
              <div className="size-12 shrink-0 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 font-black text-lg">
                {idx + 1}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center flex-wrap gap-3">
                  <h3 className="text-lg font-extrabold text-[#059669] group-hover:text-emerald-700 transition-colors">
                    {sub.name}
                  </h3>
                 
                  <div className="flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full text-[11px] font-bold text-emerald-600">
                    <div className="size-3.5 rounded-full border border-emerald-600 flex items-center justify-center">
                       <svg className="size-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    Батлагдсан
                  </div>
                </div>
                
             
                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                  <Users className="size-4" />
                  <span>{Math.floor(Math.random() * 5) + 1} багш материал бэлтгэсэн</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                <Plus className="size-4" /> Материал нэмэх
              </button>
              <Link href={`/sub-module/${sub.id}`} className="flex items-center gap-2 px-5 py-2.5 bg-[#059669] rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200">
                <BookOpen className="size-4" /> Дэлгэрэнгүй
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      </main>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: { icon: any, title: string, desc: string, color: 'emerald' | 'orange' | 'blue' }) {
  const styles = {
    emerald: "bg-emerald-50/50 border-emerald-100/50 text-emerald-600",
    orange: "bg-orange-50/50 border-orange-100/50 text-orange-500",
    blue: "bg-blue-50/50 border-blue-100/50 text-blue-500"
  };

  return (
    <Card className={`border-none rounded-[32px] p-4 ${styles[color]} shadow-sm`}>
      <CardContent className="p-6">
        <div className={`size-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6`}>
          <Icon className="size-6" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{title}</h3>
        <p className="text-[#666] text-sm font-medium leading-relaxed">{desc}</p>
      </CardContent>
    </Card>
  );
}

