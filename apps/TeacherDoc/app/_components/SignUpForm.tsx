'use client';

import type React from 'react';

import { useState } from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';

export function ValidatePassword(password: string): {
  isValid: boolean;
  error?: string;
} {
  // Must be at least 8 characters
  if (password.length < 8) {
    return {
      isValid: false,
      error: 'Нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой',
    };
  }

  // Must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: 'Нууц үг том үсэг агуулсан байх ёстой',
    };
  }

  // Must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: 'Нууц үг жижиг үсэг агуулсан байх ёстой',
    };
  }

  // Must contain at least one number
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: 'Нууц үг тоо агуулсан байх ёстой',
    };
  }

  // Must contain at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return {
      isValid: false,
      error: 'Нууц үг тусгай тэмдэгт агуулсан байх ёстой (!@#$%...)',
    };
  }

  return { isValid: true };
}

export function SignUpForm() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    password: '',
    schoolId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Нэр оруулна уу';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Утасны дугаар оруулна уу';
    }
    if (!formData.schoolId.trim()) {
      newErrors.schoolId = 'Сургуулийн ID оруулна уу';
    }

    const passwordValidation = ValidatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error || '';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Sign up:', formData);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormInput
        label="Нэр"
        type="text"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        error={errors.name}
        placeholder="Бүтэн нэрээ оруулна уу"
      />

      <FormInput
        label="Утасны дугаар"
        type="tel"
        value={formData.phoneNumber}
        onChange={(value) => handleChange('phoneNumber', value)}
        error={errors.phoneNumber}
        placeholder="99119911"
      />

      <FormInput
        label="Нууц үг"
        type="password"
        value={formData.password}
        onChange={(value) => handleChange('password', value)}
        error={errors.password}
        placeholder="••••••••"
      />

      <FormInput
        label="Сургуулийн ID"
        type="text"
        value={formData.schoolId}
        onChange={(value) => handleChange('schoolId', value)}
        error={errors.schoolId}
        placeholder="SCH123456"
      />

      <FormButton loading={loading}>Бүртгүүлэх</FormButton>
    </form>
  );
}
