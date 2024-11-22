import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Blog = () => {
    const [blog, setBlog] = useState(null);
    const location = useLocation();

    const fetchBlog = async () => {
        const { BlogID } = getQueryParams();
        const response = await fetch("http://localhost:3000/blog/getBlog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ BlogID }), // Send BlogID as part of the request body
        });

        if (response.ok) {
            const data = await response.json();
            setBlog(data);
        } else {
            console.error("Failed to fetch blog data");
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [location.search]); // Re-fetch if the query params change

    if (!blog) return <p>Loading...</p>;

    return (
        <section className="max-container">
            <div>
                <img 
                    src={blog.Image} 
                    alt={blog.title}
                    height={"200px"}
                    width={"100%"}
                    className="bg-contain bg-center"
                />
            </div>
            <div>
                <h1 className="subhead-text">{blog.title}</h1>
            </div>
            <div className="flex justify-between items-center">
                <p>{blog.author}</p>
                <p>Date</p>
            </div>
            <div>{blog.content}</div>
        </section>
    );
};

export default Blog;
