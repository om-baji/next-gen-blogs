import RecentBlogs from '@/components/blogs/RecentBlogs'
import RecentNotes from '@/components/notes/RecentNotes'
import { Button } from '@/components/ui/button'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import React from 'react'
import { useMediaQuery } from "react-responsive"
import { useNavigate } from 'react-router-dom'


const Home: React.FC = () => {
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" })
  const navigate = useNavigate()
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mt-8 md:md-0">
          Trending Posts!
        </h4>
        <div className='flex justify-center items-center p-6'>
          <RecentBlogs />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      {isLarge && (
        <ResizablePanel>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center">
          Recent Notes
          </h4>
          <div className='flex justify-center items-center h-screen'>
            <RecentNotes />
          </div>
        </ResizablePanel>
      )}

      <Button 
      onClick={() => {
        navigate("/note/add")
      }}
      className='fixed bottom-6 right-6'>
        Add Note
      </Button>
    </ResizablePanelGroup>
  )
}

export default Home
