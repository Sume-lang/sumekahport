import { Lato } from "next/font/google";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
// import Footer from "./components/UI/basenavigations";
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
      className={`${lato.className}flex flex-col min-h-screen bg-gradient-to-br from-[#00102c] to-[#030E36] text-white`}
    >
      <section className="min-h-screen">{children}</section>
      {/* <section className="">
        <Footer />
        <div className="flex flex-col items-center justify-center text-[12px] text-center font-light w-full p-2 lg:gap-5 bg-[#faad86]/20">
          <h1 className="">@copyright 2025 - Gustiawan</h1>
          <h1>privacy policy | terms of service | contact | doc</h1>
        </div>
      </section> */}
    </main>
  );
}
