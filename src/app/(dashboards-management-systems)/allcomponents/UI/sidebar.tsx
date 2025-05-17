"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconLogout } from "@tabler/icons-react";
import { House, History, PencilIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FaPeopleGroup } from "react-icons/fa6";

export default function MySidebar() {
  // Define your custom navigation links
  const links = [
    {
      label: "Home",
      href: "/Dashboards/threehighplus",
      icon: (
        <House size={40} strokeWidth={1.25} className="h-5 w-5 shrink-0 " />
      ),
    },
    {
      label: "Create Itinaries",
      href: "/Dashboards/threehighplus/createItinary",
      icon: (
        <History size={40} strokeWidth={1.25} className="h-5 w-5 shrink-0 " />
      ),
    },
    {
      label: "Create News",
      href: "/Dashboards/threehighplus/createpostnews",
      icon: (
        <PencilIcon
          size={40}
          strokeWidth={1.25}
          className="h-5 w-5 shrink-0 "
        />
      ),
    },
    {
      label: "Create User",
      href: "/Dashboards/threehighplus/createemployee",
      icon: (
        <FaPeopleGroup
          size={40}
          strokeWidth={1.25}
          className="h-5 w-5 shrink-0 "
        />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconLogout className="h-5 w-5 shrink-0 " />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <MyLogo /> : <MyLogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "THP",
                href: "/threehighplus",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center ">
                    THP
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* Your page content goes here */}
    </div>
  );
}

// Custom logo components
export const MyLogo = () => {
  return (
    <Link
      href="/threehighplus"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal "
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-emerald-500 dark:bg-emerald-400" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre "
      >
        THP
      </motion.span>
    </Link>
  );
};

export const MyLogoIcon = () => {
  return (
    <Link
      href="/threehighplus"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal "
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-emerald-500 dark:bg-emerald-400" />
    </Link>
  );
};
