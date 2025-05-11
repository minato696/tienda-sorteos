// --- app/login/page.tsx ---
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const success = await signIn(email, password);
    if (!success) {
      alert('Credenciales incorrectas');
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo" className="w-full p-2 border mb-3" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Contraseña" className="w-full p-2 border mb-3" />
        <button onClick={handleLogin} className="bg-blue-600 text-white w-full p-2">Ingresar</button>
      </div>
    </div>
  );
}
