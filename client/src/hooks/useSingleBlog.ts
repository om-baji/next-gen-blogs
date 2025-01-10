import { axiosInstance } from "@/utils/axiosInstance";
import { useCallback, useEffect, useState } from "react";

type Comment = {
  id: string;
  content: string;
  parentId?: string;
  blogId: string;
  userId: string;
  commentedAt: string;
};

type Blog = {
  id: string;
  title: string;
  email: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  image?: string;
  comments?: Comment[];
};

export function useSingleBlog(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [replies, setReplies] = useState<Comment[]>([]);

  const fetchBlog = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/blogs?id=${id}`);
      const data: Blog = res.data.blogs[0];
      setBlog(data);

      if (data.comments) {
        setComments(data.comments.filter(comment => !comment.parentId));
        setReplies(data.comments.filter(comment => comment.parentId));
      }
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  return { blog, isLoading, error, comments, replies };
}