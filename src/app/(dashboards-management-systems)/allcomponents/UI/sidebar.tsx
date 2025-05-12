"use client";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function MySidebar() {
  // Define your custom navigation links
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome className="h-5 w-5 shrink-0 " />
      ),
    },
    {
      label: "Profile",
      href: "/profile",
      icon: (
        <IconUser className="h-5 w-5 shrink-0 " />
      ),
    },
    {
      label: "Settings",
      href: "/settings",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 " />
      ),
    },
    {
      label: "Logout",
      href: "/logout",
      icon: (
        <IconLogout className="h-5 w-5 shrink-0 " />
      ),
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
                href: "/profile",
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
    <a
      href="/"
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
    </a>
  );
};

export const MyLogoIcon = () => {
  return (
    <Link
      href="/"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal "
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-emerald-500 dark:bg-emerald-400" />
    </Link>
  );
};
