import { createNoteSchema, type CreateNoteSchemaType } from "@/api/notes/create-note";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateNote } from "@/hooks/notes/use-create-note";
import { useQueryClient } from "@tanstack/react-query";
import { getNotesQueryKey } from "@/api/notes/get-notes";

export const Route = createFileRoute("/new")({
    component: RouteComponent,
});

function RouteComponent() {
    const createNote = useCreateNote();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const form = useForm<CreateNoteSchemaType>({
        resolver: zodResolver(createNoteSchema),
        defaultValues: {
            title: "",
            passphrase: "",
            text: ""
        }
    })

    function onSubmit(values: CreateNoteSchemaType) {
        createNote(
            values,
            () => {
                queryClient.invalidateQueries({ queryKey: getNotesQueryKey() });
                navigate({ to: "/" });
            }
        );
    }

    return (
        <>
            <h1 className="text-2xl font-semibold text-foreground pb-4">New Note</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="My New Note"
                                        type="text"
                                        {...field} />
                                </FormControl>
                                <FormDescription>This will be the title of your note. It will be publicly visible.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passphrase"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Passphrase</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder=""
                                        type="text"
                                        {...field} />
                                </FormControl>
                                <FormDescription>Remember and store this value securely. It will be used as the key to encrypt your content.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In consequat, felis eget pretium congue, massa felis maximus ipsum, eu suscipit tortor sapien a nisl. Integer vel nulla arcu..."
                                        className="min-h-96 resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>The private content of your note. You can use Markdown to style your note.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create Note</Button>
                </form>
            </Form>
        </>
    )
}