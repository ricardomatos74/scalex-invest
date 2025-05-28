import { useEffect, useState } from 'react';
import { withAuth } from '../../components/withAuth';
import api from '../../services/api';
import { parseToken, getToken } from '../../utils/auth';

interface Proposal {
  id: number;
  investor: { name?: string } | null;
  amount: number;
  percentageRequested: number;
  status: string;
}

interface Post {
  id: number;
  title: string;
  description?: string;
  totalAmount?: number;
  percentageOffered?: number;
  type?: string;
  status?: string;
  authorId?: number;
}

function EmpresaDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [equity, setEquity] = useState('');
  const [offerType, setOfferType] = useState('UNICO_INVESTIDOR');
  const [showModal, setShowModal] = useState(false);
  const [currentProposals, setCurrentProposals] = useState<Proposal[]>([]);

  const token = getToken();
  const payload = token ? parseToken(token) : null;
  const userId = payload?.userId;

  useEffect(() => {
    api
      .get('/posts')
      .then((res) => {
        const own = res.data.filter((p: Post) => p.authorId === userId);
        setPosts(own);
      })
      .catch(() => setPosts([]));
  }, [userId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/posts', {
        title,
        description,
        totalAmount: Number(amount),
        percentageOffered: Number(equity),
        type: offerType,
      });
      setTitle('');
      setDescription('');
      setAmount('');
      setEquity('');
      setOfferType('UNICO_INVESTIDOR');
      const res = await api.get('/posts');
      const own = res.data.filter((p: Post) => p.authorId === userId);
      setPosts(own);
    } catch {
      // ignore for now
    }
  }

  async function loadProposals(postId: number) {
    try {
      const res = await api.get(`/posts/${postId}/proposals`);
      setCurrentProposals(res.data);
    } catch {
      setCurrentProposals([]);
    }
    setShowModal(true);
  }

  async function handleAccept(id: number) {
    await api.patch(`/propostas/${id}/aceitar`);
    setCurrentProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'aceita' } : p))
    );
  }

  async function handleReject(id: number) {
    await api.patch(`/propostas/${id}/recusar`);
    setCurrentProposals((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'recusada' } : p))
    );
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Dashboard da Empresa</h1>

      <form onSubmit={handleCreate} className="flex flex-col gap-2 max-w-md">
        <input
          type="text"
          placeholder="Título da captação"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Valor desejado"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Percentual de equity"
          value={equity}
          onChange={(e) => setEquity(e.target.value)}
          className="border p-2"
        />
        <select
          value={offerType}
          onChange={(e) => setOfferType(e.target.value)}
          className="border p-2"
        >
          <option value="UNICO_INVESTIDOR">Único investidor</option>
          <option value="MULTIPLOS">Múltiplos</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2">
          Criar postagem
        </button>
      </form>

      <h2 className="text-lg font-semibold mt-8 mb-2">Minhas postagens</h2>
      {posts.map((post) => (
        <div key={post.id} className="border p-4 rounded mb-2">
          <p className="font-semibold">{post.title}</p>
          {post.status && <p>Status: {post.status}</p>}
          <button
            onClick={() => loadProposals(post.id)}
            className="mt-2 bg-gray-200 px-2 py-1"
          >
            Ver propostas
          </button>
        </div>
      ))}
      {posts.length === 0 && <p>Nenhuma postagem.</p>}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-2">Propostas recebidas</h3>
            <button
              className="absolute top-2 right-2"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            {currentProposals.map((prop) => (
              <div key={prop.id} className="border p-2 rounded mb-2">
                <p>Investidor: {prop.investor?.name || prop.id}</p>
                <p>Valor: {prop.amount}</p>
                <p>Percentual: {prop.percentageRequested}%</p>
                <p>Status: {prop.status}</p>
                {prop.status === 'pendente' && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleAccept(prop.id)}
                      className="bg-green-600 text-white px-2 py-1"
                    >
                      Aceitar
                    </button>
                    <button
                      onClick={() => handleReject(prop.id)}
                      className="bg-red-600 text-white px-2 py-1"
                    >
                      Recusar
                    </button>
                  </div>
                )}
              </div>
            ))}
            {currentProposals.length === 0 && (
              <p>Nenhuma proposta encontrada.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(EmpresaDashboard, ['empresa']);
