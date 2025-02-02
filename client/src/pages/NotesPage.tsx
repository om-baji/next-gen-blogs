import { HoverEffect } from '@/components/ui/card-hover-effect';
import { Note, useFetchNotes } from '@/hooks/useFetchNotes';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/utils/axiosInstance';
import { toast } from '@/hooks/use-toast';

type TransformNotes = {
    title: string;
    description: string;
    link: string;
    id : string;
};

const NotesPage: React.FC = () => {
    const { user } = useUser();
    const { notes, isPending } = useFetchNotes(user?.emailAddresses[0]?.emailAddress || '');
    const [finalNotes, setFinalNotes] = useState<TransformNotes[]>([]);

    const navigate = useNavigate()

    const onNote = () => {
        navigate("/note/add")
    }

    const handleDelete = async (idx: number,id : string) => {

        try {
            await axiosInstance.delete(`/notes?id=${id}`)

            toast({
                title : "Note Deleted!"
            })
        } catch (error) {
            toast({
                title : "Something went wrong!",
                description : error instanceof Error ? error.message : error as string
            })
        }
        
        console.log('Deleting item at index:', idx);
      };

    const transformNotes = useCallback((notes: Note[] = []) => {
        const filtered: TransformNotes[] = notes.map((note) => ({
            title: note.title,
            description: note.content,
            link: `#`,
            id : note.id
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
                <HoverEffect items={finalNotes} onDelete={handleDelete}/>
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
