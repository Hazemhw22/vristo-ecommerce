// بدون "use client"
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "  - Vristo",
  description: "صفحة تسجيل الدخول إلى متجرك",
};


export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}