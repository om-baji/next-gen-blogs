import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect, useMemo, useState, useTransition } from "react";

type Note = {
    id : string,
    title : string,
    body : string,
    email : string,
    userId : string
}

export function useFetchNotes(userId : string) {
    const [isPending,startTransition] = useTransition()
    const [notes,setNotes] = useState<Note[]>([])
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const abortController = new AbortController();
    
        startTransition(() => {
          axiosInstance
            .post("blogs", { signal: abortController.signal, data : JSON.stringify(userId) },
            )
            .then((response) => {
              setNotes(response.data.notes || []);
            })
            .catch((err) => {
              if (err.name !== "AbortError") {
                setError(err);
              }
            });
        });
    
        return () => abortController.abort(); 
      }, []);

      const memoised = useMemo(() => notes,[notes]);

      return {
        isPending,
        notes : memoised,
        error
      }
}