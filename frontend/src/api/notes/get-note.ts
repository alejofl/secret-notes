import { AxiosApi } from "@/api/base";
import { mapNote, type ApiNote } from "./map-note";

export const getNoteQueryKey = (id: string, passphrase: string) => ["notes", id, passphrase];

export const getNoteQueryOptions = (id: string, passphrase: string) => ({
    queryKey: getNoteQueryKey(id, passphrase),
    queryFn: async () => {
        return await getNote(id, passphrase);
    },
    retry: false
})

async function getNote(id: string, passphrase: string) {
    const response = await AxiosApi.get<ApiNote>(
        `/notes/${id}`,
        {
            params: { passphrase }
        }
    );
    return mapNote(response.data);
}
