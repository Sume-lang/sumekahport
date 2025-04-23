import { Poppins } from "next/font/google";
import { Container } from "@/components/reusable/containers";
import {
  Hero,
  WhatIDo,
  Profiles,
  ProblemSolfing,
  Blog,
  References,
} from "./components/content";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Aboutme() {
  return (
    <Container
      className={`${poppins.className} antialiased flex flex-col h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86]`}
    >
      <section className="">
        <Hero />
      </section>
      <section className="h-auto lg:pr-24 lg:pl-24 pr-5 pl-5">
        <WhatIDo />
      </section>
      <section className="mt-20" />
      <section className="h-auto lg:pr-24 lg:pl-24">
        <Profiles />
      </section>
      <section className="mt-20" />
      <section className="h-auto lg:pr-0 lg:pl-0 pr-5 pl-5">
        <ProblemSolfing />
      </section>
      <section className="mt-10" />
      {/* <section className="lg:pr-20 lg:pl-20 pr-5 pl-5">
        <Blog />
      </section> */}
      <section className="mt-10" />
      <section className="lg:pr-20 lg:pl-20 pr-5 pl-5 h-full">
        <References />
      </section>
      
    </Container>
  );
}
