import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$noteId')({
    component: RouteComponent,
});

function RouteComponent() {
    const { noteId } = Route.useParams()


    return <div>Hello "/{noteId}"!</div>;
}
