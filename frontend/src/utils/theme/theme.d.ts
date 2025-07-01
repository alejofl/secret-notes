export type ThemeColors =
  | 'zinc'
  | 'blue'
  | 'red'
export type ThemeMode = 'dark' | 'light' | 'system';
export type Theme = {
  mode: ThemeMode;
  color: ThemeColors;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};