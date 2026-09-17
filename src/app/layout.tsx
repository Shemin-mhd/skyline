import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skylink Engineering & Construction | Acoustic & Specialty Solutions",
  description:
    "Smart Engineering. Better Spaces. Exceptional Experiences. Precision acoustic insulation, home theaters, gym flooring, fit-out solutions & starry sky lighting.",
};

import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="bg-white text-[#111] font-sans antialiased m-0 p-0 selection:bg-black selection:text-white">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
