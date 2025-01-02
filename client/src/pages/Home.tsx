import React from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useMediaQuery } from "react-responsive"
import Navbar from '@/components/Navbar'


const Home: React.FC = () => {
  const isLarge = useMediaQuery({ query: "(min-width: 1024px)" })
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
        {!isLarge && <Navbar />}
        <div className='flex justify-center items-center h-screen'>
          Recent Blogs
        </div>
      </ResizablePanel>
      <ResizableHandle />
      {isLarge && (
        <ResizablePanel>
          <div className='flex justify-center items-center h-screen'>
            Recent Notes
          </div>
        </ResizablePanel>
      )}
    </ResizablePanelGroup>
  )
}

export default Home
