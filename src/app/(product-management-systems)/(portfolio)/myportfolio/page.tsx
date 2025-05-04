import Hero from "../components/context/hero";
import WhatIdo from "../components/context/whatido";

export default function Myportfolio() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="lg:pr-24 lg:pl-24 pr-10 pl-10">
        <Hero />
      </section>
      <section className="lg:pr-24 lg:pl-24 pr-10 pl-10">
        <WhatIdo />
      </section>
    </main>
  );
}
