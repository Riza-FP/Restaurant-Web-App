'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // If already logged in, redirect away from login
  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
      router.push('/orders'); // or '/orders' depending on preference
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to previous page (like /orders) if set
      const redirectTo = localStorage.getItem('redirectAfterLogin') || '/menu';
      localStorage.removeItem('redirectAfterLogin');

      router.push(redirectTo);
    } else {
      setMessage('❌ Login failed: ' + data.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🔐 Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}
