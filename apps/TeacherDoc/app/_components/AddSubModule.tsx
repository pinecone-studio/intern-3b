'use client';
import { useState } from 'react';
import { Button } from '@intern-3b/shadcn';

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
    <div className="flex text-black gap-2 mt-2">
      <input
        type="text"
        placeholder="Дэд сэдвийн нэр"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border  rounded px-3 py-2 flex-1"
      />
      <Button onClick={handleSubmit} disabled={loading || !name}>
        {loading ? 'Нэмэгдэж байна...' : 'Нэмэх'}
      </Button>
    </div>
  );
}
