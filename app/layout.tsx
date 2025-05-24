import type React from "react"
import "./globals.css"
import AppProviders from "../components/AppProviders"

export const metadata = {
  title: "Vristo",
  description: "Next.js + Tailwind UI Store",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors duration-300">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
