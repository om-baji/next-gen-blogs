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
        <div>
            {blogs.length > 0 ? blogs.map((blog) => {
                return <BlogCard
                    title={blog.title}
                    image={blog.image}
                    body={blog.body}
                    id={blog.id} />
            }) : (
                <span>No blogs!</span>
            )}
        </div>
    )
}

export default RecentBlogs
