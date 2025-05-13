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
    <main className={`${lato.className} flex flex-row w-full bg-slate-900`}>
      <section className="fixed z-20 shadow-md lg:block hidden">
        <Sidebar />
      </section>
      <section className="w-full lg:pl-[20px] min-h-screen flex flex-col ">
        <div className="lg:pl-14 lg:pr-14 p-1 w-full mt-2 fixed">
          <div className="p-5 border border-slate-50/10 rounded-md bg-slate-800">Navigation</div>
        </div>
        <div className="mt-10 lg:pl-2">{children}</div>
      </section>
    </main>
  );
}
