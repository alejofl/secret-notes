import type { Note, NoteInfo } from "@/types";

export type ApiNoteInfo = {
    id: string;
    title: string;
    createdAt: string;
}

export type ApiNote = ApiNoteInfo & { text: string }

export function mapNoteInfo(note: ApiNoteInfo): NoteInfo {
    return {
        id: note.id,
        title: note.title,
        createdAt: new Date(note.createdAt)
    }
}

export function mapNote(note: ApiNote): Note {
    return {
        ...mapNoteInfo(note),
        text: note.text
    }
}
