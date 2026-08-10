import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kirintimadencilik.com"),
  title: "Kırıntı Madencilik",
  description:
    "Kırıntı Madencilik — madenciler için modern topluluk platformu. Bilgi paylaş, deneyimlerini anlat, birlikte büyü.",
  openGraph: {
    title: "Kırıntı Madencilik",
    description:
      "Madenciler için modern topluluk platformu. Bilgi paylaş, deneyimlerini anlat, birlikte büyü.",
    url: "https://kirintimadencilik.com",
    siteName: "Kırıntı Madencilik",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col pl-0 md:pl-64">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
