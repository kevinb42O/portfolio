import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitGotchi - Your AI-Powered Desktop Companion",
  description: "Meet the Copilot Crew - adorable companions that live on your desktop, track your cursor, and react to your VS Code activity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
