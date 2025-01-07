import { useFetchNotes } from '@/hooks/useFetchNotes'
import { useAuth } from '@clerk/clerk-react'
import { Loader2 } from 'lucide-react'
import React from 'react'
import NotesCard from './Card'

const RecentNotes: React.FC = () => {
    const { userId, isLoaded } = useAuth()

    const { notes, isPending } = useFetchNotes(userId as string)

    if (!isLoaded) {
        return <div>
            <Loader2 />
        </div>
    }

    return (
        <div className='min-w-[90%]'>
            {isPending ? (
                <span>No Notes</span>
            ) : (notes.length > 0 &&
                notes
                    .slice(0, 6)
                    .map((note) => {
                        return <NotesCard
                            title={note.title}
                            createdAt={note.createdAt}
                            content={note.content}
                            id={note.id} />
                    })
            )}
        </div>
    )
}

export default RecentNotes
