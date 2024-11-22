import react, { useState } from "react";
import { BlogsSection } from "@/components"

const Blogs = () => {
    const [posts, setPosts] = useState(null)
    const fetchBlogs = async () => {
        try {
        const response = await fetch("http://localhost:3000/blog/getAllBlogs");
        const data = await response.json()
        if(!response.ok) {
            toast.error(data.message);
        }
        setPosts(data.blogs);
        } catch (error) {
            toast.error(data.message)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])
    return (
        <section className="max-container">
            <BlogsSection posts={posts} />
        </section>
    )
}

export default Blogs;