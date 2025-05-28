export interface Post {
  id: number;
  title: string;
  content?: string;
  createdAt?: string;
  companyName?: string;
  totalAmount?: number;
  percentageOffered?: number;
  type?: string;
}

interface PostCardProps {
  post: Post;
  onPropose?: () => void;
  disabled?: boolean;
}

export default function PostCard({ post, onPropose, disabled }: PostCardProps) {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
      {post.companyName && <p className="mb-1">Empresa: {post.companyName}</p>}
      {post.totalAmount !== undefined && (
        <p>Valor: {post.totalAmount}</p>
      )}
      {post.percentageOffered !== undefined && (
        <p>Equity: {post.percentageOffered}%</p>
      )}
      {post.type && <p>Tipo: {post.type}</p>}
      {onPropose && (
        <button
          onClick={onPropose}
          disabled={disabled}
          className="mt-2 bg-blue-600 text-white p-2 disabled:opacity-50"
        >
          Fazer proposta
        </button>
      )}
    </div>
  );
}
