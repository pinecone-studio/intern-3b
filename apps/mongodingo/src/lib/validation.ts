export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string) {
  return password.length >= 6;
}

export function validatePasswordsMatch(p1: string, p2: string) {
  return p1 === p2;
}
