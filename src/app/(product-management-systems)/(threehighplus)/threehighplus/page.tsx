import React from "react";
import Hero from "../components/contents/hero";
import { Services } from "../components/contents/services";

export default function Threehighplus() {
  return (
    <main className="flex flex-col min-h-screen">
      <section>
        <Hero />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Services />
      </section>
    </main>
  );
}
