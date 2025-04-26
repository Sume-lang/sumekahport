"use client";
import Img from "next/image";
import { FaBuilding, FaUserGraduate, FaDev } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { GiOrganigram } from "react-icons/gi";
import ScrollMotion from "@/components/reusable/scrollMotion";
import { motion } from "framer-motion";

const dataProfiles = [
  {
    icons: <FaDev size={30} />,
    title: "Web Development",
    description:
      "With 2 more years of experience in Web Development, I have developed a strong foundation in building modern web applications using the latest technologies and best practices.",
  },
  {
    icons: <FaBuilding size={30} />,
    title: "Experience",
    description:
      "8 More years of experience in Project Development, including project management, team leadership, and software development. I have a proven track record of delivering high-quality projects on time and within budget.",
  },
  {
    icons: <FaUserGraduate size={30} />,
    title: "Education",
    description:
      "20 More non-formal education in online courses and Offline courses has been completed, including courses in web development, project management, and leadership.",
  },
  {
    icons: <FaPeopleRoof size={30} />,
    title: "Small Projects",
    description:
      "10 More of small projects have been completed and are still running, including web applications, mobile applications, and desktop applications.",
  },
  {
    icons: <GiOrganigram size={30} />,
    title: "Organizational",
    description:
      "Experience in multiple organizations, including as a member of the board of directors and as a project manager. I have a deep understanding of organizational structures and processes.",
  },
];
export default function Profiles() {
  return (
    <motion.main
      className="flex flex-col w-full h-full gap-2 p-2 delay-200"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <motion.section
        className="p-2 flex lg:flex-row flex-col items-center justify-center gap-2 rounded-lg lg:pr-20 lg:pl-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex lg:w-1/2 w-full items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Img
            src="/assets/8.png"
            alt="experton"
            width={800}
            height={800}
            className="filter flex items-start lg:pl-[90px] rounded-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid lg:grid-cols-3 grid-cols-2 gap-2 lg:w-1/2"
        >
          {dataProfiles.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-start justify-center p-2 border-[1px] border-[#faad86]/10 rounded-lg"
            >
              <motion.div
                className="flex items-center justify-center mt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {item.icons}
              </motion.div>
              <motion.h2
                className="text-md font-bold text-start"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                className="w-full text-start text-[12px] font-extralight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.main>
  );
}
