"use client";

import { AppSidebar } from "@/components/common/AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard />,
      isActive: pathname.startsWith("/admin/dashboard"),
    },
    {
      href: "/admin/create-event",
      label: "Create Event",
      icon: <PlusCircle />,
      isActive: pathname.startsWith("/admin/create-event"),
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar navItems={navItems} />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 pt-2">
            <SidebarTrigger className="md:hidden"/>
        </header>
        <main className="p-4 sm:px-6 sm:py-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
