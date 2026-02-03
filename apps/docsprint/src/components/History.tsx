export default function History() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Үйлдлийн түүх</h2>

      <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
        {[
          {
            date: '2024-01-01',
            action: 'Шинэ ажилтан бүртгэлээ',
            user: 'Г. Батбаяр',
          },
          {
            date: '2024-01-10',
            action: 'Мэдээлэлд өөрчлөлт оруулсан',
            user: 'Систем',
          },
        ].map((item, idx) => (
          <div key={idx} className="relative pl-8 group">
            <div className="absolute left-0 top-2 w-5 h-5 bg-white border-2 border-indigo-500 rounded-full z-10 group-hover:scale-125 transition-transform"></div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                  {item.date}
                </span>
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 font-medium">
                  Дууссан
                </span>
              </div>
              <p className="text-slate-800 font-semibold">{item.action}</p>
              <p className="text-sm text-slate-500 mt-1">
                Гүйцэтгэсэн: {item.user}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
