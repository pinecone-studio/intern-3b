'use client';

import { useRef, useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Briefcase,
  Clock,
  RotateCcw,
  Plus,
  Save,
  Printer,
  Type,
} from 'lucide-react';

const templateOptions = [
  {
    id: 'employment',
    name: 'Хөдөлмөрийн гэрээ',
    icon: FileText,
    content:
      'ХӨДӨЛМӨРИЙН ГЭРЭЭ \n\n {company} компани болон {lastName} {firstName} нарын хооронд энэхүү гэрээг байгуулав. \n\nНэг. Нийтлэг үндэслэл\n1.1. Ажилтан нь {position} албан тушаалд ажиллана.\n1.2. Гэрээний хугацаа: Тодорхойгүй хугацаагаар.',
  },
  {
    id: 'nda',
    name: 'Нууц хадгалах гэрээ',
    icon: ShieldCheck,
    content:
      'НУУЦЛАЛЫН ГЭРЭЭ \n\n Энэхүү гэрээг нэг талаас {company}, нөгөө талаас {firstName} {lastName} нар харилцан тохиролцож байгуулав. \n\nХоёр. Нууц мэдээллийн төрөл\n2.1. Байгууллагын санхүү, технологи, харилцагчийн мэдээлэл...',
  },
  {
    id: 'job_desc',
    name: 'Ажлын байрны тодорхойлолт',
    icon: Briefcase,
    content:
      'АЖЛЫН БАЙРНЫ ТОДОРХОЙЛОЛТ \n\n Албан тушаал: {position} \n Хэлтэс: {department} \n\nГүйцэтгэх чиг үүрэг:\n- Код бичих, систем хөгжүүлэх\n- Багийн уулзалтад оролцох',
  },
  {
    id: 'trial',
    name: 'Туршилтын мэдэгдэл',
    icon: Clock,
    content:
      'ТУРШИЛТЫН ХУГАЦААГААР АЖИЛЛУУЛАХ ТУХАЙ МЭДЭГДЭЛ \n\n Огноо: {date}\n\n Хүлээн авагч: {lastName} {firstName} \n\n Таныг {company} компанид туршилтын хугацаагаар ажиллахыг зөвшөөрсөн тул энэхүү мэдэгдлийг хүргүүлж байна.',
  },
] as const;

