import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Instrument_Sans, Inter, JetBrains_Mono } from "next/font/google";

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/site.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arbor, a living map of your data",
  description:
    "Arbor maps lineage, freshness and spend across your warehouse, dbt project and orchestrator, so a stalled table is visible before the dashboard lies.",
};

export const viewport: Viewport = {
  themeColor: "#F2EDE7",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Script id="js-flag" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js');`}
        </Script>
      </body>
    </html>
  );
}
