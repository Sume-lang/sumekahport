"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CarFront,
  BadgePercent,
  Headset,
  ChartLine,
  HandPlatter,
} from "lucide-react";
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
    img: "/threehighplus/images/culture-5.jpg",
    link: "#",
  },
];

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
];

export const Services = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const position = ref.current.getBoundingClientRect();
        setIsInView(
          position.top <= window.innerHeight && position.bottom >= 0
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      ref={(el) => {
        if (el) {
          ref.current = el;
        }
      }}
      className="p-8 w-full flex flex-col rounded-xl gap-8 min-h-screen"
    >
      <section className="flex lg:flex-row flex-col gap-2">
        <div className="w-full p-2 flex flex-col gap-2 h-auto items-start justify-center">
          <h1 className="font-bold text-[30px] md:text-4xl lg:text-5xl">
            Why Choose Us?
          </h1>
          <p className="w-full font-light">
            We are committed to providing our customers with the best possible
            experience. Our team of experts is dedicated to ensuring that every
            aspect of your trip is perfect, from the moment you book until you
            return home. We take pride in our attention to detail and our
            commitment to customer satisfaction.
          </p>
        </div>
        <div className="w-full border-[1px] border-slate-50/20 rounded-2xl grid lg:grid-cols-3 grid-cols-2 gap-2 p-2">
          {dataOffering.map((data) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              key={data.id}
              className="p-2 flex flex-col gap-1 rounded-lg shadow-md border-slate-50/20 border-[1px] w-full"
            >
              <span>{data.icons}</span>
              <h1 className="font-bold lg:text-2xl text-[15px]">
                {data.title}
              </h1>
              <p className="font-light">{data.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-2 mt-24"
      >
        <div className="w-full p-2 flex flex-col gap-2 h-auto items-end justify-center">
          <h1 className="font-light">Our Services</h1>
          <h1 className="font-bold text-[30px] md:text-4xl lg:text-5xl">
            What's Make As The Best
          </h1>
          <p className="lg:w-1/2 w-full font-light text-end">
            We believe that our tour service is about creating a high-quality
            working environment that is sustainable for both nature and society.
            We aim to make a positive impact on local communities and the
            environment, while also giving travelers an unforgettable
            experience. Join us and let's make some amazing memories together!
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex lg:flex-row flex-col gap-4"
        >
          {dataServices.map((data) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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
                <p className="font-light">{data.desc}</p>
                <div className="gap-3 flex items-center">
                  <a href={data.link}>more info</a>
                  <FaChevronRight className="inline-block" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

