"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";

import axios, { AxiosError } from "axios";

const NavLinks = ({ closeDropDown }: { closeDropDown: () => void }) => {
  const pathname = usePathname();
  const navlinks = [
    {
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      text: "News",
      href: "/news",
    },
    {
      text: "Notices",
      href: "/notices",
    },
    {
      text: "Downloads",
      href: "/downloads",
    },
    {
      text: "Reports",
      href: "/reports",
    },
  ];
  return (
    <>
      {navlinks.map((item, i) => {
        return (
          <li key={i} onClick={closeDropDown}>
            <Link
              href={item.href}
              className={`block py-2 pl-3 pr-4 ${
                pathname !== item.href
                  ? "text-gray-900 hover:bg-green-300 hover:border-l-4 hover:border-green-700"
                  : "text-gray-900 bg-green-300 hover:bg-green-500 hover:text-white border-l-4 border-green-700"
              } `}
            >
              {item.text}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default function UserDashboard() {
  const [userDropDown, setUserDropDown] = useState(false);
  const [navMenu, setNavMenu] = useState(false);
  const router = useRouter();

  const closeDropDown = () => {
    setNavMenu(false);
    setUserDropDown(false);
  };

  const handleLogOut = () => {
    axios
      .post("/api/logout")
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="bg-white shadow-sm shadow-gray-200 sticky top-0 z-50">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto py-3">
        <div className="flex items-center justify-between w-full">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  outline-none "
            onClick={() => setNavMenu(!navMenu)}
          >
            <GiHamburgerMenu className="w-8 h-8" />
          </button>
          <div className="flex gap-3 px-3 items-center">
            <div className=" relative">
              <button
                type="button"
                className="flex mr-3 text-sm  rounded-full items-center gap-1"
                onClick={() => setUserDropDown(!userDropDown)}
              >
                <CiUser className="text-gray-500 h-7 w-7" />
                <h4 className="font-bold text-gray-600 text-base md:block hidden">
                  Admin
                </h4>
              </button>
            </div>
            <button className="w-auto h-full" onClick={handleLogOut}>
              <IoIosLogOut className="text-green-500 h-7 w-7" />
            </button>
          </div>
        </div>
        <div className="items-center justify-between flex w-full  relative  flex-col z-10">
          <div
            className={`absolute h-[100dvh] mt-3 left-0 overflow-hidden box-border transition-all duration-300  shadow-2xl ${
              navMenu ? "w-56" : "w-0"
            }`}
          >
            <ul
              className={`flex flex-col font-medium pt-8 backdrop-blur-md bg-green-100 bg-opacity-50 h-full box-border gap-3`}
            >
              <NavLinks closeDropDown={closeDropDown} />
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
