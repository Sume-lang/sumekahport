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
    link: "/createpost/blogpost",
  },
  {
    name: "Experience",
    icon: <FileClock size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/experiences",
  },
  {
    name: "Education",
    icon: <GraduationCap size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/educations",
  },

  {
    name: "Project",
    icon: <Lightbulb size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/project",
  },
  {
    name: "References",
    icon: <BookMarked size={25} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/references",
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
    <aside
      className={`fixed top-0 right-72 w-auto h-auto p-5 transition duration-500 ease-in-out z-50  rounded-md ${
        isMouseActive ? "opacity-100" : "opacity-10"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-row gap-5 h-full">
        {NavigationsData.map(({ name, icon, link }, index) => (
          <Link
            key={index}
            href={link}
            className="flex items-center justify-center gap-2 p-2 w-full hover:bg-slate-600/20 rounded-md cursor-pointer"
          >
            <span className="font-extralight flex flex-row items-center gap-2 text-sm">
              {icon}
              {name}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
