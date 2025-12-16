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
		<>
			<BlogPage post={post} relatedPosts={relatedPosts} />
		</>
	);
}
