"use client"

import { useEffect, type ReactNode } from "react"
import { useThemeStore } from "../lib/theme-store"

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const initializeTheme = useThemeStore((state) => state.initializeTheme)

  useEffect(() => {
    // Initialize theme on mount
    initializeTheme()

    // Apply theme immediately if it exists in localStorage
    const storedTheme = localStorage.getItem("vristo-theme")
    if (storedTheme) {
      try {
        const parsed = JSON.parse(storedTheme)
        if (parsed.state?.theme) {
          const theme = parsed.state.theme
          const isDark =
            theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
          document.documentElement.classList.remove("light", "dark")
          document.documentElement.classList.add(isDark ? "dark" : "light")
        }
      } catch (error) {
        console.warn("Failed to parse stored theme:", error)
      }
    }
  }, [initializeTheme])

  return <>{children}</>
}
