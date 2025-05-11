import React from "react";
import Hero from "../components/contents/hero";
import { Services } from "../components/contents/services";
import Aboutus from "../components/contents/aboutus";
import Preparation from "../components/contents/preparations";
import Packages from "../components/contents/packages";
import Testimonials from "../components/contents/testimonial";

export default function Threehighplus() {
  return (
    <main className="flex flex-col min-h-screen">
      <section>
        <Hero />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Services />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Aboutus />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Preparation />
      </section>{" "}
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Packages />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Testimonials />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full">Blog News</section>
    </main>
  );
}
