#!/usr/bin/env python3
"""
Rewrite a Next.js RootLayout: MEDA title + anti-flash dark-theme using next/script
(beforeInteractive), which runs before hydration WITHOUT the "script tag while rendering" error.
"""
import sys, re

LAYOUT = '''import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MEDA App",
  description: "Built with MEDA frontend standards",
};

const themeScript = `(function(){try{var t=localStorage.getItem("meda-theme");if(t!=="light"){document.documentElement.classList.add("dark")}}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Script id="meda-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
'''

def main():
    path = sys.argv[1]
    # Only overwrite if it's the default-ish layout (has RootLayout). Safe + idempotent.
    with open(path) as f:
        s = f.read()
    if "RootLayout" not in s:
        return
    with open(path, "w") as f:
        f.write(LAYOUT)

if __name__ == "__main__":
    main()
