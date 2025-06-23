import * as z from "zod"
import { AxiosApi } from "@/api/base";

export const createNoteSchema = z.object({
    title: z.string().min(1),
    text: z.string().min(1),
    passphrase: z.string().min(1),
});

export type CreateNoteSchemaType = z.infer<typeof createNoteSchema>;

export async function createNote(data: CreateNoteSchemaType) {
    await AxiosApi.post(
        "/notes",
        data
    );
}