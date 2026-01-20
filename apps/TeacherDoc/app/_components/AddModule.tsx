'use client';
import { useState } from 'react';
import { Button } from '@intern-3b/shadcn';

interface Props {
  onAdd: (newModule: any) => void;
}

export default function AddModuleForm({ onAdd }: Props) {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormComplete = name && subject && grade && term;

  const handleSubmit = async () => {
    if (!isFormComplete) return;
    setLoading(true);

    try {
      const res = await fetch('/api/module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          lessonId: subject,
          gradeId: grade,
          semesterId: term,
        }),
      });

      if (!res.ok) throw new Error('Failed to add module');

      const data = await res.json();
      console.log(data)
      onAdd(data);

      
      setName('');
      setSubject('');
      setGrade('');
      setTerm('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded shadow mb-6 space-y-4">
      <input
        type="text"
        placeholder="Хичээлийн нэр"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Хичээл сонгоно...</option>
        <option value="math">Математик</option>
        <option value="mongolian">Монгол хэл</option>
        <option value="literature">Уран зохиол</option>
      </select>

      <select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Анги сонгоно...</option>
        <option value="1">1-р анги</option>
        <option value="2">2-р анги</option>
         <option value="3">3-р анги</option>
        <option value="4">4-р анги</option>
         <option value="5">5-р анги</option>
        <option value="6">6-р анги</option>
         <option value="7">7-р анги</option>
        <option value="8">8-р анги</option>
        <option value="9">9-р анги</option>
         <option value="10">10-р анги</option>
          <option value="11">11-р анги</option>
           <option value="12">12-р анги</option>
      </select>

      <select
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="">Улирал сонгоно...</option>
        <option value="1">1-р улирал</option>
        <option value="2">2-р улирал</option>
          <option value="3">3-р улирал</option>
      </select>

      <Button onClick={handleSubmit} disabled={!isFormComplete || loading}>
        {loading ? 'Нэмэгдэж байна...' : 'Нэмэх'}
      </Button>
      
    </div>
  );
}
