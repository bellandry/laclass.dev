# 🚀 Laclass.dev - Personal Portfolio & Blog

A modern, high-performance portfolio website built with Next.js 16, featuring a technical blog, project showcase, and comprehensive SEO optimization.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88CE02?style=flat-square&logo=greensock)](https://greensock.com/gsap/)

## ✨ Features

### 🎨 Design & UX
- **Cinematic Animations**: GSAP-powered scroll animations and transitions
- **Custom Cursor**: Interactive custom cursor with smooth following
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Dark Theme**: Sleek dark mode with cyan accents
- **Noise Overlay**: Subtle texture for visual depth

### 📝 Blog System
- **Markdown-Based**: Write articles in pure markdown with frontmatter
- **Syntax Highlighting**: Code blocks with Prism.js integration
- **Dynamic Routing**: Server-side rendering for optimal SEO
- **Table of Contents**: Auto-generated TOC with active section tracking
- **Related Posts**: Smart recommendation system based on tags
- **Category Filtering**: Filter articles by technology/topic

### 🎯 Portfolio Sections
- **Hero**: Eye-catching introduction with parallax effects
- **About**: Professional background and expertise
- **Experience**: Timeline of work history with animations
- **Skills**: Technology stack with marquee animations
- **Projects**: Interactive project cards with modals
- **Contact**: Get in touch section

### 🔍 SEO Optimization
- **Comprehensive Metadata**: Open Graph, Twitter Cards, structured data
- **JSON-LD Schema**: Person and Article schemas for rich snippets
- **Dynamic Sitemaps**: Auto-generated sitemaps for all pages
- **Robots.txt**: Optimized crawling configuration
- **Semantic HTML**: Proper heading hierarchy and ARIA attributes
- **Performance**: Optimized for Core Web Vitals

## 🛠️ Tech Stack

### Core
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP 3.14](https://greensock.com/gsap/)

### Libraries
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Geist Sans & Geist Mono
- **AI Integration**: Google Generative AI

### Development
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm/yarn/pnpm

## 📁 Project Structure

```
laclass.dev/
├── app/                      # Next.js App Router
│   ├── blog/                 # Blog section
│   │   ├── [slug]/          # Dynamic blog post pages
│   │   ├── client-page.tsx  # Blog listing (client)
│   │   ├── page.tsx         # Blog listing (server)
│   │   └── sitemap.ts       # Blog sitemap
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Homepage (server)
│   ├── page-client.tsx      # Homepage (client)
│   └── sitemap.ts           # Global sitemap
├── blog/
│   └── articles/            # Markdown blog posts
│       ├── leadership.md
│       ├── react-performances.md
│       └── scaling-nodejs.md
├── components/              # React components
│   ├── blog/               # Blog-specific components
│   │   ├── blog-card.tsx
│   │   ├── code-block.tsx
│   │   └── markdown-parser.tsx
│   ├── projects/           # Project components
│   ├── about.tsx
│   ├── contact.tsx
│   ├── experience.tsx
│   ├── hero.tsx
│   ├── navbar.tsx
│   └── skills.tsx
├── services/               # Business logic
│   └── blog.ts            # Blog data fetching
├── types/                 # TypeScript types
│   └── blog.ts
├── constants/             # App constants
├── public/               # Static assets
│   └── robots.txt
└── package.json

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/laclass.dev.git
   cd laclass.dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📝 Adding Blog Posts

Create a new markdown file in `blog/articles/`:

```markdown
---
title: Your Article Title
excerpt: A brief description of your article
author: Your Name
date: Dec 17, 2024
tag: Technology
image: https://example.com/image.jpg
---

# Your Article Title

Your content here...
```

The article will automatically appear in the blog listing!

## ⚙️ Configuration

### SEO Settings

Update the following in `app/layout.tsx`:
- Google verification code
- Social media URLs
- Twitter handle
- Open Graph images

### Blog Settings

Modify `services/blog.ts` to customize:
- Related posts algorithm
- Frontmatter parsing
- Post filtering

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme.

### Fonts
Update font imports in `app/layout.tsx`.

### Animations
Modify GSAP timelines in component files.

## 📊 SEO Features

- ✅ Dynamic metadata generation
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card optimization
- ✅ JSON-LD structured data
- ✅ Automatic sitemap generation
- ✅ Robots.txt configuration
- ✅ Semantic HTML structure
- ✅ Mobile-first responsive design

## 🔗 Links

- **Live Site**: [https://laclass.dev](https://laclass.dev)
- **Blog**: [https://laclass.dev/blog](https://laclass.dev/blog)
- **Sitemap**: [https://laclass.dev/sitemap.xml](https://laclass.dev/sitemap.xml)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Landry Bella**
- Website: [laclass.dev](https://laclass.dev)
- GitHub: [@landrybella](https://github.com/landrybella)
- LinkedIn: [landrybella](https://linkedin.com/in/landrybella)
- Twitter: [@landrybella](https://twitter.com/landrybella)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- GSAP for powerful animations
- The open-source community

---

**Built with ❤️ using Next.js 16**
