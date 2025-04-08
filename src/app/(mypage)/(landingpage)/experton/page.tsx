"use client";
import React from "react";
import { motion } from "framer-motion";
import Hero from "./elements/hero";
import { Dancing_Script } from "next/font/google";

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function Homepage() {
  return (
    <motion.main
      className="w-full h-full flex flex-col border-[#faad86]/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="lg:pr-24 lg:pl-24 p-4 flex lg:flex-row flex-col gap-2">
        <Hero />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-48 p-4 flex flex-col lg:flex-row h-[50vh] w-full relative">
        <div className="lg:w-1/2 w-full h-full flex items-center justify-center">
          <div className="bg-[#faad86]/20 p-4 w-full h-full flex flex-col gap-2 items-center justify-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              As a Full Stack Developer, I can create the task more{" "}
              <span className="font-light">Efficiently</span>
            </h1>
            <p className="w-full text-sm md:text-base lg:text-lg font-light">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
              nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus,
              quasi officia vitae at ex ipsa ad minima totam quas tempore magnam
              unde esse.
            </p>
          </div>
        </div>
        <div className="w-full h-full lg:pr-20 lg:pl-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-[60vh] w-full relative">
        <div className="flex flex-col w-full items-end justify-center">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            For Over <span className="font-light">8 Years</span> of Experiences
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-end">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
            nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus, quasi
            officia vitae at ex ipsa ad minima totam quas tempore magnam unde
            esse.
          </p>
        </div>
        <div className="w-full h-[50vh] flex">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <motion.section
        className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-[70vh] w-full relative"
        initial={{ y: "-5%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col w-full items-center justify-center">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Fluent in <span className="font-light">Many</span> of Digital
            Platforms <br />
            and <span className="font-light">Tools</span>
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
            nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus, quasi
            officia vitae at ex ipsa ad minima totam quas tempore magnam unde
            esse.
          </p>
        </div>
        <div className="h-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </motion.section>
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 flex flex-col items-center justify-center gap-2 h-[20vh] w-full relative bg-[#faad86]/20 border-[#faad86]/10 border-[1px]">
        <div className="h-full text-center flex flex-col items-center justify-center w-full">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            How I Solve the <span className="font-light">Problems</span> ?
          </h1>
          <h2 className={`${dancing.className} text-2xl lg:w-1/2 w-full`}>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore,
            beatae, temporibus rerum optio quas minus necessitatibus sunt iste
            voluptate cumque quod cum placeat eius, quasi in deleniti molestiae
            iure veniam!"
          </h2>
        </div>
      </section>
      <section className="h-[10vh]" />
      <section className="lg:pr-24 lg:pl-24 flex flex-col gap-2 h-[50vh] w-full relative">
        <div className="flex flex-col w-full items-start justify-start">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Breakdown My <span className="font-light">Project</span> of
            Proffesional Works <br />
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-start">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
            nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus, quasi
            officia vitae at ex ipsa ad minima totam quas tempore magnam unde
            esse.
          </p>
        </div>
        <div className="h-full flex items-start justify-start">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
      <section className="h-[10vh]" />
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-[50vh] w-full relative">
        <div className="flex flex-col w-full items-center justify-center">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            I Get <span className="font-light">Knowledge</span> From Many
            Sources <br />
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
            nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus, quasi
            officia vitae at ex ipsa ad minima totam quas tempore magnam unde
            esse.
          </p>
        </div>
        <div className="h-full flex items-start justify-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
      <section className="h-[10vh]" />
      {/* Seperator */}
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
      <section className="lg:pr-24 lg:pl-24 lg:pt-10 flex flex-col gap-2 h-[50vh] w-full relative">
        <div className="flex flex-col w-full items-end justify-end">
          {" "}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-center">
            Latest <span className="font-light">Blog</span> And Events Envolved{" "}
            <br />
          </h1>
          <p className="lg:w-1/2 w-full text-sm md:text-base lg:text-lg font-light text-end">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo
            nesciunt, quibusdam cupiditate nobis incidunt, omnis possimus, quasi
            officia vitae at ex ipsa ad minima totam quas tempore magnam unde
            esse.
          </p>
        </div>
        <div className="h-full flex items-start justify-end">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            heres in Content should be
          </h1>
        </div>
      </section>
    </motion.main>
  );
}
