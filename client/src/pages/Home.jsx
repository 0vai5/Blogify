import react, { useEffect, useState } from "react";
import { FeaturedBlogs, BlogsSection, WelcomeText } from "@/components"
import toast, { Toaster } from "react-hot-toast";

const Home = ({ setUser, setIsLoggedIn }) => {
    const [posts, setPosts] = useState(null);
    const fetchBlogs = async () => {
        try {
            const response = await fetch("http://localhost:3000/blog/getAllBlogs");
            const data = await response.json();
            if (!response.ok) {
                toast.error(data.message);
            } else {
                setPosts(data.blogs);
                if (data.user) {
                    setUser(data.user);
                    setIsLoggedIn(true);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <main className="max-container">
            <Toaster reverseOrder={false} position="top-right" />
            <WelcomeText />
            <FeaturedBlogs posts={posts} />
            <BlogsSection posts={posts}/>
        </main>
    )
}

export default Home