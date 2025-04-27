"use client";
import React from "react";
import {
  Activity,
  CircleCheck,
  ContactRound,
  Database,
  House,
} from "lucide-react";

const NavigationsData = [
  {
    name: "Home",
    icon: <House size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "#",
  },
  {
    name: "Activities",
    icon: <Activity size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "#",
  },
  {
    name: "Checklist",
    icon: <CircleCheck size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "#",
  },
  {
    name: "Portfolio",
    icon: <Database size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "#",
  },
  {
    name: "Contatct",
    icon: <ContactRound size={48} strokeWidth={1.5} absoluteStrokeWidth />,
    link: "#",
  },
];
export default function SideNavigation() {
  const [isMouseActive, setIsMouseActive] = React.useState(false);

  const handleMouseEnter = () => {
    setIsMouseActive(true);
  };

  const handleMouseLeave = () => {
    setIsMouseActive(false);
  };

  return (
    <main
      className={`fixed top-1/2 -translate-y-1/2 right-4 w-[5%] h-auto  p-5 rounded-md border-[#faad86]/20 border-[1px] shadow-lg transition duration-200 ease-in-out z-50 ${
        isMouseActive ? "opacity-100" : "opacity-15"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <section className="flex flex-col items-center justify-center gap-5 h-full">
        {NavigationsData.map((item, index) => (
          <div
            className="flex flex-col items-center justify-center gap-2 p-2 w-full hover:bg-slate-600/20 transition duration-150 ease-in-out rounded-md cursor-pointer"
            key={index}
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-center gap-2">
              {item.icon}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
