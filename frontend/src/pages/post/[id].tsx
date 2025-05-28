import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Post } from '../../components/PostCard';

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      api
        .get(`/posts/${id}`)
        .then((res) => setPost(res.data))
        .catch(() => setPost(null));
    }
  }, [id]);

  if (!post) return <p>Carregando...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">{post.title}</h1>
      {post.content && <p className="mb-2">{post.content}</p>}
      {post.createdAt && (
        <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
      )}
    </div>
  );
}