export default function ContractTemplate() {
  const [selectedId, setSelectedId] = useState<string>('employment');
  const [content, setContent] = useState<string>(templateOptions[0].content);

  // ✅ paper-г print хийхэд хэрэгтэй
  const paperRef = useRef<HTMLDivElement | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const found = templateOptions.find((t) => t.id === id);
    if (found) setContent(found.content);
  };

  const handleReset = () => {
    const found = templateOptions.find((t) => t.id === selectedId);
    if (found) setContent(found.content);
  };

  // ✅ Save дээр дархад Print dialog нээгээд Save as PDF хийж хадгална
  // ✅ Цагаан болох асуудал:
  //  - Print window CSS олж чадахгүй (/_next/...) -> base href + stylesheet хуулалт
  //  - textarea value outerHTML-д ордоггүй -> clone дээр textarea textContent болгож шингээх
  const handlePrintPdf = () => {
    if (!paperRef.current) return;

    const printWindow = window.open('', '_blank', 'width=1100,height=750');
    if (!printWindow) return;

    // ✅ Paper clone + textarea value-г HTML дотор оруулна
    const clone = paperRef.current.cloneNode(true) as HTMLElement;

    const originalTextareas = paperRef.current.querySelectorAll('textarea');
    const clonedTextareas = clone.querySelectorAll('textarea');

    clonedTextareas.forEach((ta, i) => {
      const value = originalTextareas[i]?.value ?? '';
      ta.value = value; // DOM
      ta.textContent = value; // HTML
    });

    // ✅ Одоогийн page-ийн бүх stylesheet, inline style-уудыг print window руу хуулна
    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style'),
    )
      .map((node) => node.outerHTML)
      .join('\n');

    // ✅ Next.js static path асуудлыг засах base
    const baseHref = window.location.origin;

    printWindow.document.open();
    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <base href="${baseHref}/" />
          <title>Print</title>

          ${styles}

          <style>
            @page { size: A4; margin: 12mm; }
            html, body { height: 100%; }
            body {
              margin: 0;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            [data-paper="true"] { margin: 0 auto; }
          </style>
        </head>

        <body>
          ${clone.outerHTML}

          <script>
            const wait = (ms) => new Promise(r => setTimeout(r, ms));
            window.onload = async () => {
              // CSS бүрэн ачаалагдахад жаахан хугацаа өгнө
              await wait(300);
              window.focus();
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Гэрээний загвар
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Системийн гэрээ, албан бичгийн загваруудыг удирдах, засах
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-sm font-bold"
          >
            <RotateCcw className="w-4 h-4" /> Сэргээх
          </button>

          {/* ✅ SAVE -> Print to PDF */}
          <button
            onClick={handlePrintPdf}
            className="bg-[#005bb7] hover:bg-[#004a96] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" /> Хадгалах
          </button>
        </div>
      </div>

      <div className="flex gap-6 h-[calc(100vh-250px)] min-h-[650px]">
        {/* Left Side: Template List */}
        <aside className="w-72 bg-white border border-slate-200 rounded-2xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-[#005bb7] py-2.5 rounded-xl text-[11px] font-bold transition-all border border-blue-100 uppercase tracking-wider">
              <Plus className="w-4 h-4" /> Шинэ загвар нэмэх
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {templateOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 group ${
                  selectedId === item.id
                    ? 'bg-[#111827] text-white shadow-lg shadow-slate-200'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`w-4 h-4 ${
                      selectedId === item.id
                        ? 'text-[#005bb7]'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  {item.name}
                </div>
                {selectedId === item.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#005bb7]" />
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative shadow-inner">
          {/* Editor Toolbar */}
          <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#005bb7] animate-pulse" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                  Засварлаж буй:
                  <span className="text-[#111827] ml-2">
                    {templateOptions.find((t) => t.id === selectedId)?.name}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 text-slate-400 hover:text-[#005bb7] hover:bg-blue-50 rounded-lg transition-all"
                title="Print Document"
              >
                <Printer className="w-5 h-5" />
              </button>
              <div className="h-6 w-px bg-slate-200 mx-1" />
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                <Type className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Paper Container */}
          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/grid.png')] bg-fixed custom-scrollbar">
            <div className="relative group">
              {/* Paper Shadow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg blur opacity-20 transition duration-1000"></div>

              {/* Actual Paper */}
              <div
                ref={paperRef}
                data-paper="true"
                className="relative w-[750px] min-h-[960px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 p-20 flex flex-col transition-all"
              >
                {/* Document Header */}
                <div className="flex justify-between items-start mb-16 border-b-2 border-[#111827] pb-8">
                  <div>
                    <h2 className="text-3xl font-serif font-black tracking-tighter text-[#111827] uppercase leading-none">
                      {templateOptions.find((t) => t.id === selectedId)?.name}
                    </h2>
                    <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.3em] font-bold">
                      DocSprint • Албан ёсны баримт бичиг
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-14 h-14 bg-[#111827] rounded-xl flex items-center justify-center text-white shadow-xl shadow-slate-200 transition-transform hover:rotate-3">
                      <FileText
                        className="w-7 h-7 text-[#005bb7]"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                </div>

                {/* Main Textarea Area */}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="flex-1 w-full bg-transparent outline-none resize-none font-serif text-[16px] leading-[1.8] text-slate-800 placeholder:text-slate-300"
                  placeholder="Гэрээний агуулгыг энд бичнэ үү..."
                  spellCheck={false}
                />

                {/* Footer Placeholder */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-end">
                  <div className="opacity-20 grayscale">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-300" />
                      <div className="space-y-1.5">
                        <div className="w-24 h-2 bg-slate-300 rounded" />
                        <div className="w-16 h-2 bg-slate-300 rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-300 font-bold tracking-[0.2em] uppercase">
                    Нууцлалтай • Хуудас 01
                  </div>
                </div>
              </div>
              {/* end paper */}
            </div>
          </div>
          {/* end paper container */}
        </div>
      </div>
    </div>
  );
}
