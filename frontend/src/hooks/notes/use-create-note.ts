import { createNote, type CreateNoteSchemaType } from "@/api/notes/create-note";
import type { MutationErrorFunction, MutationSuccessFunction } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type CreateNoteSuccessFunction = MutationSuccessFunction<void, CreateNoteSchemaType, unknown> | undefined;
type CreateNoteErrorFunction = MutationErrorFunction<Error, CreateNoteSchemaType, unknown> | undefined;
type HookParams = {
    globalSuccessFn?: CreateNoteSuccessFunction;
    globalErrorFn?: CreateNoteErrorFunction;
}

export function useCreateNote({ globalSuccessFn, globalErrorFn }: HookParams = {}) {
    const mutation = useMutation({
        mutationFn: async (data: CreateNoteSchemaType) => {
            return await createNote(data);
        },
        onError: (error, variables, context) => {
            toast.error("An error occurred while creating the note.", { description: error.message });
            if (globalErrorFn) {
                globalErrorFn(error, variables, context);
            }
        },
        onSuccess: (data, variables, context) => {
            toast.success("Note created successfully.");
            if (globalSuccessFn) {
                globalSuccessFn(data, variables, context);
            }
        }
    });

    const execute = (
        data: CreateNoteSchemaType,
        localSuccessFn: CreateNoteSuccessFunction = undefined,
        localErrorFn: CreateNoteErrorFunction = undefined
    ) => {
        mutation.mutate(
            data,
            {
                onSuccess: localSuccessFn,
                onError: localErrorFn
            }
        );
    }

    return execute;
}