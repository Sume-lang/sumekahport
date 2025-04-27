"use client";
import { motion } from "framer-motion";
export default function ProblemSolfing() {
  return (
    <motion.main 
      className="flex flex-col h-full w-full items-center justify-center p-2 lg:p-10 delay-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl lg:text-4xl text-center"
      >
        How I Solve the <span className="text-slate-50">Problem</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[15px] font-extralight text-center lg:w-1/2 w-full mt-2"
      >
        My work philosophy, "Listen, Learn, Understand, and Solve", reflects my
        commitment to thoroughly understanding challenges and delivering
        effective solutions. Proven expertise in data analysis, disaster
        recovery planning, and IT infrastructure management, with a track record
        of improving workflow efficiency by up to 35% and staff productivity by
        85%. Skilled in collaborative work ecosystems, digital transformation,
        and stakeholder engagement.
      </motion.p>
    </motion.main>
  );
}


