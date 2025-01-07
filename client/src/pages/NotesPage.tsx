import { HoverEffect } from '@/components/ui/card-hover-effect'
import { Note, useFetchNotes } from '@/hooks/useFetchNotes'
import { useUser } from '@clerk/clerk-react'
import { Loader2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'

type TransformNotes = {
    title: string,
    description: string,
    link: string;
}

const NotesPage: React.FC = () => {

    const { user,isLoaded } = useUser()
    if(!isLoaded) {
        return <div>
            <Loader2 />
        </div>
    }
    const { notes, isPending } = useFetchNotes(user?.emailAddresses[0].emailAddress as string)

    const [finalNotes, setFinalNotes] = useState<TransformNotes[]>([])


    const transformNotes = useCallback((notes: Note[] = []) => {

        const filtered: TransformNotes[] = notes.map((note) => {
            return {
                title: note.title,
                description: note.content,
                link: `/${note.userId}?id=${note.id}`
            } as TransformNotes;
        })

        setFinalNotes(filtered)

    }, [])

    useEffect(() => {
        transformNotes(notes)
    }, [transformNotes])

    if (isPending) {
        return <div>
            <Loader2 />
        </div>
    }
    return (
        <div>
            <HoverEffect items={finalNotes} />
        </div>
    )
}

export default NotesPage
