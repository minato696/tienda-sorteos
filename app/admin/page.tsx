// app/admin/page.tsx
import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirigir al dashboard
  redirect('/admin/dashboard');
}