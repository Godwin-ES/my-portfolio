import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { homeMetadata } from "@/lib/metadata";
import { Cursor } from "@/components/motion/cursor";
import { IntroLoader } from "@/components/motion/intro-loader";
import { MotionProvider } from "@/components/motion/motion-provider";
import { RouteReset } from "@/components/navigation/route-reset";
import { RouteTransitionProvider } from "@/components/navigation/route-transition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = homeMetadata;

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

// Runs before first paint: enables motion-only styles and plays the intro once per session.
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!r&&location.pathname==="/"&&!sessionStorage.getItem("ge-intro")){d.classList.add("intro");sessionStorage.setItem("ge-intro","1");}}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <IntroLoader />
        <div className="grain" aria-hidden="true" />
        <div className="scroll-progress" aria-hidden="true" />
        <MotionProvider>
          <RouteTransitionProvider>
            <RouteReset />
            {children}
          </RouteTransitionProvider>
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
