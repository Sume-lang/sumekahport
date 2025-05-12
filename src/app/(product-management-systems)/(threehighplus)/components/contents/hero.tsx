"use client";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function Hero() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.main
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="flex lg:flex-row flex-col lg:h-[80vh] h-[60vh] w-full items-center justify-center"
      style={{
        backgroundImage: "url('/threehighplus/images/gili-3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="bg-gradient-to-t from-[#030E36]/120 to-[#00163B]/5 w-full h-full flex flex-col lg:flex-row items-center justify-between lg:pr-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2 lg:items-start items-start lg:justify-center justify-center lg:w-[50%] w-full h-full p-5"
        >
          <div>
            <h1 className="text-3xl lg:text-5xl font-bold uppercase">
              Experiencing the Magic of{" "}
              <span className="text-slate-900 lg:text-5xl font-extrabold">
                Lombok Island
              </span>{" "}
              in A day
            </h1>
            <p className="lg:text-md text-[15px] text-slate-50 font-light">
              Explore the Hidden Paradise of Lombok Island with us. We provide a
              variety of tour packages that cater to your needs and desires.
              From volcanic mountains to crystal-clear waters, we will take you
              on an unforgettable journey through the unspoiled beauty of
              Lombok.
            </p>
          </div>
          <div className="w-full flex flex-row gap-2 lg:gap-5 items-center justify-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="https://www.youtube.com"
                className="h-full text-sm lg:text-lg text-start font-light p-2 rounded-md hover:bg-slate-800 hover:text-slate-50 w-[150px] transition-all duration-300 ease-linear mt-4 border-slate-50/40 border flex items-center justify-center gap-10"
              >
                About us
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-row gap-2 lg:gap-5 items-center justify-between h-full p-2 mt-4"
            >
              <FaInstagram
                className="text-slate-50 text-2xl lg:text-3xl hover:text-slate-400 transition-all duration-300 ease-linear cursor-pointer"
                onClick={() =>
                  window.open("https://www.instagram.com", "_blank")
                }
              />
              <FaWhatsapp
                className="text-slate-50 text-2xl lg:text-3xl hover:text-slate-400 transition-all duration-300 ease-linear cursor-pointer"
                onClick={() =>
                  window.open("https://wa.me/6285238026604", "_blank")
                }
              />
              <Mail
                className="text-slate-50 text-2xl lg:text-3xl hover:text-slate-400 transition-all duration-300 ease-linear cursor-pointer"
                onClick={() =>
                  window.open("mailto:ahmad.sumekah@gmail.com", "_blank")
                }
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}
