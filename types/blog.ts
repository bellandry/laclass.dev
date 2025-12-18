export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tag: string;
  keywords: string;
  image: string;
  content: string; // The markdown body
}
