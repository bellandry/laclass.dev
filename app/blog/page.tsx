import { getAllPosts } from "@/services/blog";
import BlogIndex from "./client-page";

export default function Page() {
	const allArticles = getAllPosts()

	return (
		<>
			<BlogIndex allArticles={allArticles}  />
		</>
	);
}
