import { Lato } from "next/font/google";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
import { Metadata } from "next";
import { SidebarDemo } from "../allcomponents/UI/sidebar";

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
      className={`${lato.className} flex lg:flex-row flex-col w-full h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86]`}
    >
      <section className="lg:w-[15vw] md:w-[50%]">
        <SidebarDemo />
      </section>
      <section className="h-screen w-full">{children}</section>
    </main>
  );
}
