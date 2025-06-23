import { AxiosApi } from "@/api/base";
import type { Note } from "@/types";

export const getNoteQueryKey = (id: string, passphrase: string) => ["notes", id, passphrase];

export const getNotesQueryOptions = (id: string, passphrase: string) => ({
    queryKey: getNoteQueryKey(id, passphrase),
    queryFn: async () => {
        return await getNote(id, passphrase);
    }
})

async function getNote(id: string, passphrase: string) {
    return (await AxiosApi.get<Note[]>(
        `/notes/${id}`,
        {
            params: { passphrase }
        }
    )).data;
}
