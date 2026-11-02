import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteSettingsApplier from "@/components/layout/SiteSettingsApplier";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mahmodur Rahman Sajib — Systems Builder & Game Developer",
    template: "%s | Mahmodur Rahman Sajib",
  },
  description:
    "CS undergraduate from Dhaka building system-minded software, developer tools, multiplayer games, and AI/data products.",
  openGraph: {
    title: "Mahmodur Rahman Sajib — Systems Builder & Game Developer",
    description:
      "CS undergraduate from Dhaka building system-minded software, developer tools, multiplayer games, and AI/data products.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SiteSettingsApplier />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
