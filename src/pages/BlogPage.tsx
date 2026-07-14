import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard.tsx';
import { getBlogPosts, type BlogPost } from '../data/blog.ts';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <section className="bg-primary h-[200px] flex items-center justify-center">
        <h1 className="text-white text-[40px] font-bold">Blog</h1>
      </section>
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-text-light text-lg">Cargando publicaciones…</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-light text-lg">
                No hay publicaciones disponibles por el momento. ¡Vuelve pronto!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
