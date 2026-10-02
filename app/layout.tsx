import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { homeMetadata } from "@/lib/metadata";
import { MotionProvider } from "@/components/motion/motion-provider";
import { RouteReset } from "@/components/navigation/route-reset";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = homeMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MotionProvider>
          <RouteReset />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
