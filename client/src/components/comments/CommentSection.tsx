import { useState } from 'react';
import Comments from '../blogs/Comments';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';
import { axiosInstance } from '@/utils/axiosInstance';
import { useAuth } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

type Comment = {
    id: string;
    content: string;
    parentId?: string;
    blogId: string;
    userId: string;
    commentedAt: string;
};

interface Props {
    comments: Comment[];
    replies: Comment[];
    blogId: string
}

const CommentSection = ({ comments, replies, blogId }: Props) => {
    const [show, setShow] = useState<Record<string, boolean>>({})
    const [content, setContent] = useState("")
    const { userId, isLoaded } = useAuth()

    const toggleShow = (id: string) => {
        setShow((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const onReply = async (id: string) => {
        try {

            await axiosInstance.post(`/comment?id=${blogId}`, {
                content,
                parentId: id,
                userId
            })

            toast({
                title : "Replied"
            })

        } catch (error) {
            console.error(error)
            toast({
                title: "Something went wrong!",
                description: error instanceof Error ? error.message : error as string
            })
        }
    }

    if(!isLoaded) {
        return <div>
            <Loader2 className='animate-spin' />
        </div>
    }

    return (
        <div className="space-y-6">
            {comments.map(comment => (
                <div key={comment.id} className="space-y-2">
                    <Comments
                        id={comment.id}
                        content={comment.content}
                        commentedAt={comment.commentedAt}
                    />
                    <Button onClick={() => toggleShow(comment.id)}>
                        {show[comment.id] ? 'Hide' : 'Replies'}
                    </Button>
                    {show[comment.id] && (
                        <div className="pl-12 space-y-2">
                            <div className='flex gap-4 mt-8'>
                                <Input
                                    onChange={e => setContent(e.target.value)}
                                    placeholder='Enter your comment' />
                                <Button
                                    onClick={() => onReply(comment.id)}
                                >Post</Button>
                            </div>

                            {replies
                                .filter(reply => reply.parentId === comment.id)
                                .map((reply) => (
                                    <Comments
                                        key={reply.id}
                                        id={reply.id}
                                        content={reply.content}
                                        commentedAt={reply.commentedAt}
                                    />
                                ))}
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
};

export default CommentSection;