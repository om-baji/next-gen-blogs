import { formatDistanceToNow } from 'date-fns';

type CommentProps = {
  id: string;
  parentId?: string;
  blogId?: string;
  content: string;
  commentedAt: string;
  userId?: string;
};

const Comments = ({ content, commentedAt,id }: CommentProps) => {
  return (
    <div key={id} className="py-4 border-b last:border-0">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-600">
          A
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Anonymous</span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(commentedAt), { addSuffix: true })}
            </span>
          </div>
          
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Comments;