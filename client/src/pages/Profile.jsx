import react, { useState } from "react";
import { BlogCard } from "@/components"

const Profile = () => {
    const [posts, setPosts] = useState(null)
    return (
        <section className="max-container">
            <div className="flex items-center justify-start gap-4">
                <img src="/user.svg" alt="userDP" height={"150px"} width={"150px"} className="rounded-full" />
                <div>
                    <h1 className="subhead-text">Username</h1>
                    <p className=" text-lg  text-slate-600/50">example@example.com</p>
                </div>
            </div>
            <section>
                <h1 className="subhead-text">My Blogs</h1>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-5">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))
                    ) : (
                        <p>No featured blogs available.</p>
                    )}
                </div>
            </section>
        </section>    
    )
}

export default Profile