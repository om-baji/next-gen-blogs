import { axiosInstance } from "@/utils/axiosInstance";
import { useCallback, useEffect, useState } from "react";

type Blog = {
  id: string;
  email: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  image?: string;
};

export function useSingleBlog(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBlog = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`/notes?id=${id}`);

      const data = res.data;

      setBlog(data.blogs);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlog()
  },[fetchBlog])

  return {
    blog,
    isLoading,
    error
  }

}
