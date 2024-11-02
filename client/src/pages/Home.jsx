import react, { useState } from "react";
import { FeaturedBlogs, BlogsSection } from "@/components"

const Home = () => {
    const [posts, setPosts] = useState(null)
    return (
        <main className="max-container">
            <FeaturedBlogs posts={posts} />
            <BlogsSection posts={posts}/>
        </main>
    )
}

export default Home