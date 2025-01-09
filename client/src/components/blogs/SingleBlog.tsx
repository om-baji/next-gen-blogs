import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSingleBlog } from '@/hooks/useSingleBlog';
import Header from './Header';
import Blogbody from './Blog-body';
import Comments from './Comments';
import CommentSection from '../comments/CommentSection';

const SingleBlog: React.FC = () => {
    const [query] = useSearchParams();
    const id = query.get('id');
    const { blog, isLoading, error,replies,comments } = useSingleBlog(id as string);

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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="aspect-video w-full relative rounded-lg overflow-hidden bg-gray-100">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="object-cover w-full h-full"
                    />
                </div>

                <article className="prose prose-lg max-w-none ">
                    <Blogbody markdown={blog.body} />
                </article>
                <section>
                    {comments && <CommentSection comments={comments} replies={replies} />}
                </section>
            </div>
        </div>
    );
};

export default SingleBlog;