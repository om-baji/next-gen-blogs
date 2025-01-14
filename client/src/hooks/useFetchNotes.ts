import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect, useMemo, useState, useTransition } from "react";

export type Note = {
  id: string;
  title: string;
  content: string;
  email: string;
  userId: string;
  createdAt: string;
};

export function useFetchNotes(email: string) {
  const [isPending, startTransition] = useTransition();
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    startTransition(() => {
      axiosInstance
        .post("notes", { email }, { signal: abortController.signal })
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
  }, [email]);

  const memoised = useMemo(() => notes, [notes]);

  return {
    isPending,
    notes: memoised,
    error,
  };
}
