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

const Doing = [
  {
    title: "Web Development",
    description:
      "I'm a web developer with a passion for creating beautiful and functional websites. I have experience with HTML, CSS, JavaScript, and React. I'm always looking to improve my skills and learn new technologies.",
    child: [
      {
        name: "Ui/Ux",
        icons: <FaUikit size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "NextJS",
        icons: <FaCode size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "tailwindcss",
        icons: <SiTailwindcss size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Typescript",
        icons: <SiTypescript size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Javascript",
        icons: <FaJs size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "MySql",
        icons: <SiMysql size={40} strikethroughThickness={0.5} />,
      },
      {
        name: "NodeJS",
        icons: <FaNodeJs size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "React",
        icons: <FaReact size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Rest API",
        icons: <FaCode size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Git",
        icons: <FaGithub size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Firebase",
        icons: <SiFirebase size={30} strikethroughThickness={0.5} />,
      },
    ],
  },
  {
    title: "Project Develepment",
    description:
      "Throughout my journey, I successfully facilitated government relations for Indigenous organizations, securing essential funding from the Right Resource Initiative Group and ensuring the recognition of 13 Indigenous communities in North Lombok.",
    child: [
      {
        name: "Project Monitoring",
        icons: <FaCheck size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Idea",
        icons: <FaBrain size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Relations",
        icons: <FaPeopleRobbery size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Logical Framework",
        icons: <FaTable size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Brain Storming",
        icons: <FaClipboard size={30} strikethroughThickness={0.5} />,
      },
    ],
  },
  {
    title: "Data Analysis",
    description:
      "In each of my roles, I utilized data analysis to inform decision-making and optimize project outcomes. From evaluating education strategies to assessing disaster response efficacy, I leveraged data to provide actionable insights that drove success.",
    child: [
      {
        name: "R Studio",
        icons: <SiRstudioide size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Python",
        icons: <SiPython size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Collection",
        icons: <BiSolidDownvote size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "Aggregation",
        icons: <FaChartPie size={30} strikethroughThickness={0.5} />,
      },
      {
        name: "GIS",
        icons: <SiGooglemaps size={30} strikethroughThickness={0.5} />,
      },
    ],
  },
];
export default function WhatIdo() {
  return (
    <main className="h-full w-full p-2 flex lg:flex-row flex-col gap-2">
      <section className="flex lg:flex-row flex-col lg:w-1/4 w-full bg-[#faad86]/10 p-2">
        <div className="w-full flex flex-col">
          <h1 className="text-2xl font-bold">
            What <span className="font-light text-slate-50">I Do</span>
          </h1>
          <p className="text-sm font-extralight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            natus dicta, quidem, autem nesciunt debitis, ex eos voluptatum rerum
            ipsa doloremque hic iste est. Officiis veritatis vitae eligendi sit.
            Corporis?
          </p>
        </div>
      </section>
      <section className="flex lg:flex-row flex-col items-start justify-start w-full h-1/2 gap-2">
        {Doing.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col border-[1px] border-[#faad86]/10 p-2 rounded-lg md:p-4 md:rounded-lg"
          >
            <h1 className="text-xl font-bold">{item.title}</h1>
            <p className="text-sm font-extralight mt-1">{item.description}</p>
            <div className="flex flex-col items-start justify-start w-full h-full mt-2">
              {item.child.length > 0 ? (
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4  gap-4 w-full h-full">
                  {item.child.map((child, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-start w-full h-full p-2 bg-[#faad86]/2 rounded-lg shadow-lg/5"
                    >
                      <p className="text-center">{child.icons}</p>
                      <p className="text-sm font-extralight mt-1 text-center">
                        {child.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-extralight mt-1">
                  No skills available
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
