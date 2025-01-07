import { useState } from 'react';

const NoteEditor = () => {
  const [title, setTitle] = useState("Untitled Note");
  const [content, setContent] = useState("Start typing your note here...");

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

  const onSave = async () => {
    
  }

  return (
    <div className="p-6 bg-zinc-100 min-h-screen">
      <input
        title='header'
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
        title='content'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={handleContentFocus}
        onBlur={handleContentBlur}
        className="w-full h-full min-h-[60vh] resize-none bg-transparent focus:outline-none text-gray-800 text-lg"
        spellCheck="true"
      />
    </div>
  );
};

export default NoteEditor;