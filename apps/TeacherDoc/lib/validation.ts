export function validatePassword(password: string): {
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
