import { Lato } from "next/font/google";

import Sidebar from "../allcomponents/UI/sidebar";

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
    <main className={`${lato.className} flex flex-row w-full bg-[#20202e]`}>
      <section className="text-slate-50">
        <Sidebar />
      </section>
      <section className="w-full">{children}</section>
    </main>
  );
}
