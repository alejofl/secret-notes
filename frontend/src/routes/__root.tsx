import { getNotesQueryOptions } from '@/api/notes/get-notes'
import { Error } from '@/components/error'
import { AppSidebar } from '@/components/sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import type { ThemeColors } from '@/utils/theme/theme'
import { DEFAULT_THEME, useTheme } from '@/utils/theme/theme-provider'
import { type QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { useEffect } from 'react'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    loader: async ({ context: { queryClient } }) => {
        return queryClient.ensureQueryData(getNotesQueryOptions());
    },
    component: RouteComponent,
    errorComponent: Error
})

function RouteComponent() {
    const themeColor = useFeatureFlagVariantKey("secret-notes-theme") as ThemeColors | undefined;
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme({ mode: "system", color: themeColor || DEFAULT_THEME.color });
    }, []);

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