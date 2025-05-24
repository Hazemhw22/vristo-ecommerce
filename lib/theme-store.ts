"use client"

import { create } from "zustand"
import { persist, subscribeWithSelector } from "zustand/middleware"

type Theme = "light" | "dark" | "system"

interface ThemeState {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initializeTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        theme: "system",
        resolvedTheme: "light",

        setTheme: (theme: Theme) => {
          set({ theme })
          applyTheme(theme)
        },

        toggleTheme: () => {
          const { theme } = get()
          const newTheme = theme === "dark" ? "light" : "dark"
          get().setTheme(newTheme)
        },

        initializeTheme: () => {
          const { theme } = get()
          applyTheme(theme)
        },
      }),
      {
        name: "vristo-theme",
        partialize: (state) => ({ theme: state.theme }),
      },
    ),
  ),
)

// Helper function to apply theme to DOM
function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return

  const root = window.document.documentElement
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Remove existing theme classes
  root.classList.remove("light", "dark")

  // Add new theme class
  root.classList.add(isDark ? "dark" : "light")

  // Update the store's resolved theme
  useThemeStore.setState({ resolvedTheme: isDark ? "dark" : "light" })
}

// Listen for system theme changes
if (typeof window !== "undefined") {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  mediaQuery.addEventListener("change", () => {
    const { theme } = useThemeStore.getState()
    if (theme === "system") {
      applyTheme(theme)
    }
  })

  // Subscribe to theme changes and apply them
  useThemeStore.subscribe(
    (state) => state.theme,
    (theme) => {
      applyTheme(theme)
    },
  )
}
