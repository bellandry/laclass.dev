import Navbar from "@/components/navbar";
import { getAllPosts } from "@/services/blog";
import type { Metadata } from "next";
import BlogIndex from "./client-page";

export const metadata: Metadata = {
	title: "Blog | Landry Bella - Insights & Writings",
	description: "Explore articles on software engineering, leadership, performance optimization, and modern web development. Learn from real-world experiences and technical deep dives.",
	keywords: ["software engineering", "web development", "React", "Node.js", "leadership", "tech blog", "programming"],
	authors: [{ name: "Landry Bella" }],
	openGraph: {
		title: "Blog | Landry Bella - Insights & Writings",
		description: "Explore articles on software engineering, leadership, performance optimization, and modern web development.",
		type: "website",
		url: "https://laclass.dev/blog",
		siteName: "Landry Bella",
		images: [
			{
				url: "https://laclass.dev/og-blog.png",
				width: 1200,
				height: 630,
				alt: "Landry Bella Blog",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog | Landry Bella - Insights & Writings",
		description: "Explore articles on software engineering, leadership, performance optimization, and modern web development.",
		images: ["https://laclass.dev/og-blog.png"],
	},
	alternates: {
		canonical: "https://laclass.dev/blog",
	},
};

export default function Page() {
	const allArticles = getAllPosts()

	return (
		<>
      <Navbar
        currentRoute={"blog-list"}
      />

			<BlogIndex allArticles={allArticles}  />
		</>
	);
}
