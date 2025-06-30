import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";


export function Error() {
    const reload = () => window.location.reload();

    return (
        <div className="flex items-center justify-center bg-background p-4 min-h-screen">
            <Card className="w-full max-w-md">
                <CardContent className="pt-6">
                    <div className="text-center space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-semibold">Something Went Wrong</h2>
                            <p className="text-muted-foreground">
                                Sorry, we couldn't process your request. This might be due to a server error or an issue with your network connection.
                                Please try again later.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Button onClick={reload} className="w-full">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reload Page
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}