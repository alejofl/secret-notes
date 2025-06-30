import { checkNoteExistance } from "@/api/notes/check-note-existance";
import { getNoteQueryOptions } from "@/api/notes/get-note";
import { NotFound } from "@/components/not-found";
import { ProtectionCard } from "@/components/notes/protection-card";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'

export const Route = createFileRoute("/$noteId")({
    loader: async ({ params }) => {
        const { noteId } = params;
        try {
            const exists = await checkNoteExistance(noteId);
            if (!exists) {
                throw new Error("Note does not exist");
            }
        } catch (e) {
            throw notFound();
        }
    },
    component: RouteComponent,
    notFoundComponent: NotFound
});

function RouteComponent() {
    const { noteId } = Route.useParams()

    return <InnerComponent key={noteId} noteId={noteId}/>
}

function InnerComponent({ noteId }: { noteId: string }) {
    const [passphrase, setPassphrase] = useState("");
    const [doFetch, setDoFetch] = useState(false);
    const {data: note, isFetching, isError} = useQuery({
        ...getNoteQueryOptions(noteId, passphrase),
        enabled: doFetch
    });

    useEffect(() => {
        if (!isFetching && doFetch) {
            setDoFetch(false);
        }
    }, [isFetching]);

    async function handleAuthentication(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setDoFetch(true);
    }

    if (!note) {
        return (
            <div className="grow flex items-center justify-center">
                <ProtectionCard
                    passphrase={passphrase}
                    setPassphrase={setPassphrase}
                    isError={isError}
                    isLoading={isFetching}
                    onSubmit={handleAuthentication}
                />
            </div>
        )
    }

    return (
        <div>
            <div className="space-y-2 pb-4">
                <h1 className="text-2xl font-semibold text-foreground">{note.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="size-4" />
                    <span>Created on {note.createdAt.toLocaleDateString("en-US", { dateStyle: "full" })}</span>
                </div>
            </div>
            <div className="prose prose-sm text-foreground leading-relaxed rounded-md p-4 border markdown-body">
                <Markdown remarkPlugins={[remarkGfm]}>{note.text}</Markdown>
            </div>
        </div>
    )
}
