"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Img from "next/image";

export default function Hero() {
  const ref = React.createRef<HTMLDivElement>();
  const isInView = useInView(ref);

  return (
    <motion.main className="flex flex-col lg:h-screen w-full items-center justify-center">
      <motion.section
        className="flex lg:flex-row flex-col w-full h-full items-center"
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="flex flex-col items-center justify-center lg:w-1/2 w-full p-4 lg:pl-20 lg:pr-20">
          <motion.h1
            className="text-2xl lg:text-6xl font-bold text-start"
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hello, I'm{" "}
            <span className="text-slate-600 font-light">Ahmad Gustiawan</span>{" "}
            Anton Sumekah
            <br />
          </motion.h1>
          <motion.p
            className="w-full text-start text-md lg:text-2xl font-extralight"
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            dolore amet earum quis doloremque enim, qui nisi architecto hic
            deleniti at odit nesciunt consectetur sequi illo tempora! Unde,
            delectus corporis?
          </motion.p>
        </motion.div>
        <motion.div
          className="flex items-center"
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Img
            src="/assets/skets.png"
            alt="experton"
            width={800}
            height={800}
            className="filter"
          />
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
