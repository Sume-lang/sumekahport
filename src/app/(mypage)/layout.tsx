import SideNavigation from "./(landingpage)/experton/elements/sidenavigations";
import Footers from "./(landingpage)/experton/elements/Footers";
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
      <section className="lg:flex hidden p-2">
        <SideNavigation />
      </section>
      <section className="p-2">{children}</section>
      <section className="">
        <Footers />
      </section>
    </main>
  );
}
