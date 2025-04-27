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
    icon: <House size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/",
  },
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost",
  },
  {
    name: "Blogpost",
    icon: <Newspaper size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/blogpost",
  },
  {
    name: "Experience",
    icon: <FileClock size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/experiences",
  },
  {
    name: "Education",
    icon: <GraduationCap size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/educations",
  },

  {
    name: "Project",
    icon: <Lightbulb size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/project",
  },
  {
    name: "References",
    icon: <BookMarked size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "/createpost/references",
  },
  {
    name: "Email",
    icon: <MailIcon size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "mailto:ahmad.sumekah@gmail.com",
  },
];
export default function SideNavigation() {
  const [isMouseActive, setIsMouseActive] = useState(false);

  const handleMouseEnter = () => setIsMouseActive(true);
  const handleMouseLeave = () => setIsMouseActive(false);

  return (
    <aside
      className={`fixed top-1/2 -translate-y-1/2 right-4 w-[5%] h-auto p-5 transition duration-500 ease-in-out z-50 border-[#faad86]/20 border-[1px] rounded-md ${
        isMouseActive ? "opacity-100" : "opacity-10"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="flex flex-col items-center justify-center gap-5 h-full">
        {NavigationsData.map(({ icon, link }, index) => (
          <Link
            key={index}
            href={link}
            className="flex items-center justify-center gap-2 p-2 w-full hover:bg-slate-600/20 rounded-md cursor-pointer"
          >
            {icon}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
