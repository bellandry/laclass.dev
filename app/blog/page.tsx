import Navbar from "@/components/navbar";
import { getAllPosts } from "@/services/blog";
import BlogIndex from "./client-page";

export default function Page() {
	const allArticles = getAllPosts()

	return (
		<>
      {/* Navbar */}
      <Navbar
        currentRoute={"blog-list"}
      />

			<BlogIndex allArticles={allArticles}  />
		</>
	);
}
