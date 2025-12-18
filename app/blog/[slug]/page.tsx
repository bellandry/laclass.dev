import Navbar from '@/components/navbar';
import { getPost, getRelatedPosts } from '@/services/blog';
import type { Metadata } from "next";
import BlogPage from "./client-page";

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = getPost(slug);

	if (!post) {
		return {
			title: "Article Not Found",
		};
	}

	const url = `https://laclass.dev/blog/${slug}`;

	return {
		title: `${post.title}`,
		description: post.excerpt,
		keywords: [post.keywords, "software engineering", "web development", "programming"],
		authors: [{ name: "Landry Bella" }],
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			url,
			siteName: "Laclass Dev ",
			images: [
				{
					url: post.image,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			],
			publishedTime: post.date,
			authors: ["Landry Bella"],
			tags: [post.tag],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
			images: [post.image],
		},
		alternates: {
			canonical: url,
		},
	};
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
    const post = getPost(slug);
    const relatedPosts = post ? getRelatedPosts(slug) : [];

	// Generate JSON-LD structured data
	const jsonLd = post ? {
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": post.title,
		"description": post.excerpt,
		"image": post.image,
		"datePublished": post.date,
		"author": {
			"@type": "Person",
			"name": "Landry Bella",
			"url": "https://laclass.dev"
		},
		"publisher": {
			"@type": "Person",
			"name": "Landry Bella",
			"url": "https://laclass.dev"
		},
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": `https://laclass.dev/blog/${slug}`
		},
		"articleSection": post.tag,
		"keywords": post.tag
	} : null;

	return (
		<>
			{/* JSON-LD Structured Data */}
			{jsonLd && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			)}
			
			{/* Navbar */}
			<Navbar currentRoute={"blog-post"} />
			<BlogPage post={post} relatedPosts={relatedPosts} />
		</>
	);
}
