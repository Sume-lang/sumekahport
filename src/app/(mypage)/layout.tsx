import { Lato } from "next/font/google";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ahmad Gustiawan Anton Sumekah",
  description: "This is my page",
};
export default function MyPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`${lato.className} flex flex-col h-screen bg-slate-950 text-[#c8a189] dark:bg-slate-900 dark:text-slate-200 border-[#c8a189]`}
    >
      <section className="h-screen">{children}</section>
    </main>
  );
}
