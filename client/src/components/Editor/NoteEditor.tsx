import { toast } from '@/hooks/use-toast';
import { axiosInstance } from '@/utils/axiosInstance';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button'

const NoteEditor = () => {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("Start typing your note here...");

  const { user, isLoaded } = useUser();

  const handleTitleFocus = () => {
    if (title === "Untitled Note") {
      setTitle("");
    }
  };

  const handleTitleBlur = () => {
    if (title.trim() === "") {
      setTitle("Untitled Note");
    }
  };

  const handleContentFocus = () => {
    if (content === "Start typing your note here...") {
      setContent("");
    }
  };

  const handleContentBlur = () => {
    if (content.trim() === "") {
      setContent("Start typing your note here...");
    }
  };

  console.log(user)

  const onSave = async () => {
    try {
      const response = await axiosInstance.post("/notes/add", {
        title,
        content,
        email: user?.emailAddresses[0].emailAddress,
        userId: user?.id,
      });

      if (response.status !== 200) throw new Error(response.data.message);

      toast({
        title: response.data.message,
        description: response.data.id,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Something went wrong!",
          description: error.message,
        });
      } else {
        console.error(error);
        toast({
          title: "An unknown error occurred",
        });
      }
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-zinc-100 min-h-screen flex flex-col">
      <input
        title="header"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={handleTitleFocus}
        onBlur={handleTitleBlur}
        className="w-full text-3xl font-bold mb-4 bg-transparent focus:outline-none text-gray-800"
        spellCheck="true"
        autoFocus
      />
      <div className="h-px bg-gray-100 w-full mb-4" />
      <textarea
        title="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={handleContentFocus}
        onBlur={handleContentBlur}
        className="w-full h-full min-h-[60vh] resize-none bg-transparent focus:outline-none text-gray-800 text-lg"
        spellCheck="true"
      />
      <Button
        onClick={onSave}
        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-zinc-700 self-end"
      >
        Save Note
      </Button>
    </div>
  );
};

export default NoteEditor;
