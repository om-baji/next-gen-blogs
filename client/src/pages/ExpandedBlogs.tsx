import Blogs from '@/components/mainBlogs/Blogs'
import Header from '@/components/mainBlogs/Header'
import SearchBar from '@/components/mainBlogs/SearchBar'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

const ExpandedBlogs: React.FC = () => {
    const navigate = useNavigate()

    const onPublish = () => {
        navigate("/edit")
    }

    return (
        <div className='flex flex-col gap-6'>
            <Header />
            <div className='mt-4'>
                <SearchBar />
            </div>
            <Blogs />
            <div className='fixed bottom-6 right-6'>
                <Button
                onClick={onPublish}
                >Publish</Button>
            </div>
        </div>
    )
}

export default ExpandedBlogs
