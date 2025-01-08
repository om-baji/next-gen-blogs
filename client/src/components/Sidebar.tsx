import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { useMediaQuery } from "react-responsive"
import Navbar from "./Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
const isLarge = useMediaQuery({ query: "(min-width: 1024px)" })
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
       {isLarge ? <SidebarTrigger /> : <Navbar />} 
        {children}
      </main>
    </SidebarProvider>
  )
}
