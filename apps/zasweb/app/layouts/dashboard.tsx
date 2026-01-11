import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "../components/organisms/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="bg-zinc-950 w-full">
        <div className="w-full">
          <div className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-border bg-background px-4 py-2">
            <SidebarTrigger />
          </div>
          <div className="p-4 overflow-x-hidden overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}