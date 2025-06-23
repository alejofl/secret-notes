import { AxiosApi } from "@/api/base";
import type { NoteInfo } from "@/types";

export const getNotesQueryKey = (orderBy: string = "title", ascending: boolean = true) => ["notes", orderBy, ascending];

export const getNotesQueryOptions = (orderBy: string = "title", ascending: boolean = true) => ({
    queryKey: getNotesQueryKey(orderBy, ascending),
    queryFn: async () => {
        return await getNotes(orderBy, ascending);
    }
})

async function getNotes(orderBy: string = "title", ascending: boolean = true) {
    return (await AxiosApi.get<NoteInfo[]>(
        "/notes",
        {
            params: { orderBy, ascending }
        }
    )).data;
}
