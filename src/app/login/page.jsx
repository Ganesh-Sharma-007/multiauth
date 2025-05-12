'use client';
import { useState } from 'react';
import { loginUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      if (res.status === 200) {
        router.push('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <form className="glass-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="form-input"
        />
        <button type="submit" className="form-button">Login</button>
        <div> Create an account? <Link href="/register">Register</Link> </div>

      </form>
    </div>
  );
}
