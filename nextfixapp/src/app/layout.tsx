// src/app/layout.tsx
import "./globals.css";
import Navbar from "./components/navbar";
import Script from "next/script";
import { ReactNode } from "react";

export const metadata = {
  title: "FP PBKK",
  description: "Your app description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full bg-zinc-900">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
      </head>
      <body className="h-full">
        <div className="min-h-full">
          <Navbar />
          <main>{children}</main>
        </div>
        <Script
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
          strategy="beforeInteractive"
        />
        <Script src="https://unpkg.com/swiper/swiper-bundle.min.js" />
      </body>
    </html>
  );
}
