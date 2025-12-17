export type Project = {
  title: string;
  category: string;
  year: string;
  image: string | string[]; // Support single image or multiple images
  description: string;
  longDescription: string;
  technologies: string[];
  gitUrl?: string; // Optional GitHub repository URL
  appUrl?: string; // Optional live application URL
};

export type Route = 'home' | 'blog-list' | 'blog-post';

export interface Job {
  company: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
}
