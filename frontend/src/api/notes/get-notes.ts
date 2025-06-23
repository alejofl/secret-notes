import { AxiosApi } from "@/api/base";
import { mapNoteInfo, type ApiNoteInfo } from "./map-note";

export const getNotesQueryKey = (orderBy?: string, ascending?: boolean) => [
    "notes",
    ...(orderBy !== undefined ? [{ orderBy }] : []),
    ...(ascending !== undefined ? [{ ascending }] : []),
];

export const getNotesQueryOptions = (orderBy: string = "title", ascending: boolean = true) => ({
    queryKey: getNotesQueryKey(orderBy, ascending),
    queryFn: async () => {
        return await getNotes(orderBy, ascending);
    }
})

async function getNotes(orderBy: string = "title", ascending: boolean = true) {
    const response = await AxiosApi.get<ApiNoteInfo[]>(
        "/notes",
        {
            params: { orderBy, ascending }
        }
    );
    return response.data.map(mapNoteInfo);
}
