import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App.tsx";
import SingleBlog from "./components/blogs/SingleBlog.tsx";
import NoteEditor from "./components/Editor/NoteEditor.tsx";
import Layout from './components/Sidebar.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import './index.css';
import BlogEdit from "./pages/BlogEdit.tsx";
import ExpandedBlogs from "./pages/ExpandedBlogs.tsx";
import Home from "./pages/Home.tsx";
import NotesPage from "./pages/NotesPage.tsx";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import { Guard } from "./components/guard/Guard.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Signin />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <Guard children={<Layout children={<Home />} />} />
  },
  {
    path: "/edit",
    element: <Guard children={<BlogEdit />} />
  },
  {
    path: "/blogs",
    element: <Guard children={<Layout children={<ExpandedBlogs />} />} />
  },
  {
    path: "/blog",
    element: <Guard children={<Layout children={<SingleBlog />} />} />
  },
  {
    path: "/notes",
    element: <Guard children={<Layout children={<NotesPage />} />} />
  },
  {
    path: "/note/add",
    element: <Guard children={<Layout children={<NoteEditor />} /> }/>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>
);