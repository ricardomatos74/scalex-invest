import { Post } from './PostCard';

export interface Proposal {
  id: number;
  postId: number;
  amount: number;
  percentageRequested: number;
  status: string;
  createdAt: string;
}

interface ProposalListProps {
  proposals: Proposal[];
  posts: Post[];
}

export default function ProposalList({ proposals, posts }: ProposalListProps) {
  if (proposals.length === 0) {
    return <p>Nenhuma proposta enviada.</p>;
  }

  const getPostTitle = (id: number) => posts.find((p) => p.id === id)?.title || id;

  return (
    <div className="flex flex-col gap-4">
      {proposals.map((proposal) => (
        <div key={proposal.id} className="border p-4 rounded">
          <p className="font-semibold">Post: {getPostTitle(proposal.postId)}</p>
          <p>Valor: {proposal.amount}</p>
          <p>Equity: {proposal.percentageRequested}%</p>
          <p>Status: {proposal.status}</p>
          <p>
            Enviado em:{' '}
            {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
          </p>
        </div>
      ))}
    </div>
  );
}
