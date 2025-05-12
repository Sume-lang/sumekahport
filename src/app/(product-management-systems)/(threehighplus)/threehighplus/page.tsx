import React from "react";
import Hero from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/contents/hero";
import { Services } from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/contents/services";
import Aboutus from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/contents/aboutus";
import Preparation from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/contents/preparations";
import Packages from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/contents/packages";
import TheBestFeature from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/contents/thebestfeat";
import Alittlesrory from "@/app/(dashboards-management-systems)/allcomponents/threehighplus/contents/alittlesrory";
// import {Testimonial} from "../components/contents/testimonial";

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
        <TheBestFeature />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Aboutus />
      </section>
      <section className="lg:pl-24 lg:pr-24 w-full mt-24">
        <Packages />
      </section>
      {/* <section className="lg:pl-24 lg:pr-24 w-full">
        <Testimonial />
      </section> */}
      {/* <section>
        <CarouselDemo />
      </section> */}
      <section className="mb-24 lg:h-[10vh]" />
      <section className="lg:pl-24 lg:pr-24 w-full">
        <div className="flex flex-col items-start justify-center pr-8 pl-8">
          <h1 className="text-3xl lg:text-5xl font-bold text-center">
            A Little hack <span className="text-slate-300">For You</span>
          </h1>
        </div>
        <Preparation />
      </section>{" "}
      <section className="mb-24 lg:h-[10vh]" />
      <section className="mb-24 lg:h-[10vh]" />
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Alittlesrory />
      </section>
      <section className="mb-24 h-screen" />
      <section className="lg:pl-24 lg:pr-24 w-full">Blog News</section>
    </main>
  );
}
