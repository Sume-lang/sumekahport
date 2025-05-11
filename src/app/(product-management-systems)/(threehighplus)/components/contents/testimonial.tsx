"use client";
import {Carousel} from "@/components/ui/carousel";
import { User } from "lucide-react";
const dataTesti = Array.from({ length: 5 }).map((_, i) => ({
  id: i + 1,
  title: `John Doe ${i + 1}`,
  desc: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, modi. `,
  rate: 5,
  image: `/threehighplus/images/culture-${i + 1}.jpg`,
}));

export function Testimonial() {
  return (
    <main className="flex flex-col w-full h-full p-8 items-center justify-center border-[1px] border-slate-200/20 rounded-lg shadow-md">
      <section className="w-full flex items-center justify-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Here <span className="text-slate-400">WHAT</span> they Say
        </h1>
      </section>
      <section className="grid lg:grid-cols-5 grid-cols-2 gap-2 w-full">
        {dataTesti.map((item) => (
          <div
            key={item.id}
            className="flex flex-col w-full rounded-lg shadow-md p-2 pr-2"
          >
            <User className="w-12 h-12" />
            <h1 className="font-bold lg:text-2xl text-md">{item.title}</h1>
            <p className="font-light w-full">"{item.desc}"</p>
            <span>{item.rate} / 5</span>
          </div>
        ))}
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
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
