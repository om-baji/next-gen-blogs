import Blogs from '@/components/mainBlogs/Blogs'
import Header from '@/components/mainBlogs/Header'
import SearchBar from '@/components/mainBlogs/SearchBar'
import React from 'react'

const ExpandedBlogs: React.FC = () => {
    return (
        <div className='flex flex-col gap-6'>
            <Header />
            <div className='mt-4'>
                <SearchBar />
            </div>
            <div 
            onClick={() => console.log("worked")}
            className='p-6'>
                <Blogs />
            </div>

        </div>
    )
}

export default ExpandedBlogs
