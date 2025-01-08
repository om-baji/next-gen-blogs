import { useSingleBlog } from '@/hooks/useSingleBlog'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SingleBlog: React.FC = () => {

    const [query] = useSearchParams()
    const id = query.get('id')

    const { blog, isLoading, error } = useSingleBlog(id as string)

    if(isLoading) {
        return <div>
            <Loader2 className='animate-spin'/>
        </div>
    }

    if(error) {
        return <div>
            {error}
        </div>
    }

    return (
        <div>
            
        </div>
    )
}

export default SingleBlog
