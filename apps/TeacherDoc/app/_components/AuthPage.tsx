

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'manager' | 'teacher';

export default function AuthPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('manager');
  const [schoolCode, setSchoolCode] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    // 🔹 TEST USERS
    const manager =
      role === 'manager' &&
      schoolCode === 'SCH23' &&
      phone === '99001234' &&
      password === 'pass123';

    const teacher =
      role === 'teacher' &&
      schoolCode === 'SCH23' &&
      phone === '99005678' &&
      password === 'pass123';

    if (manager || teacher) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          role,
          isLoggedIn: true,
        })
      );

      router.push('/');
    } else {
      setError('Нэвтрэх мэдээлэл буруу');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">

        <h1 className="text-2xl font-bold text-center mb-6">
          Нэвтрэх
        </h1>

        {/* ROLE SWITCH */}
        <div className="flex mb-4 gap-2">
          <button
            onClick={() => setRole('manager')}
            className={`flex-1 py-2 rounded-xl font-semibold ${
              role === 'manager'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            Manager
          </button>

          <button
            onClick={() => setRole('teacher')}
            className={`flex-1 py-2 rounded-xl font-semibold ${
              role === 'teacher'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100'
            }`}
          >
            Teacher
          </button>
        </div>

        {/* INPUTS */}
        <div className="space-y-3">
          <input
            placeholder="School code"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setSchoolCode(e.target.value)}
          />

          <input
            placeholder="Phone"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full border p-2 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="mt-6 w-full bg-emerald-600 text-white py-2 rounded-xl font-bold"
        >
          Нэвтрэх
        </button>

        {/* TEST INFO */}
        <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p className="font-semibold mb-1">Туршилтын аккаунт</p>
          <p>Manager: SCH23 / 99001234 / pass123</p>
          <p>Teacher: SCH23 / 99005678 / pass123</p>
        </div>
      </div>
    </div>
  );
}
