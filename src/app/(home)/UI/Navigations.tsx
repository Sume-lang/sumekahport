"use client";
import React, { useState } from "react";
import {
  GraduationCap,
  Newspaper,
  House,
  FileClock,
  Lightbulb,
  BookMarked,
  MailIcon,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";

const NavigationsData = [
  {
    name: "Home",
    icon: <House size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/",
  },
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost",
  },
  {
    name: "Blogpost",
    icon: <Newspaper size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/blogpost",
  },
  {
    name: "Experience",
    icon: <FileClock size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/experiences",
  },
  {
    name: "Education",
    icon: <GraduationCap size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/educations",
  },

  {
    name: "Project",
    icon: <Lightbulb size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/latestproject",
  },
  {
    name: "References",
    icon: <BookMarked size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/references",
  },
  {
    name: "Email",
    icon: <MailIcon size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "mailto:ahmad.sumekah@gmail.com",
  },
];
export default function SideNavigation() {
  const [isMouseActive, setIsMouseActive] = useState(false);

  const handleMouseEnter = () => setIsMouseActive(true);
  const handleMouseLeave = () => setIsMouseActive(false);

  return (
    <nav
      className={`fixed lg:top-0 lg:left-0 md:left-1/2 md:transform md:-translate-x-1/2 transform -translate-x-1/2 right-0 top-1/4 w-[5%] h-auto p-5 transition duration-500 ease-in-out z-50 rounded-md ${
        isMouseActive ? "opacity-100" : "opacity-50"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex lg:flex-row flex-col items-center gap-5 md:flex-col md:items-start w-full">
        {NavigationsData.map(({ name, icon, link }, index) => (
          <Link
            key={index}
            href={link}
            className="flex items-center justify-center gap-2 p-2 w-full md:w-auto hover:bg-slate-600/20 rounded-md cursor-pointer"
          >
            <span className="font-extralight flex flex-row items-center gap-2 text-sm">
              {icon}
              <span className="lg:flex hidden">{name}</span>
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

