export type Project = {
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
  longDescription: string;
  technologies: string[];
};

export type Route = 'home' | 'blog-list' | 'blog-post';

export interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}
