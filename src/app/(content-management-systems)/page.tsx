import { Poppins } from "next/font/google";
import { Container } from "@/components/reusable/containers";
import {
  Hero,
  Profiles,
  ProblemSolfing,
  Blog,
  Educations,
  References,
} from "./components/content";
import WhatIdo from "./components/whaticando";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Aboutme() {
  return (
    <Container
      className={`${poppins.className} antialiased flex flex-col min-h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86]`}
    >
      <section>
        <Hero />
      </section>
      <section className="lg:px-24">
        <WhatIdo />
      </section>
      <section className="mt-20">
        <Profiles />
      </section>
      <section className="px-5 lg:pl-24 lg:pr-24">
        <References />
      </section>
      <section className="mt-20 bg-[#faad86]/10">
        <ProblemSolfing />
      </section>
      <section className="mt-10 px-5 lg:pl-24 lg:pr-24">
        <Educations />
      </section>
    </Container>
  );
}
