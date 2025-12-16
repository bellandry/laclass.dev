import Navbar from '@/components/navbar';
import { getPost, getRelatedPosts } from '@/services/blog';
import BlogPage from "./client-page";

interface Props {
	params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
	const { slug } = await params;
    const post = getPost(slug);
    const relatedPosts = post ? getRelatedPosts(slug) : [];

	return (
		<>{/* Navbar */}
      <Navbar
        currentRoute={"blog-post"}
      />
			<BlogPage post={post} relatedPosts={relatedPosts} />
		</>
	);
}
