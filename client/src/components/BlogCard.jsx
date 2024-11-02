import react from "react";
import { Button, Card, CardContent, CardFooter, CardTitle } from "@/components";

const BlogCard = ({post}) => {
    return (
        <Card className="w-full p-3">
            <CardTitle>
                <img 
                src={post.image}
                alt={post.title}
                height={"200px"}
                width={"400px"}
                />
            </CardTitle>
            <CardContent>
                <h3 className="text-2xl font-semibold">{post.title}</h3>
                <p className="text-xl">{post.content.substring(0, 300)}...</p>
                <p className="text-gray-100">By. {post.author}</p>
            </CardContent>
            <CardFooter>
                <Button variant="destructive" size="md">Read More</Button>
            </CardFooter>
        </Card>
    )
}

export default BlogCard