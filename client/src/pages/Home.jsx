import react, { useState } from "react";
import { FeaturedBlogs, BlogsSection, WelcomeText } from "@/components"

const Home = () => {
    const [posts, setPosts] = useState(null)
    return (
        <main className="max-container">
            <WelcomeText />
            <FeaturedBlogs posts={posts} />
            <BlogsSection posts={posts}/>
        </main>
    )
}

export default Home