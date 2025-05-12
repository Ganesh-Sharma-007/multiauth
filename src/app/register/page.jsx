'use client';
import { useState } from 'react';
import { registerUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      router.push('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="login-page">
      <form className="glass-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Account</h2>
        <input
          type="text"
          placeholder="Name"
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="form-input"
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="form-input"
        />
        <button type="submit" className="form-button">Register</button>
        
        <div> Already have an account? <Link href="/login">Login</Link>
        
      </div>
      </form>

    </div>
  );
}
