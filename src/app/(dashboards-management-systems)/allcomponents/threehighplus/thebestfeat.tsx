import SliderInOut from "@/components/reusable/sliderinout";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa";
const dataServices = [
  {
    id: 1,
    title: "Rinjani Lens",
    desc: "Experience the breathtaking beauty of Mount Rinjani with our exclusive tour package! Our knowledgeable guides will take you on an unforgettable journey, showcasing the stunning landscapes and rich culture of this iconic Indonesian destination.",
    img: "/threehighplus/images/rinjanitrekking-3.jpg",
    link: "#",
  },
  {
    id: 2,
    title: "The Gilis",
    desc: "Discover the beauty of the Gilis with our exclusive tour package! Experience the stunning beaches, crystal-clear waters, and vibrant marine life of these tropical islands. Our knowledgeable guides will take you on an unforgettable journey, showcasing the best of what the Gilis have to offer.",
    img: "/threehighplus/images/gili-2.jpg",
    link: "#",
  },
  {
    id: 3,
    title: "Cultural Heritage",
    desc: "Experience the rich cultural heritage of Lombok with our exclusive tour package! Immerse yourself in the local traditions, customs, and history of this beautiful island. Our knowledgeable guides will take you on a journey through time, showcasing the best of Lombok's cultural treasures.",
    img: "/threehighplus/images/culture-1.jpg",
    link: "#",
  },
];
export default function TheBestFeature() {
  return (
    <SliderInOut>
      <main className="h-auto p-8">
        <section className="flex flex-col">
          <div className="w-full p-2 flex flex-col h-auto items-end justify-center">
            <h1 className="font-light">Our Services</h1>
            <h1 className="font-bold text-[30px] md:text-4xl lg:text-5xl">
              What's Make As The Best
            </h1>
            <p className="lg:w-1/2 w-full font-light text-end lg:text-md text-[15px]">
              We believe that our tour service is about creating a high-quality
              working environment that is sustainable for both nature and
              society. We aim to make a positive impact on local communities and
              the environment, while also giving travelers an unforgettable
              experience. Join us and let's make some amazing memories together!
            </p>
          </div>
        </section>
        <div className="flex lg:flex-row flex-col gap-4">
          {dataServices.map((data) => (
            <div
              key={data.id}
              className="lg:w-1/3 w-full p-2 bg-slate-600/10 rounded-lg gap-2 flex flex-col shadow-md border-slate-50/20 border-[1px]"
            >
              <div>
                <Image
                  src={`${data.img}`}
                  width={1000}
                  height={1000}
                  alt="Traditions of Bayan Tribe"
                  className="rounded-lg w-full shadow-md"
                />
              </div>
              <div className="flex flex-col gap-2 p-2">
                <h1 className="font-bold lg:text-2xl text-[20px]">
                  {data.title}
                </h1>
                <p className="font-light lg:text-md text-[15px]">{data.desc}</p>
                <div className="gap-3 flex items-center">
                  <a href={data.link}>more info</a>
                  <FaChevronRight className="inline-block" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </SliderInOut>
  );
}