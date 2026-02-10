'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FileText,
  ShieldCheck,
  Briefcase,
  Clock,
  RotateCcw,
  Plus,
  Save,
  Printer,
} from 'lucide-react';

const templateOptions = [
  {
    id: 'employment',
    name: 'Хөдөлмөрийн гэрээ',
    icon: FileText,
    content: `ХӨДӨЛМӨРИЙН ГЭРЭЭ

Энэхүү хөдөлмөрийн гэрээг Монгол Улсын Хөдөлмөрийн тухай хууль болон холбогдох бусад хууль тогтоомжид нийцүүлэн {company} (цаашид “Ажил олгогч” гэх) болон {lastName} {firstName} (цаашид “Ажилтан” гэх) нар харилцан тохиролцож байгууллаа.

НЭГ. ГЭРЭЭНИЙ ҮНДЭСЛЭЛ
1.1. Ажилтан нь {position} албан тушаалд ажиллана.
1.2. Гэрээний хугацаа: Тодорхойгүй хугацаагаар.
1.3. Ажиллах байршил: {workLocation}

ХОЁР. АЖЛЫН ЧИГ ҮҮРЭГ
2.1. Ажилтан нь албан тушаалын тодорхойлолтод заасан чиг үүргийг мэргэжлийн түвшинд хэрэгжүүлнэ.
2.2. Ажилтан нь байгууллагын дотоод журам, ёс зүй, ажлын байрны аюулгүй ажиллагааны шаардлагыг мөрдөнө.

ГУРАВ. АЖЛЫН ЦАГ, АМРАЛТ
3.1. Ажлын цаг: Долоо хоногт 40 цаг, 5 өдөр ажиллана.
3.2. Амралт, чөлөө: Хуульд заасан ээлжийн амралт болон бусад чөлөөг эдэлнэ.

ДӨРӨВ. ЦАЛИН ХӨЛС, УРАМШУУЛАЛ
4.1. Үндсэн цалин: {salary} төгрөг.
4.2. Цалингийн олголт: Сар бүрийн {payDay}-ны өдөр олгоно.

ЗУРГАА. ГЭРЭЭ ЦУЦЛАХ
6.1. Гэрээг хуульд заасан үндэслэл, журмын дагуу цуцална.

ДОЛОО. ЭЦСИЙН ЗААЛТ
7.1. Энэхүү гэрээ нь талууд гарын үсэг зурсан өдрөөс хүчин төгөлдөр болно.

АЖИЛ ОЛГОГЧ: ____________________    ОГНОО: ____________
АЖИЛТАН: {lastName} {firstName}      ОГНОО: ____________`,
  },
  {
    id: 'nda',
    name: 'Нууц хадгалах гэрээ',
    icon: ShieldCheck,
    content: `НУУЦ ХАДГАЛАХ ГЭРЭЭ

Энэхүү гэрээг {company} (цаашид “Тал А” гэх) болон {firstName} {lastName} (цаашид “Тал Б” гэх) нар харилцан тохиролцож байгууллаа.

НЭГ. ТОДОРХОЙЛОЛТ
1.1. “Нууц мэдээлэл” гэж байгууллагын үйл ажиллагаа, санхүү, технологи, код, дата, хэрэглэгч/харилцагчийн мэдээлэл зэрэг нийтэд ил болоогүй мэдээллийг хэлнэ.

ХОЁР. НУУЦЛАЛЫН ҮҮРЭГ
2.1. Тал Б нь Нууц мэдээллийг зөвхөн ажлын хэрэгцээнд ашиглана.
2.2. Тал Б нь Тал А-ийн зөвшөөрөлгүйгээр гуравдагч этгээдэд Нууц мэдээллийг ил болгохгүй.

ДӨРӨВ. ХҮЧИНТЭЙ ХУГАЦАА
4.1. Энэхүү гэрээ нь гарын үсэг зурсан өдрөөс хүчин төгөлдөр бөгөөд харилцаа дууссан тохиолдолд ч нууцлалын үүрэг {ndaDuration} хугацаанд хүчинтэй байна.

ТАЛ А: {company} ____________________  ОГНОО: ____________
ТАЛ Б: {firstName} {lastName} _________  ОГНОО: ____________`,
  },
  {
    id: 'job_desc',
    name: 'Ажлын байрны тодорхойлолт',
    icon: Briefcase,
    content: `АЖЛЫН БАЙРНЫ ТОДОРХОЙЛОЛТ

1. ЕРӨНХИЙ МЭДЭЭЛЭЛ
- Албан тушаал: {position}
- Хэлтэс/Нэгж: {department}
- Шууд удирдлага: {managerName}
- Ажиллах байршил: {workLocation}

2. АЖЛЫН ЗОРИЛГО
2.1. Албан тушаалын үндсэн зорилго нь байгууллагын үйл ажиллагаанд шаардлагатай ажлыг стандартын дагуу, хугацаанд нь, чанартай гүйцэтгэхэд оршино.

3. ҮНДСЭН ЧИГ ҮҮРЭГ
3.1. Өдөр тутмын ажлын төлөвлөгөө, даалгаврыг хэрэгжүүлэх
3.2. Холбогдох баримт бичиг, тайлан, бүртгэлийг хөтлөх

БАТАЛСАН: ____________________  ОГНОО: ____________
ТАНИЛЦСАН: {firstName} {lastName} ____  ОГНОО: ____________`,
  },
  {
    id: 'trial',
    name: 'Туршилтын мэдэгдэл',
    icon: Clock,
    content: `ТУРШИЛТЫН ХУГАЦААГААР АЖИЛЛУУЛАХ ТУХАЙ МЭДЭГДЭЛ

Огноо: {date}
Хүлээн авагч: {lastName} {firstName}

Таныг {company} байгууллагад {position} албан тушаалд туршилтын хугацаагаар ажиллуулах болсныг мэдэгдэж байна.

1. Туршилтын хугацаа: {trialStart} - {trialEnd} (нийт {trialDuration})
2. Ажлын байршил: {workLocation}
3. Үндсэн цалин: {salary} төгрөг

Хүндэтгэсэн,
{company}
Албан тушаал: ____________________
Гарын үсэг: _____________________`,
  },
] as const;

