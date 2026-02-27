'use client';

import { useEffect, useState } from 'react';
import FormInput from '../_components/FormInput';
import FormButton from '../_components/FormButton';

type Teacher = {
  id: string;
  name: string;
  number: number;
  role: string;
};

export default function SchoolPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: '', number: '' });

  // 🟢 Dummy schoolId, хэрвээ auth context ашиглавал session-с авна
  const schoolId = 'SCHOOL_ID_HERE';

  useEffect(() => {
    // School-ийн багш нарын жагсаалтыг авах
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`/api/school/teachers?schoolId=${schoolId}`);
      if (!res.ok) {
        const error = await res.json();
        alert(error.message);
        return;
      }
      const data = await res.json();
      setTeachers(data);
    } catch (err: any) {
      alert('Сервертэй холбогдож чадсангүй: ' + err.message);
    }
  };

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/school/addTeacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newTeacher, schoolId }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message);
      } else {
        alert('Багш амжилттай нэмэгдлээ 🎉');
        setNewTeacher({ name: '', number: '' });
        fetchTeachers();
      }
    } catch (err: any) {
      alert('Сервертэй холбогдож чадсангүй: ' + err.message);
    }

    setLoading(false);
  };

  const handlePromote = async (teacherId: string) => {
    const res = await fetch('/api/school/change-role', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: teacherId, role: 'MANAGER' }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
    } else {
      alert(`${data.name} Manager боллоо 🎉`);
      fetchTeachers();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Сургуулийн dashboard</h1>

      {/* Add Teacher */}
      <form onSubmit={handleAddTeacher} className="mb-8 space-y-3">
        <h2 className="text-xl font-semibold">Шинэ багш нэмэх</h2>
        <FormInput
          label="Нэр"
          type="text"
          value={newTeacher.name}
          onChange={(v) => setNewTeacher((prev) => ({ ...prev, name: v }))}
        />
        <FormInput
          label="Утас"
          type="tel"
          value={newTeacher.number}
          onChange={(v) => setNewTeacher((prev) => ({ ...prev, number: v }))}
        />
        <FormButton loading={loading}>Нэмэх</FormButton>
      </form>

      {/* Teacher List */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Багш нар</h2>
        <table className="w-full border border-slate-300">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 border">Нэр</th>
              <th className="p-2 border">Утас</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr key={t.id} className="text-center border-b">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.number}</td>
                <td className="p-2">{t.role}</td>
                <td className="p-2">
                  {t.role !== 'MANAGER' && (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handlePromote(t.id)}
                    >
                      Manager болгох
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
