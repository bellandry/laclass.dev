
import leadership from '@/blog/articles/leadership';
import reactPerf from '../blog/articles/react-performances';
import scalingNode from '../blog/articles/scaling-nodejs';

// Map of all raw post content
const postsRaw: Record<string, string> = {
  'scaling-nodejs': scalingNode,
  'react-performance': reactPerf,
  'leadership': leadership
};

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tag: string;
  image: string;
  content: string; // The markdown body
}

// Helper to parse Frontmatter
const parsePost = (id: string, raw: string): BlogPost => {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!match) {
    // Fallback if formatting fails
    return {
      id,
      title: 'Untitled',
      excerpt: '',
      date: '',
      tag: 'General',
      image: '',
      content: raw
    };
  }

  const frontmatterBlock = match[1];
  const content = match[2];

  const metadata: any = {};
  frontmatterBlock.split('\n').forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value) {
      metadata[key.trim()] = value.join(':').trim();
    }
  });

  return {
    id,
    title: metadata.title || 'Untitled',
    excerpt: metadata.excerpt || '',
    date: metadata.date || '',
    tag: metadata.tag || 'General',
    image: metadata.image || '',
    content
  };
};

export const getAllPosts = (): BlogPost[] => {
  return Object.keys(postsRaw).map(id => parsePost(id, postsRaw[id]));
};

export const getPost = (id: string): BlogPost | null => {
  const raw = postsRaw[id];
  if (!raw) return null;
  return parsePost(id, raw);
};

export const getRelatedPosts = (currentId: string): BlogPost[] => {
  const all = getAllPosts();
  const current = all.find(p => p.id === currentId);
  
  if (!current) return all.slice(0, 2);

  // Filter by same tag, exclude current
  const related = all.filter(p => p.tag === current.tag && p.id !== currentId);
  
  // If not enough related posts, fill with others
  if (related.length < 2) {
    const others = all.filter(p => p.id !== currentId && !related.includes(p));
    return [...related, ...others].slice(0, 2);
  }

  return related.slice(0, 2); // Return top 2 related
};