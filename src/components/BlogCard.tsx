import { Link } from 'react-router-dom';

interface Props {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt?: string;
  image?: string;
}

export default function BlogCard({ title, slug, date, category, excerpt, image }: Props) {
  return (
    <Link to={`/blog/${slug}`} className="block">
      <article className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow h-full">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
        )}
        <span className="inline-block bg-accent text-primary text-xs font-semibold px-3 py-1 rounded-full">
          {category}
        </span>
        <h3 className="text-[22px] font-bold text-primary mt-3">{title}</h3>
        {excerpt && (
          <p className="text-[15px] text-text-body mt-2 leading-relaxed">{excerpt}</p>
        )}
        <p className="text-text-light text-sm mt-4">{date}</p>
      </article>
    </Link>
  );
}
