import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogPost, type BlogPost } from '../data/blog.ts';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    getBlogPost(slug).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [slug]);

  const htmlContent = useMemo(() => {
    if (!post) return '';
    const rawHtml = marked.parse(post.content, { async: false }) as string;
    return DOMPurify.sanitize(rawHtml);
  }, [post]);

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <p className="text-text-body text-lg">Cargando publicación…</p>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-3xl font-bold text-primary">Publicación no encontrada</h1>
        <p className="text-text-body text-lg text-center">
          La publicación que buscas no existe o ha sido eliminada.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-accent hover:text-primary font-semibold transition-colors"
        >
          ← Volver al blog
        </Link>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-white font-semibold transition-colors mb-6"
          >
            ← Volver al blog
          </Link>
          <span className="inline-block bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="text-white text-[36px] md:text-[44px] font-bold leading-tight">
            {post.title}
          </h1>
          <p className="text-white/70 mt-4">{post.date}</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-xl mb-10"
            />
          )}

          <div
            className="
              prose prose-lg max-w-none
              [&_h2]:text-primary [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-primary [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:text-text-body [&_p]:leading-relaxed
              [&_blockquote]:border-l-4 [&_blockquote]:border-accent
              [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-text-body
              [&_blockquote]:my-6
              [&_img]:rounded-xl [&_img]:w-full [&_img]:my-6
              [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:text-text-body [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:text-text-body [&_ol]:space-y-2
              [&_li>p]:mb-0
              [&_strong]:text-primary [&_strong]:font-bold
              [&_a]:text-accent [&_a]:underline [&_a:hover]:text-primary
              [&_hr]:border-text-light [&_hr]:my-8
            "
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </section>
    </>
  );
}
