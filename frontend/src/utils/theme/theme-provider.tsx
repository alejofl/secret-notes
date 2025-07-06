import { createContext, useContext, useState } from "react";
import type { Theme, ThemeColors, ThemeProviderState } from "./theme";

export const DEFAULT_THEME: Theme = { mode: "system", color: "zinc" };
const initialState: ThemeProviderState = {
    theme: DEFAULT_THEME,
    setTheme: () => null
};

export const THEME_COLORS: {[key: string]: ThemeColors} = {
    "control": "zinc",
    "blue": "blue",
    "red": "red",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

type Props = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export function ThemeProvider({
    children,
    defaultTheme = DEFAULT_THEME,
    storageKey = "ui-theme",
    ...props
}: Props) {
    const [storedTheme, setStoredTheme] = useState<Theme>(defaultTheme);

    const value = {
        theme: storedTheme,
        setTheme: (theme: Theme) => {
            setStoredTheme(theme);
        }
    };

    if (storedTheme.mode === "system") {
        const systemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

        return (
            <ThemeProviderContext.Provider {...props} value={value}>
                <div data-theme={`${storedTheme.color}-${systemMode}`}>{children}</div>
            </ThemeProviderContext.Provider>
        );
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            <div className={`${storedTheme.mode}`} data-theme={`${storedTheme.color}-${storedTheme.mode}`}>{children}</div>
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

    return context;
};