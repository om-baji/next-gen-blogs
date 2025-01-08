import Blogs from '@/components/mainBlogs/Blogs'
import Header from '@/components/mainBlogs/Header'
import SearchBar from '@/components/mainBlogs/SearchBar'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'

const ExpandedBlogs: React.FC = () => {
    const navigate = useNavigate()
    

    const onPublish = () => {
        navigate("/edit")
    }

    return (
        <div className='flex flex-col gap-6 mt-8 md:mt-0'>
            <Header />
            <div className='mt-4 mx-auto md:mx-0'>
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
