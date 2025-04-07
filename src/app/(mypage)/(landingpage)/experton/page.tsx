import React from "react";
import Skill from "./elements/skills";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Dancing_Script } from "next/font/google";
import {
  LayoutDashboard,
  Activity,
  Braces,
  GraduationCap,
  FileCheck2,
  History,
} from "lucide-react";
const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});
export default function LandingPage() {
  const Icons = [
    {
      icons: (
        <LayoutDashboard
          size={48}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="w-10 h-10"
        />
      ),
      name: "Dashboard",
      link: "/experton",
    },
    {
      icons: (
        <Activity
          size={48}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="w-10 h-10"
        />
      ),
      name: "Dashboard",
    },
    {
      icons: (
        <Braces
          size={48}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="w-10 h-10"
        />
      ),
      name: "Dashboard",
    },
    {
      icons: (
        <GraduationCap
          size={48}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="w-10 h-10"
        />
      ),
      name: "Dashboard",
    },
    {
      icons: (
        <History
          size={48}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="w-10 h-10"
        />
      ),
      name: "Dashboard",
    },
    {
      icons: (
        <FileCheck2
          size={48}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="w-10 h-10"
        />
      ),
      name: "Dashboard",
    },
  ];

  return (
    <main className="flex flex-col bg-gradient-to-br from-gray-800 to-gray-950 text-white min-h-screen">
      <section className="flex items-center justify-center">
        <div className="mx-auto p-4 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2">
              <img
                src="/assets/myprofiles.png"
                alt="Profile Image"
                className="rounded-full border-b-[1px] border-slate-50/20 shadow-lg lg:ml-8"
              />
            </div>
            <div className="w-full lg:pl-8 lg:mt-0 mt-12">
              <h1
                className={`${dancing.className} text-4xl lg:text-5xl font-extrabold mb-4 text-center lg:text-left`}
              >
                Hi, I'm Anton Sumekah
              </h1>
              <p className="text-md lg:text-xl mb-6 text-center lg:text-left font-light">
                Proficient in Technology System and Data Processing. Organized
                and dependable candidate successful at managing multiple
                priorities with a positive attitude. Willingness to take on
                added responsibilities to meet team goals.
              </p>
              <div className="flex items-center justify-center lg:justify-start">
                <a
                  href="https://github.com/experton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition mr-4"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com/experton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition mr-4"
                >
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/experton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-gray-800 transition"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-1 text-center ">
            Things I do for you to <br />
            <span className="font-light">make the works efficiently</span>
          </h1>
          <p className="text-md mb-6 font-light lg:w-1/2 w-full text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae iste
            reprehenderit consectetur incidunt quas non dignissimos autem at,
            maxime minus dolorum officia quod sapiente, cumque cupiditate est
            mollitia nisi soluta!
          </p>
        </div>
        <div className="lg:flex hidden w-[100px] bg-slate-900 p-2 flex-col items-center justify-center rounded-md shadow-lg fixed top-1/2 right-0 transform -translate-y-1/2">
          {Icons.map((item, index) => (
            <div
              className="flex flex-col items-center justify-center p-4"
              key={index}
            >
              <a
                href={item.link}
                className="hover:scale-110 transition duration-300 ease-in-out"
              >
                {item.icons}
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className="lg:p-24 p-4 min-h-screen">
        <Skill />
      </section>
    </main>
  );
}
