import { useState } from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';

export default function SignInForm() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ' ',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Утасны дугаар оруулна уу';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Нууц үг оруулна уу';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setLoading(true);
    //Yg ene hesegt db ruu nemdeg logic orj irne e.g axiosInstance
    setLoading(false);
  };
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => {
      return { ...prev, [field]: value };
    });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <FormButton loading={loading}>Нэвтрэх</FormButton>
    </form>
  );
}
