import React from "react";
import SliderInOut from "@/components/reusable/sliderinout";
import Img from "next/image";
import { Quote } from "lucide-react";
export default function Alittlesrory() {
  return (
    <SliderInOut>
      <main className="flex lg:flex-row flex-col p-8 h-[65vh] bg-gradient-to-t from-[#030E36]/10 to-[#00163B]/90">
        <section className="w-full">
          {" "}
          <Img
            src={"/threehighplus/images/porter-1.png"}
            alt="porter"
            width={1080}
            height={1920}
            className="w-full h-full"
          />
        </section>
        <section className="w-full flex flex-col items-start justify-center lg:-translate-x-[320px] md:-translate-x-[300px] translate-x-[300px]">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Meet With Our <span className="text-slate-300">Local Guide</span>
                  </h1>
                  <br />
          <h1 className="text-xl lg:text-2xl font-bold">Mr. Darmawan</h1>
          <Quote />
          <p>
            {`I've been working as a porter at Three High Plus for 5 years now. I'm super stoked to be working here and helping tourists enjoy the beautiful nature around us. I'm also proud to be contributing to preserving the local environment and culture.`}
          </p>
          <p>{`Before this, I worked as a porter for 15 years, and before that, I was just a farmer and a daily laborer. It wasn't enough to support my family, so I decided to become a porter and will keep doing it as long as I still have the energy to work.`}</p>
          <p>
            {`I hope to continue working here and helping more people enjoy Indonesia's natural beauty. Thanks for choosing Three High Plus as your travel buddy!`}
          </p>
          <Quote className="text-end w-full" />
        </section>
      </main>
    </SliderInOut>
  );
}
