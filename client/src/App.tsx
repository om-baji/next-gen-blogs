import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Pen, Lock, Zap } from "lucide-react";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-8">

        <div className="flex flex-col justify-center items-center h-[70vh] text-center">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-white dark:via-gray-300 dark:to-gray-400 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Next-Gen Blogs
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            A modern blogging platform showcasing the best of contemporary web technologies
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.href = '/sign-in'}
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <Pen className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Rich Text Editor</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Create beautiful content with our Markdown-based editor featuring live preview
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <Lock className="h-12 w-12 mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Personal Notes</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Maintain private notes securely accessible only to you
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <Zap className="h-12 w-12 mb-4 text-yellow-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Modern Stack</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Built with React, Hono and TypeScript for optimal performance
            </p>
          </div>
        </div>

        <div className="text-center py-8 px-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-700">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Powered by Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">Hono.js</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">React</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">TypeScript</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">Prisma</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;