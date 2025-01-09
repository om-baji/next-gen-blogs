import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Blogbody = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-4xl font-bold mb-6 text-white" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-3xl font-bold mb-4 text-white mt-8" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-2xl font-bold mb-3 text-white mt-6" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="text-white leading-relaxed mb-4" {...props} />
        ),
        table: ({ ...props }) => (
          <div className="overflow-x-auto my-6">
            <table className="min-w-full border-collapse border border-gray-300 rounded-lg" {...props} />
          </div>
        ),
        th: ({ ...props }) => (
          <th className="border border-gray-300 bg-gray-50 px-4 py-3 text-left font-semibold" {...props} />
        ),
        td: ({ ...props }) => (
          <td className="border border-gray-300 px-4 py-3" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-700" {...props} />
        ),
        code: ({ inline, ...props }: { inline?: boolean } & React.HTMLProps<HTMLElement>) => (
          inline ? 
            <code className="bg-gray-100 text-pink-500 rounded px-1 py-0.5" {...props} /> :
            <code className="block bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto" {...props} />
        ),
        pre: ({ ...props }) => (
          <pre className="bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto" {...props} />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default Blogbody;