import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect, useMemo, useState, useTransition } from "react";

type Comment = {
  id : string,
  content : string,
  parentId : string,
  blogId : string,
  userId : string,
  commentedAt : string
}

type Blog = {
  id: string;
  image?: string;
  title: string;
  body: string;
  email: string;
  createdAt : string;
  comments? : Comment[];
};

export function useFetchBlogs() {
  const [isPending, startTransition] = useTransition();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    startTransition(() => {
      axiosInstance
        .get("blogs", { signal: abortController.signal })
        .then((response) => {
          setBlogs(response.data.blogs || []);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err);
          }
        });
    });

    return () => abortController.abort(); 
  }, []);

  const memoised = useMemo(() => blogs,[blogs])

  return {
    isPending,
    blogs : memoised,
    error,
  };
}
