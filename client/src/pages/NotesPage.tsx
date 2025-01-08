import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Note, useFetchNotes } from '@/hooks/useFetchNotes';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TransformNotes = {
    title: string;
    description: string;
    link: string;
};

const NotesPage: React.FC = () => {
    const { user } = useUser();
    const { notes, isPending } = useFetchNotes(user?.emailAddresses[0]?.emailAddress || '');
    const [finalNotes, setFinalNotes] = useState<TransformNotes[]>([]);

    const navigate = useNavigate()

    const onNote = () => {
        navigate("/note/add")
    }

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
            <Button
                onClick={onNote}
                className='fixed bottom-6 right-6'>
                Add Note
            </Button>
        </div>



    );
};

export default NotesPage;
