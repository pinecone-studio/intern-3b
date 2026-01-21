'use client';
import { useState } from 'react';
import { Button } from '@intern-3b/shadcn';
import { Plus } from 'lucide-react';

interface Props {
  moduleId: string;
  onAdd: (newSub: any) => void;
}

export default function AddSubModuleForm({ moduleId, onAdd }: Props) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name) return;
    setLoading(true);

    try {
      const res = await fetch('/api/subModule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, name }),
      });

      if (!res.ok) throw new Error('Failed to add subModule');

      const data = await res.json();
      onAdd(data);
      setName('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (

  <div className="flex items-center gap-2 p-2">
    <div className="flex-1 flex items-center gap-3 bg-[#F8FAFC] rounded-2xl px-4 py-2 border border-dashed border-gray-200 focus-within:border-[#00A378]/50 transition-all">
      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-sm">
         <Plus size={18} className="text-[#00A378]" />
      </div>
      <input
        type="text"
        placeholder="Шинэ дэд сэдэв нэмэх..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-transparent border-none outline-none text-sm font-semibold text-gray-500 placeholder:text-gray-300 w-full"
      />
    </div>
    <button 
      onClick={handleSubmit} 
      disabled={loading || !name}
      className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
        !name ? 'bg-[#E2E8F0] text-gray-400 cursor-not-allowed' : 'bg-[#1E293B] text-white hover:bg-black'
      }`}
    >
      {loading ? '...' : 'Нэмэх'}
    </button>
  </div>
);
}
