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

export type ThemeMode = "zinc" | "ember";

const zincPalette = {
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

const emberPalette = {
  ...zincPalette,
  background: "#030303",
  surface: "#121212",
  surfaceMuted: "#1F1F1F",
  surfaceSoft: "#2D2D2D",
  border: "#3A2A22",
  accent: "#F97316",
  accentStrong: "#EA580C",
  accentSoft: "#3B1605",
};

export type AppPalette = typeof zincPalette;

type AppThemeContextValue = {
  mode: ThemeMode;
  isEmber: boolean;
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
    useState<ThemeMode>("zinc");

  const toggleMode = useCallback(() => {
    setMode((currentMode) =>
      currentMode === "zinc" ? "ember" : "zinc"
    );
  }, []);

  const colors =
    mode === "zinc"
      ? zincPalette
      : emberPalette;

  const navigationTheme =
    useMemo<NavigationTheme>(
      () => ({
        ...DefaultTheme,
        dark: true,
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
      [colors]
    );

  const value =
    useMemo<AppThemeContextValue>(
      () => ({
        mode,
        isEmber: mode === "ember",
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
