"use client";
import { motion } from "framer-motion";
export default function ProblemSolfing() {
  return (
    <motion.main
      className="flex flex-col h-full w-full items-center justify-center p-2 delay-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl lg:text-6xl font-bold text-center"
      >
        How I Solve the <span className="text-slate-50">Problem</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-extralight text-center lg:w-1/2 w-full mt-2"
      >
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni sapiente
        esse suscipit facilis nostrum officia natus provident repudiandae.
        Exercitationem nemo distinctio incidunt molestias consequatur
        reprehenderit nobis aspernatur soluta. Eligendi, quos.
      </motion.p>
    </motion.main>
  );
}


