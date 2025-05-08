"use client";
import {
  FaBrain,
  FaCheck,
  FaCode,
  FaGithub,
  FaJs,
  FaNodeJs,
  FaReact,
  FaTable,
  FaUikit,
  FaChartPie,
  FaClipboard,
} from "react-icons/fa";
import {
  SiPython,
  SiRstudioide,
  SiGooglemaps,
  SiTailwindcss,
  SiTypescript,
  SiFirebase,
  SiMysql,
} from "react-icons/si";
import { BiSolidDownvote } from "react-icons/bi";
import { FaPeopleRobbery } from "react-icons/fa6";
import { motion } from "framer-motion";

const Doing = [
  {
    title: "Web Development",
    description:
      "I'm a web developer with a passion for creating beautiful and functional websites. I have experience with HTML, CSS, JavaScript, and React. I'm always looking to improve my skills and learn new technologies.",
    child: [
      { name: "Ui/Ux", icons: <FaUikit size={30} /> },
      { name: "NextJS", icons: <FaCode size={30} /> },
      { name: "tailwindcss", icons: <SiTailwindcss size={30} /> },
      { name: "Typescript", icons: <SiTypescript size={30} /> },
      { name: "Javascript", icons: <FaJs size={30} /> },
      { name: "MySql", icons: <SiMysql size={40} /> },
      { name: "NodeJS", icons: <FaNodeJs size={30} /> },
      { name: "React", icons: <FaReact size={30} /> },
      { name: "Rest API", icons: <FaCode size={30} /> },
      { name: "Git", icons: <FaGithub size={30} /> },
      { name: "Firebase", icons: <SiFirebase size={30} /> },
    ],
  },
  {
    title: "Project Development",
    description:
      "Throughout my journey, I successfully facilitated government relations for Indigenous organizations, securing essential funding from the Right Resource Initiative Group and ensuring the recognition of 13 Indigenous communities in North Lombok.",
    child: [
      { name: "Project Monitoring", icons: <FaCheck size={30} /> },
      { name: "Idea", icons: <FaBrain size={30} /> },
      { name: "Relations", icons: <FaPeopleRobbery size={30} /> },
      { name: "Logical Framework", icons: <FaTable size={30} /> },
      { name: "Brain Storming", icons: <FaClipboard size={30} /> },
    ],
  },
  {
    title: "Data Analysis",
    description:
      "In each of my roles, I utilized data analysis to inform decision-making and optimize project outcomes. From evaluating education strategies to assessing disaster response efficacy, I leveraged data to provide actionable insights that drove success.",
    child: [
      { name: "R Studio", icons: <SiRstudioide size={30} /> },
      { name: "Python", icons: <SiPython size={30} /> },
      { name: "Collection", icons: <BiSolidDownvote size={30} /> },
      { name: "Aggregation", icons: <FaChartPie size={30} /> },
      { name: "GIS", icons: <SiGooglemaps size={30} /> },
    ],
  },
];

export default function WhatIdo() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md"
    >
      {Doing.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-lg border-[1px] border-[#faad86]/10"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-semibold mb-2"
          >
            {item.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:text-md text-[15px] font-light mb-4"
          >
            {item.description}
          </motion.p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {item.child.map((child, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start"
              >
                <span className="text-start">{child.icons}</span>
                <p className="lg:text-md text-[12px] text-start mt-1">{child.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.main>
  );
}
