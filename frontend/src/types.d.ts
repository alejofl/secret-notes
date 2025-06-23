export type MutationSuccessFunction<Data, Variables, Context> = (data: Data, variables: Variables, context: Context) => Promise<unknown> | unknown;
export type MutationErrorFunction<Error, Variables, Context> = (error: Error, variables: Variables, context: Context | undefined) => Promise<unknown> | unknown;

export type NoteInfo = {
    id: string;
    title: string;
    createdAt: Date;
}

export type Note = NoteInfo & { text: string };