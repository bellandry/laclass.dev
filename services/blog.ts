import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';
import "server-only";

export type { BlogPost };

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

// Get all markdown files from the articles directory
const getMarkdownFiles = (): Record<string, string> => {
  const articlesDir = path.join(process.cwd(), 'blog', 'articles');
  const posts: Record<string, string> = {};

  try {
    const files = fs.readdirSync(articlesDir);
    
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const id = file.replace('.md', '');
        const filePath = path.join(articlesDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        posts[id] = content;
      }
    });
  } catch (error) {
    console.error('Error reading markdown files:', error);
  }

  return posts;
};

export const getAllPosts = (): BlogPost[] => {
  const postsRaw = getMarkdownFiles();
  return Object.keys(postsRaw).map(id => parsePost(id, postsRaw[id]));
};

export const getPost = (id: string): BlogPost | null => {
  const postsRaw = getMarkdownFiles();
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