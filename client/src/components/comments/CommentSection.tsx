import { useState } from 'react';
import Comments from '../blogs/Comments';
import { Button } from '../ui/button';

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
}

const CommentSection = ({ comments, replies }: Props) => {
    const [show, setShow] = useState(false)

    const toggleShow = () => setShow(prev => !prev)

    return (
        <div className="space-y-6">
            {comments.map(comment => (
                <div key={comment.id} className="space-y-2">
                    <Comments
                        id={comment.id}
                        content={comment.content}
                        commentedAt={comment.commentedAt}
                    />
                    <Button onClick={toggleShow}>
                        {show ? "Hide" : "Replies"}
                    </Button>
                    {show && (
                        <div className="pl-12 space-y-2">
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