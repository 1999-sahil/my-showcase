import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/sidebar"
import { Outlet } from "react-router-dom";
import Topbar from "@/components/dashboard/topbar";

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <main className="flex-1 p-2 bg-neutral-50 dark:bg-[#0e100f] min-h-screen w-full">
          <Topbar />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
