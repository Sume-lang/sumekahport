import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import BaseNavigations from "@/components/reusable/basenavigations";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmad Gustiawan Anton Sumekah",
  description:
    "I am a web developer with a passion for creating beautiful and functional websites. I have experience in HTML, CSS, JavaScript, and React.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86]`}
      >
        <section className="min-h-screen">{children}</section>
        <section>
          <BaseNavigations />
          <div className="flex lg:flex-row items-center justify-center flex-col text-[12px] text-center font-light w-full p-2 lg:gap-5 bg-[#faad86]/20">
            <h1 className="">@copyright 2025 - Gustiawan</h1>

            <h1>privacy policy | terms of service | contact | doc</h1>
          </div>
        </section>
      </body>
    </html>
  );
}
