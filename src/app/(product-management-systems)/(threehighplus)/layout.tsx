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
      className={`${lato.className}flex flex-col min-h-screen bg-gradient-to-br from-[#00102c] to-[#030E36] text-white`}
    >
      <section className="min-h-screen">{children}</section>
      
    </main>
  );
}
