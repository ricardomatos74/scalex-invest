export interface Post {
  id: number;
  title: string;
  content?: string;
  createdAt?: string;
  totalAmount?: number;
  percentageOffered?: number;
  type?: string;
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
      {post.totalAmount !== undefined && (
        <p>Valor: {post.totalAmount}</p>
      )}
      {post.percentageOffered !== undefined && (
        <p>Equity: {post.percentageOffered}%</p>
      )}
      {post.type && <p>Tipo: {post.type}</p>}
    </div>
  );
}
