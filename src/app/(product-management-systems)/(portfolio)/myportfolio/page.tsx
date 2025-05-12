import Hero from "@/app/(dashboards-management-systems)/allcomponents/myportfolio/hero";
import WhatIdo from "@/app/(dashboards-management-systems)/allcomponents/myportfolio/whatido";

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
