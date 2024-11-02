import React from 'react'
import { BlogCard } from '@/components'

const BlogsSection = ({posts}) => {
  return (
    <section className='h-[100vh]'>
    <h1 className="head-text">Blogs</h1>
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
  )
}

export default BlogsSection