import { toast } from '@/hooks/use-toast';
import { axiosInstance } from '@/utils/axiosInstance';
import { useUser } from "@clerk/clerk-react";
import {
  AdmonitionDirectiveDescriptor,
  codeBlockPlugin,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  KitchenSinkToolbar,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';

const RichTextEditor = () => {
  const [markdown, setMarkdown] = useState('Start writing here...');
  const [title, setTitle] = useState("")
  const [image,setImage] = useState("")
  const [isLoading, setIsLaoding] = useState(false)

  const { user } = useUser()

  const onSubmit = async () => {
    setIsLaoding(true)
    try {
      await axiosInstance.post("blogs", {
        title,
        body: markdown,
        userId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        image : image as string
      })

      toast({
        title: "Success"
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        toast({
          title: "Something went wrong",
          description: error.message
        })
      } else {
        console.log("Unknown error")
        toast({
          title: "Unknown error occuered!"
        })
      }
    } finally {
      setIsLaoding(false)
    }
  }

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", "my_image")

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }); 
      const imageUrl = response.data.secure_url;
      console.log(imageUrl)
      setImage(imageUrl)
      toast({
        title: "Image uploaded successfully",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast({
          title: "Image upload failed",
          description: error.message,
        });
      } else {
        console.log("Unknown error");
        toast({
          title: "Unknown error occurred!",
        });
      }
    }
  };

  return (
    <div className="w-full mx-auto p-4 bg-slate-50 text-black h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-screen">
        <div>
          <h2 className="text-lg font-semibold mb-2">Editor</h2>
          <Input
            onChange={e => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
            type="text" placeholder='Enter title' />
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" className='mb-4' onChange={onUpload} />
          <MDXEditor
            className="border border-gray-300 rounded-lg p-4"
            markdown={markdown}
            onChange={setMarkdown}
            plugins={[
              headingsPlugin({
                allowedHeadingLevels: [1, 2, 3, 4, 5, 6]
              }),
              imagePlugin(),
              linkPlugin(),
              quotePlugin(),
              listsPlugin(),
              thematicBreakPlugin(),
              codeBlockPlugin(),
              directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
              tablePlugin(),
              frontmatterPlugin(),
              markdownShortcutPlugin(),
              toolbarPlugin({
                toolbarContents: () => <KitchenSinkToolbar />
              })
            ]}
          />
          <Button
            variant={"secondary"}
            disabled={isLoading}
            onClick={onSubmit}
            className='w-full mt-4'>{isLoading ? "Posting..." : "Post Blog"}</Button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          <div className="border border-gray-300 rounded-lg min-h-[600px] p-4">
            <div className="prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h1 className="text-4xl font-bold mb-4" {...props} />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-3xl font-bold mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3 className="text-2xl font-bold mb-3" {...props} />
                  ),
                  h4: ({ node, ...props }) => (
                    <h4 className="text-xl font-bold mb-2" {...props} />
                  ),
                  h5: ({ node, ...props }) => (
                    <h5 className="text-lg font-bold mb-2" {...props} />
                  ),
                  h6: ({ node, ...props }) => (
                    <h6 className="text-base font-bold mb-2" {...props} />
                  ),
                  table: ({ node, ...props }) => (
                    <table className="min-w-full border-collapse border border-gray-300" {...props} />
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-gray-300 bg-gray-100 px-4 py-2 text-left font-semibold" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-gray-300 px-4 py-2" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-6 mb-4" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-6 mb-4" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="mb-1" {...props} />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
                  ),
                  u: ({ node, ...props }) => (
                    <u className="underline decoration-1" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-gray-200 rounded-sm p-1.5" {...props} />
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;