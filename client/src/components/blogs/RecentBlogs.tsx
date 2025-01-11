import { useFetchBlogs } from '@/hooks/useFetchBlogs'
import React from 'react'
import { Loader2 } from "lucide-react"
import BlogCard from './Card'

const RecentBlogs: React.FC = () => {

    const { blogs, isPending } = useFetchBlogs()

    if (isPending) {
        return <div className='flex justify-center items-center h-screen'>
            <Loader2 />
        </div>
    }

    return (
        <div className='min-w-[90%] space-y-6 p-4'>
            {blogs.length > 0 ? blogs
                .slice(0, 6)
                .map((blog) => {
                    return <BlogCard
                        key={blog.id}
                        title={blog.title}
                        image={blog.image}
                        body={blog.body}
                        id={blog.id}
                        date={blog.createdAt} />
                }) : (
                <span>No blogs!</span>
            )}
        </div>
    )
}

export default RecentBlogs
