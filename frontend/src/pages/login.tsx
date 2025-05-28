import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import { setToken, setRole, parseToken, getDashboardRoute } from '../utils/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      setToken(token);
      const payload = parseToken(token);
      if (payload?.role) {
        setRole(payload.role);
        router.push(getDashboardRoute(payload.role));
      } else {
        router.push('/');
      }
    } catch (err) {
      setError('Credenciais inválidas');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2">
          Entrar
        </button>
      </form>
    </div>
  );
}
