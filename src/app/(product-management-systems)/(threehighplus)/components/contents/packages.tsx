'use client';
import { motion } from 'framer-motion'
import { useState, useRef,useEffect } from 'react';
import { ChevronRight } from "lucide-react";
import Img from "next/image";
import Link from "next/link";
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
    desc: "",
    link: "#",
  },
  {
    id: 3,
    Image: "/threehighplus/images/rinjanitrekking-4.jpg",
    title: "Rinjani Stonning View",
    desc: "",
    link: "#",
  },
  {
    id: 4,
    Image: "/threehighplus/images/diving-2.jpg",
    title: "Dive to Life",
    desc: "",
    link: "#",
  },
  {
    id: 5,
    Image: "/threehighplus/images/diving-2.jpg",
    title: "Dive to Life",
    desc: "",
    link: "#",
  },
];

export default function Packages() {
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
      className="h-auto p-8"
    >
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-4 flex items-center justify-center"
      >
        <h1 className="text-3xl lg:text-5xl font-bold">
          Most Popular Tour <span className="text-slate-300">In Lombok</span>
        </h1>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="lg:grid grid-cols-4 flex lg:flex-row flex-col gap-2 lg:items-start"
      >
        {PackRinjani.map((items) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
              <p className="font-light lg:text-[15px] text-[12px]">
                {items.desc}
              </p>
              <Link
                href={`${items.link}`}
                className="flex items-center mt-2 font-light"
              >
                More <ChevronRight />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.section>
    </motion.main>
  );
}
