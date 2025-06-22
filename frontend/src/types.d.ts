export type NoteInfo = {
    id: string;
    title: string;
    createdAt: Date;
}

export type Note = NoteInfo & { text: string };