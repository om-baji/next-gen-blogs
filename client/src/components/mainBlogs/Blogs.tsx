import { useFetchBlogs } from '@/hooks/useFetchBlogs'
import React from 'react'
import { Loader2 } from "lucide-react"
import BlogCard from '../blogs/Card'

const Blogs: React.FC = () => {

    const { blogs, isPending } = useFetchBlogs()

    if (isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <Loader2 />
        </div>
    }

    return (
        <div className='p-8 md:max-w-[40%] grid-cols-1 md:grid-cols-3'>
            {blogs.length > 0 ? blogs
                .map((blog) => {
                    return <div className='mt-4'>
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            image={blog.image}
                            body={blog.body}
                            id={blog.id}
                            date={blog.createdAt} />
                    </div>

                }) : (
                <span>No blogs!</span>
            )}
        </div>
    )
}

export default Blogs
