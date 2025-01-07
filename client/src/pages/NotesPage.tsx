import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Note, useFetchNotes } from '@/hooks/useFetchNotes';
import { useUser } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

type TransformNotes = {
    title: string;
    description: string;
    link: string;
};

const NotesPage: React.FC = () => {
    const { user } = useUser();
    const { notes, isPending } = useFetchNotes(user?.emailAddresses[0]?.emailAddress || '');
    const [finalNotes, setFinalNotes] = useState<TransformNotes[]>([]);

    const transformNotes = useCallback((notes: Note[] = []) => {
        const filtered: TransformNotes[] = notes.map((note) => ({
            title: note.title,
            description: note.content,  
            link: `/${note.userId}?id=${note.id}`,
        }));

        setFinalNotes(filtered);
    }, []);

    useEffect(() => {
        transformNotes(notes || []);
    }, [notes, transformNotes]);

    // useEffect(() => {
    //     console.log('Transformed Notes:', finalNotes);
    // }, [finalNotes]);

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 />
            </div>
        );
    }

    return (
        <div className="flex p-4">
            {finalNotes.length > 0 ? (
                <HoverEffect items={finalNotes} />
            ) : (
                <p className="text-gray-500">No notes available.</p>
            )}
        </div>
    );
};

export default NotesPage;
