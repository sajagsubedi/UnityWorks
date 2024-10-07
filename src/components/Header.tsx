"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image"
import logo from "@/assets/logo.png"

const NavLinks = ({ closeDropDown }: { closeDropDown: () => void }) => {
  const navlinks = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "About",
      href: "/about",
    },
    {
      text: "Services",
      href: "/services",
    },
    {
      text: "Our Team",
      href: "/our-team",
    },
    {
      text: "Contact",
      href: "/contact",
    },
    {
      text: "Signin",
      href: "/signin",
    },
    {
      text: "Signup",
      href: "/signup",
    },
  ];
  const pathname = usePathname();
  return (
    <ul
    className={`flex flex-col font-medium  md:flex-row md:space-x-8  md:p-0 md:border-0 bg-gray-900 md:bg-transparent  h-full box-border md:justify-between`}
  >
          <li  onClick={closeDropDown}>
            <Link
              href="/"
              className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
                pathname !== "/"
                  ? "text-gray-500 border-b md:text-black border-gray-600 md:border-0"
                  : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
              } md:p-0`}
            >
              HOME
            </Link>
            
          </li>

          <li  onClick={closeDropDown} >
            <Link
              href="/about-us"
              className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
                pathname !== "/about-us"
                  ? "text-gray-500 border-b md:text-black border-gray-600 md:border-0"
                  : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
              } md:p-0`}
            >
              ABOUT US
            </Link>
           
          </li>
          <li  onClick={closeDropDown}>
            <Link
              href="/"
              className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
                pathname !== "/gallery"
                  ? "text-gray-500 border-b md:text-black border-gray-600 md:border-0"
                  : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
              } md:p-0`}
            >
              GALLERY
            </Link>
          </li>
          <li  onClick={closeDropDown}>
            <Link
              href="/"
              className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
                pathname !== "/career"
                  ? "text-gray-500 border-b md:text-black border-gray-600 md:border-0"
                  : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
              } md:p-0`}
            >
              CAREER       
                   </Link>
          </li>
          <li  onClick={closeDropDown}>
            <Link
              href="/contact"
              className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
                pathname !== "/contact"
                  ? "text-gray-500 border-b md:text-black border-gray-600 md:border-0"
                  : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
              } md:p-0`}
            >
              CONTACT US
            </Link>
          </li>
    </ul>
  );
};

function Header() {
  const [navMenu, setNavMenu] = useState(false);
  const closeDropDown = () => {
    setNavMenu(false);
  };
  return (
    <nav className="bg-gray-50 px-0 py-1 box-border gap-4 sticky top-0  h-20 z-50 border-b-4 border-green-500">
    <div className="w-full flex flex-wrap items-center justify-between mx-auto h-full ">
      <Link href="/" className="flex items-center h-full">
        <Image src={logo} alt="logo" className="h-12  w-auto"/>
      </Link>
      <div className="flex items-center md:order-2">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden outline-none "
          onClick={() => setNavMenu(!navMenu)}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div className="items-center justify-between flex w-full md:flex  md:order-1 relative  flex-col z-10 md:w-[70%]">
        <div
          className={`  absolute w-full md:static  md:h-auto overflow-hidden box-border transition-all duration-300  shadow-2xl  md:shadow-none md:mt-0 ${
            navMenu ? "h-[100vh]" : "h-0"
          }`}
        >
            <NavLinks closeDropDown={closeDropDown} />
        </div>
      </div>
    </div>
  </nav>
  );
}

export default Header;
