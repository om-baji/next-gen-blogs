import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import BackgroundProvider from "./components/BackgroundProvider.tsx";
import Layout from './components/Sidebar.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import './index.css';
import BlogEdit from './pages/BlogEdit.tsx';
import ExpandedBlogs from "./pages/ExpandedBlogs.tsx";
import Home from './pages/Home.tsx';
import NotesPage from "./pages/NotesPage.tsx";
import Signin from './pages/Signin.tsx';
import Signup from './pages/Signup.tsx';
import NoteEditor from "./components/Editor/NoteEditor.tsx";

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
    element: <BackgroundProvider children={<App />} />,
  },
  {
    path: "/home",
    element: <Layout children={<Home />} />
  },
  {
    path: "/edit",
    element: <BlogEdit />
  },
  {
    path: "/blogs",
    element: <Layout children={<ExpandedBlogs />} />
  },
  {
    path : "/notes",
    element : <Layout children={<NotesPage />} />
  },
  {
    path : "/note/add",
    element : <Layout children={<NoteEditor />} />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </ClerkProvider>
  </StrictMode>
);
