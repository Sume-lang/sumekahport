import {
  CarFront,
  BadgePercent,
  Headset,
  ChartLine,
  HandPlatter,
  Leaf,
} from "lucide-react";
import SliderInOut from "@/components/reusable/sliderinout";

const dataOffering = [
  {
    id: 1,
    title: "Flexible Trans",
    desc: "We offer flexible transportation options.",
    icons: <CarFront size={48} strokeWidth={2.25} absoluteStrokeWidth />,
  },
  {
    id: 2,
    title: "Affordable Price",
    desc: "We offer the best price for our services.",
    icons: <BadgePercent size={48} strokeWidth={2.25} absoluteStrokeWidth />,
  },
  {
    id: 3,
    title: "Best Service",
    desc: "We provide the best service to our customers.",
    icons: <HandPlatter size={48} strokeWidth={2.25} absoluteStrokeWidth />,
  },
  {
    id: 4,
    title: "24/7 Support",
    desc: "We offer 24/7 support to our customers.",
    icons: <Headset size={48} strokeWidth={2.25} absoluteStrokeWidth />,
  },
  {
    id: 5,
    title: "Experienced Guides",
    desc: "We have experienced guides to assist you.",
    icons: <ChartLine size={48} strokeWidth={2.25} absoluteStrokeWidth />,
  },
  {
    id: 6,
    title: "Sustainable Practices",
    desc: "We practice sustainable tourism.",
    icons: <Leaf size={48} strokeWidth={2.25} absoluteStrokeWidth />,
  },
];

export const Services = () => {
  return (
    <SliderInOut className="p-8 w-full flex flex-col rounded-xl gap-8 h-auto">
      <section className="flex lg:flex-row flex-col gap-2">
        <div className="w-full p-2 flex flex-col gap-2 h-auto items-start justify-center">
          <h1 className="font-bold text-[30px] md:text-4xl lg:text-5xl">
            Why Choose Us?
          </h1>
          <p className="w-full font-light lg:text-md text-[15px]">
            We are committed to providing our customers with the best possible
            experience. Our team of experts is dedicated to ensuring that every
            aspect of your trip is perfect, from the moment you book until you
            return home. We take pride in our attention to detail and our
            commitment to customer satisfaction.
          </p>
        </div>
        <div className="w-full rounded-2xl grid lg:grid-cols-3 grid-cols-2 gap-2 p-2">
          {dataOffering.map((data) => (
            <div
              key={data.id}
              className="p-2 flex flex-col gap-1 rounded-lg shadow-md border-slate-50/20 border-[1px] w-full"
            >
              <span>{data.icons}</span>
              <h1 className="font-bold lg:text-2xl text-[15px]">
                {data.title}
              </h1>
              <p className="font-light lg:text-md text-[15px]">{data.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </SliderInOut>
  );
};
