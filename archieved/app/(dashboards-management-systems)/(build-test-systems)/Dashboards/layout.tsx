import { Lato } from "next/font/google";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
import Navigations from "../components/UI/Navigations";
import Footer from "../components/UI/footers";
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
      className={`${lato.className}flex flex-col min-h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86]`}
    >
      <section>
        <Navigations />
      </section>
      <section className="min-h-screen mb-20">{children}</section>
      <section className="">
        <Footer />
        <div className="flex lg:flex-row items-center justify-center flex-col text-[12px] text-center font-light w-full p-2 lg:gap-5 bg-[#faad86]/20">
          <h1 className="">@copyright 2025 - Ahmad Gustiawan Anton Sumekah</h1>
          <p>-</p>
          <h1>privacy policy | terms of service | contact</h1>
        </div>
      </section>
    </main>
  );
}
