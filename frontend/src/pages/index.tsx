import { useEffect, useState } from 'react';

export default function Home() {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status === 'ok' ? 'ok' : 'error');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      {status === 'loading' && <p className="text-gray-500">Carregando...</p>}
      {status === 'ok' && <p className="text-green-600">API online ✅</p>}
      {status === 'error' && <p className="text-red-600">API offline ❌</p>}
    </main>
  );
}
