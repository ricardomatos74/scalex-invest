import { useEffect, useState } from 'react';
import withAuth from '../../components/withAuth';
import api from '../../services/api';
import { getToken, parseToken } from '../../utils/auth';
import PostCard, { Post } from '../../components/PostCard';
import ProposalModal from '../../components/ProposalModal';
import ProposalList, { Proposal } from '../../components/ProposalList';

function InvestidorDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    api.get('/posts')
      .then((res) => setPosts(res.data))
      .catch(() => setPosts([]));

    const token = getToken();
    const payload = token ? parseToken(token) : null;
    if (payload?.id) {
      setUserId(payload.id);
      api
        .get(`/users/${payload.id}/proposals`)
        .then((res) => setProposals(res.data))
        .catch(() => setProposals([]));
    }
  }, []);

  function refreshProposals() {
    if (!userId) return;
    api
      .get(`/users/${userId}/proposals`)
      .then((res) => setProposals(res.data))
      .catch(() => setProposals([]));
  }

  const hasProposal = (postId: number) =>
    proposals.some(
      (p) => p.postId === postId && ['pendente', 'aceita'].includes(p.status)
    );

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Painel do Investidor</h1>

      <h2 className="text-lg font-semibold mb-2">Oportunidades</h2>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onPropose={() => setSelectedPost(post)}
          disabled={hasProposal(post.id)}
        />
      ))}
      {posts.length === 0 && <p>Nenhuma postagem encontrada.</p>}

      <h2 className="text-lg font-semibold mt-6 mb-2">Minhas Propostas</h2>
      <ProposalList proposals={proposals} posts={posts} />

      {selectedPost && (
        <ProposalModal
          postId={selectedPost.id}
          isOpen={!!selectedPost}
          onClose={() => setSelectedPost(null)}
          onSuccess={refreshProposals}
        />
      )}
    </div>
  );
}

export default withAuth(InvestidorDashboard, ['investidor']);
