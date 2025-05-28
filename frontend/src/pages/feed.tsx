import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '../services/api';
import PostCard, { Post } from '../components/PostCard';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    api.get('/posts').then((res) => setPosts(res.data)).catch(() => setPosts([]));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Feed</h1>
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="block">
          <PostCard post={post} />
        </Link>
      ))}
      {posts.length === 0 && <p>Nenhum post encontrado.</p>}
    </div>
  );
}
