import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";


export function NotFound() {
    const router = useRouter();
    const goBack = () => router.history.back();

    return (
        <div className="flex items-center justify-center bg-background p-4 grow">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="text-center space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Page Not Found</h2>
                            <p className="text-muted-foreground">
                                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered
                                the wrong URL.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button asChild className="w-full">
                                <Link to="/">
                                    <Home className="mr-2 h-4 w-4" />
                                    Go Home
                                </Link>
                            </Button>

                            <Button variant="outline" onClick={goBack} className="w-full bg-transparent">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}