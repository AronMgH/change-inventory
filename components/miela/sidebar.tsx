"use client";
import * as React from "react";
import * as Icons from "@radix-ui/react-icons";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function SideBar() {
  const navs = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "HomeIcon",
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: "CubeIcon",
    },
    {
      name: "History",
      path: "/history",
      icon: "ClockIcon",
    },
    {
      name: "Account",
      path: "/account",
      icon: "PersonIcon",
    },
    {
      name: "Accounts",
      path: "/accounts",
      icon: "PersonIcon",
    },
    {
      name: "Logout",
      path: "/",
      icon: "ArrowLeftIcon",
    },
  ];

  const pathname = usePathname();

  return (
    <>
      {navs.map((nav, index) => {
        const IconComponent = (Icons as any)[nav.icon];
        // console.log(pathname, nav.path)
        const isActive = (pathname == nav.path);
        return (
          <Link
            href={nav.path}
            key={index}
            className={`flex items-center justify-left w-full px-4 py-2 text-sm hover:text-underline ${ isActive ? "text-orange-400" : "text-white" }`}
          >
            <IconComponent />
            <span className="pl-4">{nav.name}</span><span>{isActive} </span>
          </Link>
        );
      })}
    </>
  );
}
