// --- lib/auth.ts ---
export async function getSession() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('admin-user');
    return user ? { user: JSON.parse(user) } : null;
  }
  return null;
}

export async function signIn(email: string, password: string) {
  if (email === 'admin' && password === '147ABC55') {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-user', JSON.stringify({ email, isAdmin: true }));
    }
    return true;
  }
  return false;
}
