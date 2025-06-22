import { SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import type { NoteInfo } from "@/types";
import { Link } from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import { ArrowDownAZ, ArrowUpAZ, ListFilter, Search } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function NavMain({ notes }: { notes: NoteInfo[] }) {
    const [ascending, setAscending] = useState(true);
    const [orderBy, setOrderBy] = useState("title");

    return <>
        <SidebarGroup>
            <SidebarGroupLabel>Notes</SidebarGroupLabel>
            <SidebarGroupContent className="pb-2">
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarGroupAction title="Order By" className="right-9">
                            <ListFilter /> <span className="sr-only">Order By...</span>
                        </SidebarGroupAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuRadioGroup value={orderBy} onValueChange={setOrderBy}>
                            <DropdownMenuRadioItem value="title">Title</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="createdAt">Creation Date</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <SidebarGroupAction title={ascending ? "Ascending" : "Descending"} onClick={() => setAscending(!ascending)}>
                    {
                        ascending ? (
                            <>
                                <ArrowDownAZ /> <span className="sr-only">Ascending</span>
                            </>
                        ) : (
                            <>
                                <ArrowUpAZ /> <span className="sr-only">Descending</span>
                            </>
                        )
                    }
                </SidebarGroupAction>
                <div className="relative">
                    <SidebarInput
                        id="search"
                        placeholder="Search for a note..."
                        className="pl-8"
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                </div>
            </SidebarGroupContent>
            <SidebarMenu>
                {notes.map((item) => (
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link to="/$noteId" params={{ noteId: item.id }} activeProps={{ className: "bg-sidebar-accent text-sidebar-accent-foreground font-medium" }}>
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>

    </>
}