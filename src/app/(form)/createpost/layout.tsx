import SideNavigation from "./components/sideNavigations";
import Navigations from "./components/UI/navigations";

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
      className={`${lato.className} flex flex-col min-h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86] overflow-hidden`}
    >
      <section className="hidden lg:flex flex-row items-start gap-2 h-screen p-2">
        <div className="">
          <Navigations />
        </div>
        <div className="w-full p-2 h-full lg:pt-20"> {children}</div>
      </section>
    </main>
  );
}
