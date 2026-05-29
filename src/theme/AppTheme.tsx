import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
  use,
} from "react";

import {
  DefaultTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";

export type ThemeMode = "dark" | "light";

const darkPalette = {
  background: "#09090B",
  surface: "#18181B",
  surfaceMuted: "#27272A",
  surfaceSoft: "#3F3F46",
  text: "#FAFAFA",
  textMuted: "#A1A1AA",
  textSubtle: "#71717A",
  border: "#3F3F46",
  accent: "#EA580C",
  accentStrong: "#C2410C",
  accentSoft: "#431407",
  success: "#16A34A",
  danger: "#DC2626",
};

const lightPalette = {
  background: "#FFFFFF",
  surface: "#FFF7ED",
  surfaceMuted: "#FFEDD5",
  surfaceSoft: "#FED7AA",
  text: "#18181B",
  textMuted: "#57534E",
  textSubtle: "#A8A29E",
  border: "#FED7AA",
  accent: "#EA580C",
  accentStrong: "#C2410C",
  accentSoft: "#FFEDD5",
  success: "#16A34A",
  danger: "#DC2626",
};

export type AppPalette = typeof darkPalette;

type AppThemeContextValue = {
  mode: ThemeMode;
  isDark: boolean;
  colors: AppPalette;
  navigationTheme: NavigationTheme;
  toggleMode: () => void;
};

const AppThemeContext =
  createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mode, setMode] =
    useState<ThemeMode>("dark");

  const toggleMode = useCallback(() => {
    setMode((currentMode) =>
      currentMode === "dark" ? "light" : "dark"
    );
  }, []);

  const colors =
    mode === "dark"
      ? darkPalette
      : lightPalette;

  const navigationTheme =
    useMemo<NavigationTheme>(
      () => ({
        ...DefaultTheme,
        dark: mode === "dark",
        colors: {
          ...DefaultTheme.colors,
          primary: colors.accent,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.accent,
        },
      }),
      [colors, mode]
    );

  const value =
    useMemo<AppThemeContextValue>(
      () => ({
        mode,
        isDark: mode === "dark",
        colors,
        navigationTheme,
        toggleMode,
      }),
      [
        colors,
        mode,
        navigationTheme,
        toggleMode,
      ]
    );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const value = use(AppThemeContext);

  if (!value) {
    throw new Error(
      "useAppTheme must be used inside AppThemeProvider"
    );
  }

  return value;
}
