import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ClerkProvider } from '@clerk/clerk-react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signin from './pages/Signin.tsx';
import Signup from './pages/Signup.tsx';
import Home from './pages/Home.tsx';
import Layout from './components/Sidebar.tsx';
import { ThemeProvider } from './components/ThemeProvider.tsx';
import { Toaster } from "@/components/ui/toaster"

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
    element: <App />,
  },
  {
    path: "/home",
    element: <Layout children={<Home />} />
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
