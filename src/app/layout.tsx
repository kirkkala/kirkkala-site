import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const display = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} · Kirkkala`,
    template: `%s · Kirkkala`,
  },
  description: site.tagline,
  metadataBase: new URL(site.links.site),
  openGraph: {
    title: `${site.name} · Kirkkala`,
    description: site.tagline,
    url: site.links.site,
    siteName: "Kirkkala",
    locale: "en_FI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      id="top"
      lang="en"
      className={`${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
