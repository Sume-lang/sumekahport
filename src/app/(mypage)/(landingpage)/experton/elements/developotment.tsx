import { icons } from "lucide-react";
import {
  FaBrain,
  FaBug,
  FaChartBar,
  FaCheck,
  FaCode,
  FaCodeBranch,
  FaCss3,
  FaDatabase,
  FaGoogle,
  FaJs,
  FaMap,
  FaMicrosoft,
  FaNodeJs,
  FaReact,
  FaTable,
  FaUikit,
  FaVoteYea,
} from "react-icons/fa";

export default function Developer() {
  const Datadev = [
    {
      name: "Full Stack Developer",
      date: "2022 - Present",
      child: [
        {
          name: "UI/UX Designer",
          icons: <FaUikit size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "NextJS",
          icons: <FaCode size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "tailwindcss",
          icons: <FaCss3 size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "Typescript",
          icons: <FaCode size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "Javascript",
          icons: <FaJs size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "MySql",
          icons: <FaDatabase size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "NodeJS",
          icons: <FaNodeJs size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "React",
          icons: <FaReact size={20} strikethroughThickness={0.5} />,
        },
        {
          name: "Rest API",
          icons: <FaCode size={20} strikethroughThickness={0.5} />,
        },
      ],
    },
    {
      name: "Project Management",
      date: "2021 - Present",
      child: [
        {
          name: "Logical Framework",
          icons: <FaBrain size={20} />,
        },
        {
          name: "SWOT Analysis",
          icons: <FaTable size={20} />,
        },
        {
          name: "Risk Management",
          icons: <FaBug size={20} />,
        },
        {
          name: "PMR",
          icons: <FaCheck size={20} />,
        },
      ],
    },
    {
      name: "Information Management",
      date: "2017 - Present",
      child: [
        {
          name: "Google Workspace",
          icons: <FaGoogle size={20} />,
        },
        {
          name: "Microsoft 365",
          icons: <FaMicrosoft size={20} />,
        },
        {
          name: "Data Collection",
          icons: <FaVoteYea size={20} />,
        },
        {
          name: "Data Analysis",
          icons: <FaChartBar size={20} />,
        },
        {
          name: "Neworking Management",
          icons: <FaCodeBranch size={20} />,
        },
        {
          name: "Mapping",
          icons: <FaMap size={20} />,
        },
      ],
    },
  ];
  return (
    <main className="flex lg:flex-row flex-col items-center justify-center w-full h-full gap-2">
      {Datadev.map((item, index) => (
        <section
          key={index}
          className="flex flex-col items-start justify-start gap-2 lg:w-1/2 w-full h-full border-[#faad86]/20 border-[1px] p-4 rounded-xl"
        >
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-sm font-light">{item.date}</p>
          <div className="gap-2 w-full grid grid-cols-2">
            {item.child.map((item, index) => (
              <div key={index} className="gap-2 mt-1 flex flex-row items-center">
                <span>{item.icons}</span>
                <h1 className="text-md">{item.name}</h1>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
