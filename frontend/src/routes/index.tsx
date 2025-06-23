import { createFileRoute } from '@tanstack/react-router';
import { LockKeyhole } from 'lucide-react';

export const Route = createFileRoute('/')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="grow flex items-center justify-center text-muted-foreground">
            <div className="flex size-16 items-center justify-center rounded-md bg-muted text-background">
                <LockKeyhole className="size-12" />
            </div>
        </div>
    )
}
