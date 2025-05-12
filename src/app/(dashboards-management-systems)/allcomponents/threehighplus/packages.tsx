
import { ChevronRight } from "lucide-react";
import Img from "next/image";
import Link from "next/link";
import SliderInOut from "@/components/reusable/sliderinout";
const PackRinjani = [
  {
    id: 1,
    Image: "/threehighplus/images/rinjanitrekking-2.jpg",
    title: "Rinjani Trekking Adventure",
    desc: "Join us for an unforgettable trekking experience on Mount Rinjani.",
    link: "#",
  },
  {
    id: 2,
    Image: "/threehighplus/images/rinjanitrekking-3.jpg",
    title: "Rinjani Stonning View",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, modi.",
    link: "#",
  },
  {
    id: 3,
    Image: "/threehighplus/images/rinjanitrekking-4.jpg",
    title: "Rinjani Stonning View",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, modi.",
    link: "#",
  },
  {
    id: 4,
    Image: "/threehighplus/images/diving-2.jpg",
    title: "Dive to Life",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, modi.",
    link: "#",
  },
  {
    id: 5,
    Image: "/threehighplus/images/diving-2.jpg",
    title: "Dive to Life",
    desc: "lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, modi.",
    link: "#",
  },
];

export default function Packages() {
  return (
    <SliderInOut>
      <main className="h-auto p-8">
        <section className="mb-4 flex items-center justify-center">
          <h1 className="text-3xl lg:text-5xl font-bold">
            Most Popular Tour <span className="text-slate-300">In Lombok</span>
          </h1>
        </section>
        <section className="lg:grid grid-cols-4 flex lg:flex-row flex-col gap-2 lg:items-start">
          {PackRinjani.map((items) => (
            <div
              key={items.id}
              className="flex lg:flex-col flex-row lg:items-start items-center border-[1px] border-slate-50/20 rounded-lg shadow-md p-1 w-full"
            >
              <div className="p-4 lg:p-2 w-1/2 lg:w-full h-full">
                <Img
                  src={`${items.Image}`}
                  alt="Rinjani"
                  width={500}
                  height={500}
                  className="rounded-md object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="p-4 lg:p-2 w-1/2 lg:w-full">
                <h1 className="font-bold text-lg border-b-[1px] border-slate-50/20 ">
                  {items.title}
                </h1>
                <p className="font-light lg:text-md text-[15px]">
                  {items.desc}
                </p>
                <Link
                  href={`${items.link}`}
                  className="flex items-center mt-2 font-light"
                >
                  More <ChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </SliderInOut>
  );
}
