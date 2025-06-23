import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

type Props = {
    passphrase: string;
    setPassphrase: (value: string) => void;
    error?: string;
    isLoading?: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ProtectionCard({ passphrase, setPassphrase, error, isLoading, onSubmit }: Props) {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Card className="w-md shadow-sm">
            <CardHeader className="text-center pb-4">
                <div className="mx-auto size-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <LockKeyhole className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-semibold text-foreground">Protected Note</h1>
                <p className="text-sm text-muted-foreground">Enter the passphrase to access this note</p>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="passphrase">Passphrase</Label>
                        <div className="relative">
                            <Input
                                id="passphrase"
                                type={showPassword ? "text" : "password"}
                                value={passphrase}
                                onChange={(e) => setPassphrase(e.target.value)}
                                placeholder="Enter passphrase"
                                className="pr-10"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </div>
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Access Note"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}