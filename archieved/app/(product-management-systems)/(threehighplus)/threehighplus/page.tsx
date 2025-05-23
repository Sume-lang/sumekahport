import React from "react";
import Hero from "../components/contents/hero";
import { Services } from "../components/contents/services";
import Aboutus from "../components/contents/aboutus";
import Preparation from "../components/contents/preparations";
import Packages from "../components/contents/packages";
import TheBestFeature from "../components/contents/thebestfeat";
import Alittlesrory from "../components/contents/alittlesrory";
import Test from "../components/contents/test";

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
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Test />
      </section>
      <section className="mb-24 lg:h-[10vh]" />
      <section className="lg:pl-24 lg:pr-24 w-full">
        <Alittlesrory />
      </section>
      <section className="mb-24 h-screen" />
      <section className="lg:pl-24 lg:pr-24 w-full">Blog News</section>
    </main>
  );
}
