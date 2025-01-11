import { toast } from '@/hooks/use-toast';
import { useSingleBlog } from '@/hooks/useSingleBlog';
import { axiosInstance } from '@/utils/axiosInstance';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CommentSection from '../comments/CommentSection';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Blogbody from './Blog-body';
import Header from './Header';

const SingleBlog: React.FC = () => {
    const [query] = useSearchParams();
    const id = query.get('id');
    const { blog, isLoading, error, replies, comments,refetch } = useSingleBlog(id as string);
    const [content, setContent] = useState("")
    const [isPosting,setIsPosting] = useState(false)

    const onComment = async () => {
        setIsPosting(true)
        try {

            await axiosInstance.post(`/comment?id=${blog?.id}`, {
                content,
                userId: blog?.userId,
            })

            toast({
                title: "Success"
            })

            setContent("")
            refetch()

        } catch (error) {
            console.error(error)
            toast({
                title: "Something went wrong!",
                description: error instanceof Error ? error.message : error as string
            })
        } finally {
            setIsPosting(false)
        }
    }

    if (isLoading || !blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-500 font-medium">
                {error}
            </div>
        );
    }

    return (
        <div>
            <div className="w-full bg-white border-b">
                <div className="w-full">
                    <Header
                        title={blog.title}
                        createdAt={blog.createdAt}
                        email={blog.email}
                    />
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
                <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full"
                    />
                </div>

                <article className="prose prose-lg max-w-none ">
                    <Blogbody markdown={blog.body} />
                </article>
                <section className='space-y-4'>
                    <h2>Comments <span className='text-gray-400'>{comments.length}</span></h2>
                    <Input 
                    onChange={e => setContent(e.target.value)}
                    placeholder='Enter your comment'/>
                    <Button
                    onClick={onComment}
                    >{isPosting ? "Posting.." : "Post"}</Button>
                    {comments && <CommentSection comments={comments} replies={replies} blogId={blog.id}/>}
                </section>
            </div>
        </div>
    );
};

export default SingleBlog;