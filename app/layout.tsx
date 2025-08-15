import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SOSFab from "@/components/SOSFab";

export const metadata: Metadata = {
  title: "GuardianX",
  description: "Crime-first safety app (MVP) — under active development"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-bg text-ink antialiased">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 pb-28 pt-24">{children}</main>
        <SOSFab />
      </body>
    </html>
  );
}