type TemplateId = (typeof templateOptions)[number]['id'];

export default function ContractTemplate() {
  const [selectedId, setSelectedId] = useState<TemplateId>('employment');
  const [content, setContent] = useState<string>(templateOptions[0].content);

  // A4 pagination preview/edit pages
  const [pages, setPages] = useState<string[]>([templateOptions[0].content]);

  // Hidden measure box
  const measureRef = useRef<HTMLDivElement | null>(null);

  // Editable pages wrapper ref
  const editorRef = useRef<HTMLDivElement | null>(null);

  // Print wrapper ref
  const printRef = useRef<HTMLDivElement | null>(null);

  const selectedTemplate = useMemo(
    () => templateOptions.find((t) => t.id === selectedId),
    [selectedId],
  );

  // ✅ Tweak if you see 1–2 lines mismatch
  const PAGE_HEIGHT_PX = 1040;

  const paginate = (text: string) => {
    const el = measureRef.current;
    if (!el) return [text];

    const chunks = text.split(/(\s+)/); // keep spaces
    const result: string[] = [];
    let current = '';

    for (let i = 0; i < chunks.length; i++) {
      const next = current + chunks[i];
      el.textContent = next;

      if (el.scrollHeight > PAGE_HEIGHT_PX) {
        result.push(current.trimEnd());
        current = chunks[i].trimStart();
        el.textContent = current;

        // ultra-long chunk safety
        if (el.scrollHeight > PAGE_HEIGHT_PX) {
          result.push(current);
          current = '';
          el.textContent = '';
        }
      } else {
        current = next;
      }
    }

    if (current.trim().length) result.push(current.trimEnd());
    return result.length ? result : [''];
  };

  // ---- caret preserve helpers (best-effort) ----
  const getCaretGlobalOffset = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const range = sel.getRangeAt(0);
    const anchorNode = sel.anchorNode;
    if (!anchorNode) return null;

    const pageEl = (anchorNode as HTMLElement).closest?.(
      '[data-edit-page="true"]',
    ) as HTMLElement | null;
    if (!pageEl) return null;

    const wrapper = editorRef.current;
    if (!wrapper) return null;

    const pageNodes = Array.from(
      wrapper.querySelectorAll('[data-edit-page="true"]'),
    ) as HTMLElement[];
    const pageIndex = pageNodes.indexOf(pageEl);
    if (pageIndex < 0) return null;

    // caret offset within this page (by range from start of page)
    const preRange = document.createRange();
    preRange.selectNodeContents(pageEl);
    preRange.setEnd(range.endContainer, range.endOffset);
    const caretInPage = preRange.toString().length;

    // global offset = sum(prev pages + separators) + caretInPage
    let global = 0;
    for (let i = 0; i < pageIndex; i++) {
      global += pageNodes[i].innerText.replace(/\u00A0/g, ' ').length;
      global += 2; // we join pages with "\n\n"
    }
    global += caretInPage;

    return global;
  };

  const setCaretByGlobalOffset = (globalOffset: number) => {
    const wrapper = editorRef.current;
    if (!wrapper) return;

    const pagesEls = Array.from(
      wrapper.querySelectorAll('[data-edit-page="true"]'),
    ) as HTMLElement[];

    // build combined length with separators
    let remaining = globalOffset;

    // find page index
    let targetPageIndex = 0;
    for (let i = 0; i < pagesEls.length; i++) {
      const len = pagesEls[i].innerText.replace(/\u00A0/g, ' ').length;
      if (remaining <= len) {
        targetPageIndex = i;
        break;
      }
      remaining -= len;
      // separator between pages
      if (i < pagesEls.length - 1) remaining -= 2;
      targetPageIndex = Math.min(i + 1, pagesEls.length - 1);
    }

    const pageEl = pagesEls[targetPageIndex];
    if (!pageEl) return;

    // walk text nodes to place caret
    const walker = document.createTreeWalker(pageEl, NodeFilter.SHOW_TEXT);
    let node: Node | null = walker.nextNode();
    let offset = remaining;

    while (node) {
      const text = node.textContent ?? '';
      if (offset <= text.length) {
        const range = document.createRange();
        range.setStart(node, Math.max(0, offset));
        range.collapse(true);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        return;
      }
      offset -= text.length;
      node = walker.nextNode();
    }

    // fallback end of page
    pageEl.focus();
  };

  // Update pages whenever content changes
  useEffect(() => {
    setPages(paginate(content));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  const handleSelect = (id: TemplateId) => {
    setSelectedId(id);
    const found = templateOptions.find((t) => t.id === id);
    if (found) setContent(found.content);
  };

  const handleReset = () => {
    const found = templateOptions.find((t) => t.id === selectedId);
    if (found) setContent(found.content);
  };

  const mergePagesFromDom = () => {
    const wrapper = editorRef.current;
    if (!wrapper) return content;

    const nodes = Array.from(
      wrapper.querySelectorAll('[data-edit-page="true"]'),
    ) as HTMLElement[];

    const merged = nodes
      .map((n) => n.innerText.replace(/\u00A0/g, ' ').trimEnd())
      .join('\n\n');

    return merged;
  };

  // Print helper (prints pages)
  const handlePrintPdf = () => {
    if (!printRef.current) return;

    const printWindow = window.open('', '_blank', 'width=1100,height=750');
    if (!printWindow) return;

    const clone = printRef.current.cloneNode(true) as HTMLElement;

    const styles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style'),
    )
      .map((node) => node.outerHTML)
      .join('\n');

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
              font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
            }
            .a4-page { page-break-after: always; break-after: page; }
            .a4-page:last-child { page-break-after: auto; break-after: auto; }
          </style>
        </head>
        <body>
          ${clone.outerHTML}
          <script>
            const wait = (ms) => new Promise(r => setTimeout(r, ms));
            window.onload = async () => {
              await wait(250);
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Гэрээний загвар
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Word шиг A4 олон хуудастай editor (A4 дүүрвэл автоматаар шинэ
            хуудас)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-sm font-bold"
          >
            <RotateCcw className="w-4 h-4" /> Сэргээх
          </button>

          <button
            onClick={handlePrintPdf}
            className="bg-[#005bb7] hover:bg-[#004a96] text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2 active:scale-95"
          >
            <Save className="w-4 h-4" /> PDF болгох
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-6 h-[calc(100vh-250px)] min-h-[650px]">
        {/* Left templates */}
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

        {/* Editor area */}
        <div className="flex-1 flex flex-col bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden relative shadow-inner">
          {/* Toolbar */}
          <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#005bb7] animate-pulse" />
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Засварлаж буй:
                <span className="text-[#111827] ml-2">
                  {selectedTemplate?.name}
                </span>
              </span>
            </div>

            <button
              onClick={handlePrintPdf}
              className="p-2 text-slate-400 hover:text-[#005bb7] hover:bg-blue-50 rounded-lg transition-all"
              title="Print / Save as PDF"
            >
              <Printer className="w-5 h-5" />
            </button>
          </div>

          {/* A4 pages editor (scroll container) */}
          <div className="flex-1 overflow-y-auto p-10 flex justify-center bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/grid.png')] bg-fixed custom-scrollbar">
            <div className="w-full max-w-[1100px] flex justify-center">
              <div className="space-y-10">
                {/* EDITABLE PAGES */}
                <div ref={editorRef} className="space-y-10">
                  {pages.map((p, idx) => (
                    <div
                      key={idx}
                      className="a4-page relative bg-white border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                      style={{ width: '210mm', minHeight: '297mm' }}
                    >
                      <div style={{ padding: '20mm' }}>
                        {/* First page header */}
                        {idx === 0 && (
                          <div className="flex justify-between items-start mb-10 border-b-2 border-[#111827] pb-6">
                            <div>
                              <h2 className="text-3xl font-serif font-black tracking-tighter text-[#111827] uppercase leading-none">
                                {selectedTemplate?.name}
                              </h2>
                              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.3em] font-bold">
                                DocSprint • Албан ёсны баримт бичиг
                              </p>
                            </div>
                            <div className="w-14 h-14 bg-[#111827] rounded-xl flex items-center justify-center shadow-xl shadow-slate-200">
                              <FileText
                                className="w-7 h-7 text-[#005bb7]"
                                strokeWidth={2.5}
                              />
                            </div>
                          </div>
                        )}

                        {/* The actual editor for this page */}
                        <div
                          data-edit-page="true"
                          contentEditable
                          suppressContentEditableWarning
                          className="whitespace-pre-wrap font-serif text-[16px] leading-[1.8] text-slate-800 outline-none"
                          style={{
                            // ✅ page дотор scroll гарахгүй
                            minHeight: 'calc(297mm - 40mm - 40px)',
                            overflow: 'hidden',
                          }}
                          onFocus={() => {
                            // nothing
                          }}
                          onInput={() => {
                            // caret global offset (best-effort)
                            const caret = getCaretGlobalOffset();

                            // merge content from all pages
                            const merged = mergePagesFromDom();
                            setContent(merged);

                            // after react updates pages, restore caret
                            if (caret !== null) {
                              requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                  setCaretByGlobalOffset(caret);
                                });
                              });
                            }
                          }}
                        >
                          {p}
                        </div>

                        {/* Footer */}
                        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-end">
                          <div className="text-[10px] text-slate-300 font-bold tracking-[0.2em] uppercase">
                            Нууцлалтай
                          </div>
                          <div className="text-[10px] text-slate-300 font-bold tracking-[0.2em] uppercase">
                            Хуудас {String(idx + 1).padStart(2, '0')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PRINT TARGET (same pages, non-editable) */}
                <div ref={printRef} className="hidden print:block">
                  {pages.map((p, idx) => (
                    <div
                      key={idx}
                      className="a4-page bg-white"
                      style={{ width: '210mm', minHeight: '297mm' }}
                    >
                      <div style={{ padding: '20mm' }}>
                        {idx === 0 && (
                          <div className="flex justify-between items-start mb-10 border-b-2 border-[#111827] pb-6">
                            <div>
                              <h2 className="text-3xl font-serif font-black tracking-tighter text-[#111827] uppercase leading-none">
                                {selectedTemplate?.name}
                              </h2>
                              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-[0.3em] font-bold">
                                DocSprint • Албан ёсны баримт бичиг
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap font-serif text-[16px] leading-[1.8] text-slate-800">
                          {p}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ✅ Hidden measure node (A4 inner box) */}
              <div className="absolute -left-[99999px] top-0">
                <div
                  ref={measureRef}
                  className="font-serif text-[16px] leading-[1.8] whitespace-pre-wrap"
                  style={{ width: '210mm', padding: '20mm' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
