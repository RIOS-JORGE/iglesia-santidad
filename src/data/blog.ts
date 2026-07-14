export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt?: string;
  content: string;
  image?: string;
}

interface ParsedFrontmatter {
  data: Record<string, string>;
  content: string;
}

function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const frontmatter = match[1];
  const content = match[2].trim();

  const data: Record<string, string> = {};
  for (const line of frontmatter.split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      data[key.trim()] = rest.join(':').trim().replace(/^['"]|['"]$/g, '');
    }
  }

  return { data, content };
}

function formatDate(dateStr: string): string {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return `${date.getDate()} de ${months[date.getMonth()]}, ${date.getFullYear()}`;
}

function extractSlug(filePath: string): string {
  const fileName = filePath.split('/').pop() ?? '';
  return fileName.replace(/\.md$/, '');
}

function buildExcerpt(content: string): string {
  const plain = content
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    .replace(/\[(.+?)\]\(.+?\)/g, '$1')
    .replace(/>\s(.+)/g, '$1')
    .replace(/[*-]\s/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  return plain.length > 150 ? plain.slice(0, 150).trimEnd() + '…' : plain;
}

// Load all markdown posts via Vite's import.meta.glob (build-time)
const modules = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function loadPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [filePath, raw] of Object.entries(modules)) {
    const { data, content } = parseFrontmatter(raw);
    const slug = data.slug || extractSlug(filePath);

    posts.push({
      title: data.title || 'Sin título',
      slug,
      date: data.date ? formatDate(data.date) : '',
      category: data.category || 'General',
      content,
      excerpt: data.excerpt || buildExcerpt(content),
      image: data.image || undefined,
    });
  }

  // Sort by date descending (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.date.split(' de ').reverse().join(' '));
    const dateB = new Date(b.date.split(' de ').reverse().join(' '));
    return dateB.getTime() - dateA.getTime();
  });
}

const postsCache = loadPosts();

export async function getBlogPosts(): Promise<BlogPost[]> {
  return postsCache;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return postsCache.find((p) => p.slug === slug) ?? null;
}
