"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Carousel } from "@/components/ui/carousel";
const dataTesti = Array.from({ length: 5 }).map((_, i) => ({
  name: `John Doe ${i + 1}`,
  quote: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, modi. `,
  title: "Trekking With Three High Plus",
}));

export function Testimonial() {
  return (
    <main className="p-8">
      <section>
        <h1 className="text-[30px] md:text-4xl lg:text-5xl font-bold">
          What People <span className="text-slate-300">Say</span>
        </h1>
        <p className="lg:w-1/2 w-full mt-1 font-light">
          The Feedback from our customers is the best way to improve our
          services. We are always looking for ways to improve our services and
          make them more enjoyable for our customers.
        </p>
      </section>
      <section>
        <div className="rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={dataTesti}
            direction="right"
            speed="normal"
            pauseOnHover={true}
          />
        </div>
      </section>
    </main>
  );
}

export function CarouselDemo() {
  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Explore Component",
      src: "/threehighplus/images/culture-1.jpg",
    },
    {
      title: "Urban Dreams",
      button: "Explore Component",
      src: "/threehighplus/images/culture-2.jpg",
    },
    {
      title: "Neon Nights",
      button: "Explore Component",
      src: "/threehighplus/images/culture-3.jpg",
    },
    {
      title: "Desert Whispers",
      button: "Explore Component",
      src: "/threehighplus/images/culture-4.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full">
      <Carousel slides={slideData} />
    </div>
  );
}
