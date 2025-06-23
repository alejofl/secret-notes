import { SidebarContent, SidebarHeader, SidebarRail, Sidebar, SidebarMenuButton } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { LockKeyhole, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton size="lg" className="bg-sidebar-accent">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                        <LockKeyhole className="size-4" />
                    </div>
                    <span className="leading-none font-medium">Secret Notes</span>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                    <Link to="/new" activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}>
                        <Plus />
                        <span>New note...</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavMain />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}