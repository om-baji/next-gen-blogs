import { CalendarDays, Mail } from 'lucide-react';

type Props = {
  title: string;
  createdAt: string;
  email: string;
};

const Header = ({ title, createdAt, email }: Props) => {
  return (
    <header className="w-full border-b border-zinc-200 bg-blue-200 backdrop-blur-md min-w-full">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900">
          {title}
        </h1>
        
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6 text-sm text-zinc-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Published: {createdAt}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a 
              href={`mailto:${email}`}
              className="hover:text-zinc-900 transition-colors"
            >
              {email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;