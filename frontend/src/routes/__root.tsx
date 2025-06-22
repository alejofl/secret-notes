import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { type QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RouteComponent
})

function RouteComponent() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="flex flex-1 flex-col gap-4 p-4 pt-16">
                    <Outlet />
                </main>
                <Toaster richColors />
            </SidebarInset>
        </SidebarProvider>
    )
}