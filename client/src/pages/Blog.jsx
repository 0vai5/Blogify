import react, { useState } from "react";

const Blog = () => {
    const [blog, setBlog] = useState({
        Image: "https://i.ytimg.com/vi/jPl34SsWgq4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCqRiSqAkXB7BlEtJXAnY6Wh3FNLQ",
        title: "React and Snity",
        author: "Ovais Raza",
        content: "hey it is a long blog and it can be done like the way i can doo as i like"
    })
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
                <p>DAte</p>
            </div>
            <div>{blog.content}</div>
        </section>
    )
}

export default Blog;