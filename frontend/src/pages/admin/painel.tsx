import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';
import api from '../../services/api';
import AnalyticsCard from '../../components/AnalyticsCard';
import ProposalTable, { Proposal } from '../../components/ProposalTable';
import NegotiationTable, { Negotiation } from '../../components/NegotiationTable';

interface Analytics {
  totalCompanies: number;
  totalInvestors: number;
  totalPosts: number;
  proposals: { pending: number; accepted: number; rejected: number };
  negotiations: number;
  totalInvested: number;
  totalCommission: number;
}

interface Post {
  id: number;
  title: string;
  author?: { name?: string } | null;
}

function AdminPainel() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postFilter, setPostFilter] = useState('');

  useEffect(() => {
    api.get('/admin/analytics').then((res) => setAnalytics(res.data)).catch(() => setAnalytics(null));
    api.get('/admin/proposals').then((res) => setProposals(res.data)).catch(() => setProposals([]));
    api.get('/admin/negotiations').then((res) => setNegotiations(res.data)).catch(() => setNegotiations([]));
    api.get('/admin/posts').then((res) => setPosts(res.data)).catch(() => setPosts([]));
  }, []);

  if (!analytics) return <p>Carregando...</p>;

  const filteredPosts = posts.filter((p) =>
    p.title.toLowerCase().includes(postFilter.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Painel Admin</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <AnalyticsCard title="Empresas" value={analytics.totalCompanies} />
        <AnalyticsCard title="Investidores" value={analytics.totalInvestors} />
        <AnalyticsCard title="Postagens" value={analytics.totalPosts} />
        <AnalyticsCard title="Propostas pendentes" value={analytics.proposals.pending} />
        <AnalyticsCard title="Propostas aceitas" value={analytics.proposals.accepted} />
        <AnalyticsCard title="Propostas recusadas" value={analytics.proposals.rejected} />
        <AnalyticsCard title="Negociações" value={analytics.negotiations} />
        <AnalyticsCard title="Total investido" value={`$${analytics.totalInvested}`} />
        <AnalyticsCard title="Comissões" value={`$${analytics.totalCommission}`} />
      </div>
      <ProposalTable proposals={proposals} />
      <NegotiationTable negotiations={negotiations} />
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Postagens</h2>
        <input
          placeholder="Filtrar"
          value={postFilter}
          onChange={(e) => setPostFilter(e.target.value)}
          className="border p-2 mb-2"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Título</th>
                <th className="border px-2 py-1">Autor</th>
                <th className="border px-2 py-1">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="text-center">
                  <td className="border px-2 py-1">{post.title}</td>
                  <td className="border px-2 py-1">{post.author?.name || post.id}</td>
                  <td className="border px-2 py-1">
                    <button disabled className="text-xs bg-gray-300 px-2 py-1 cursor-not-allowed">Destacar postagem</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminPainel, ['admin']);
