export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLoginForm({ email, password }) {
  const errors = {};
  if (!email) errors.email = 'Email is required.';
  else if (!validateEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Password is required.';
  return errors;
}

export function validateRegisterForm({ name, email, password, rollNo }) {
  const errors = {};
  if (!name) errors.name = 'Full name is required.';
  if (!rollNo) errors.rollNo = 'Roll number is required.';
  if (!email) errors.email = 'Email is required.';
  else if (!validateEmail(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
}
