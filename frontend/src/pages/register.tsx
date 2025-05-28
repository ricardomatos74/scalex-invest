import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const [role, setRole] = useState('EMPRESA');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password,role });
      router.push('/login');
    } catch (err) {
      setError('Erro ao registrar');
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Cadastro</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
  
                <label htmlFor="role">Tipo de usuário</label>
      <select
        name="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2"
      >
        <option value="EMPRESA">Empresa</option>
        <option value="INVESTIDOR">Investidor</option>
        <option value="ADMIN">Admin</option>
      </select>/>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button type="submit" className="bg-blue-600 text-white p-2">
          Registrar
        </button>
      </form>
    </div>
  );
}
