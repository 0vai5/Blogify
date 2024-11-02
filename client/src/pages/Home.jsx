import react, { useState } from "react";
import { FeaturedBlogs } from "@/components"

const Home = () => {
    const [posts, setPosts] = useState(null)
    return (
        <main className="max-container">
            <FeaturedBlogs posts={posts} />
        </main>
    )
}

export default Home