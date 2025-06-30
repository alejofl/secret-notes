import { AxiosApi } from "@/api/base";

const CHECK_EXISTANCE_MEDIA_TYPE = "application/vnd.secret-notes.check-existance+json";

export async function checkNoteExistance(id: string) {
    const response = await AxiosApi.get<null>(
        `/notes/${id}`,
        {
            headers: { Accept: CHECK_EXISTANCE_MEDIA_TYPE }
        }
    );
    return response.status === 204;
}
