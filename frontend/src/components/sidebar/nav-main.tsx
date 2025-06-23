import { SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarInput, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { Label } from "@/components/ui/label";
import { ArrowDownAZ, ArrowUpAZ, ListFilter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getNotesQueryOptions } from "@/api/notes/get-notes";

export function NavMain() {
    const [ascending, setAscending] = useState(true);
    const [orderBy, setOrderBy] = useState("title");
    const { data: notes } = useSuspenseQuery(getNotesQueryOptions(orderBy, ascending))
    const [filteredNotes, setFilteredNotes] = useState(notes);

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes, orderBy, ascending]);

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
                        onChange={(e) => {
                            const query = e.target.value.toLowerCase();
                            setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(query)));
                        }}
                    />
                    <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
                </div>
            </SidebarGroupContent>
            <SidebarMenu>
                {filteredNotes.map((item) => (
                    <SidebarMenuItem key={item.id}>
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