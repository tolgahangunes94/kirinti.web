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

const SITE_TITLE = "Kırıntı Madencilik | KırıntıMadencilik.com";
const SITE_DESCRIPTION =
  "Kırıntı madencilik meraklıları için Türkiye'nin saha ve jeoloji platformu — kaynaklı veriyi incele, saha notlarını gizlice kaydet, deneyimini paylaş.";
const SITE_OG_IMAGE = "/images/turkiye-altin-haritasi-preview-v3.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://kirintimadencilik.com"),
  title: {
    default: SITE_TITLE,
    template: "%s | KırıntıMadencilik.com",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "kırıntı madencilik",
    "derede altın arama",
    "altın arama Türkiye",
    "plaser altın",
    "kuvars damarı",
    "jeoloji haritası",
    "fossicking",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://kirintimadencilik.com",
    siteName: "KırıntıMadencilik.com",
    locale: "tr_TR",
    type: "website",
    images: [{ url: SITE_OG_IMAGE, width: 1103, height: 606 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_OG_IMAGE],
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
