"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { IoIosArrowDown } from "react-icons/io";

const NavLinks = ({ closeDropDown }: { closeDropDown: () => void }) => {
  const pathname = usePathname();

  //about
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [aboutDropDownPhone, setAboutDropDownPhone] = useState(false);
  const aboutLink = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    aboutLink?.current?.addEventListener("mouseover", () => {
      setAboutDropdown(true);
    });
    aboutLink?.current?.addEventListener("mouseout", () => {
      setAboutDropdown(false);
    });
  }, []);
  const handleAboutDropDown = () => {
    setAboutDropDownPhone((e) => !e);
  };


  //career
  const [careerDropdown, setCareerDropdown] = useState(false);
  const [careerDropDownPhone, setCareerDropDownPhone] = useState(false);
  const careerLink = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    careerLink?.current?.addEventListener("mouseover", () => {
      setCareerDropdown(true);
    });
    careerLink?.current?.addEventListener("mouseout", () => {
      setCareerDropdown(false);
    });
  }, []);
  const handleCareerDropDown = () => {
    setCareerDropDownPhone((e) => !e);
  };
  useEffect(()=>{
    closeDropDown()
  },[pathname])
  return (
    <ul
      className={`flex flex-col font-medium  md:flex-row md:space-x-2  md:p-0 md:border-0 bg-gray-900 md:bg-transparent  h-full box-border md:justify-between`}
    >
      <li>
        <Link
          href="/"
          className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
            pathname !== "/"
              ? "text-gray-700 border-b md:text-black border-gray-600 md:border-0  hover:bg-green-500 hover:text-white"
              : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
          } md:p-0 text-base  font-normal`}
        >
          HOME
        </Link>
      </li>

      <li ref={aboutLink}>
        <span
          className={`flex gap-1 items-center justify-center py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
            pathname !== "/about-us"
              ? "text-gray-700 border-b md:text-black border-gray-600 md:border-0 hover:bg-green-500 hover:text-white"
              : "text-white bg-green-500 hover:bg-green-600 md:text-green-600"
          } md:p-0`}
        >
          <Link className="w-[50%] md:w-auto flex justify-end" href="/about-us">
            <span className="transform translate-x-[50%] md:translate-x-0  text-base  font-normal ">
              ABOUT US
            </span>
          </Link>
          <span className="w-[50%] md:w-auto flex justify-end pr-2">
            <IoIosArrowDown onClick={handleAboutDropDown} />
          </span>
        </span>
        <div
          className={`md:absolute w-full  bg-gray-800 md:bg-white border-md:top-10 h-0 overflow-hidden md:w-72 rounded md:shadow-lg md:shadow-gray-300 transition-all ${
            aboutDropdown ? "md:h-48" : ""
          } ${aboutDropDownPhone ? "h-52" : ""}`}
        >
          <ul className="w-full flex flex-col p-3 gap-1 md:border-t-2 md:border-green-500 justify-between h-full">
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0 ">
              <Link
                href="/about-us/introduction"
                className="text-sm text-gray-700 p-3 font-normal hover:text-green-500"
              >
                BRIEF INTRODUCTION
              </Link>
            </li>
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0">
              <Link
                href="/about-us/message-from-chairperson"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                MESSAGE FROM CHAIRPERSON
              </Link>
            </li>
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0">
              <Link
                href="/about-us/commitment-from-ceo"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                COMMITMENT FROM THE CEO
              </Link>
            </li>
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0">
              <Link
                href="/about-us/bod"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                BOARD OF DIRECTORS
              </Link>
            </li>
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0">
              <Link
                href="/about-us/our-employees"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                EMPLOYEES
              </Link>
            </li>
          </ul>
        </div>
      </li>

      <li ref={careerLink}>
        <span
          className={`flex gap-1 items-center justify-center py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
            pathname !== "/about-us"
              ? "text-gray-700 border-b md:text-black border-gray-600 md:border-0 hover:bg-green-500 hover:text-white"
              : "text-white bg-green-500 hover:bg-green-600 md:text-green-600"
          } md:p-0`}
        >
          <Link className="w-[50%] md:w-auto flex justify-end" href="/about-us">
            <span className="transform translate-x-[50%] md:translate-x-0 text-base  font-normal ">
              CAREER
            </span>
          </Link>
          <span className="w-[50%] md:w-auto flex justify-end pr-2">
            <IoIosArrowDown onClick={handleCareerDropDown} />
          </span>
        </span>
        <div
          className={`md:absolute w-full  bg-gray-800 md:bg-white border-md:top-10 h-0 overflow-hidden md:w-72 rounded md:shadow-lg md:shadow-gray-300 transition-all ${
            careerDropdown ? "md:h-40" : ""
          } ${careerDropDownPhone ? "h-44" : ""}`}
        >
          <ul className="w-full flex flex-col pl-2 gap-2 pt-4 md:border-t-2 md:border-green-500 justify-between h-full">
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0 ">
              <Link
                href="/about-us"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                VACANCY NOTICE
              </Link>
            </li>
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0">
              <Link
                href="/about-us"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                SHORTLISTING
                </Link>
            </li>
            <li className="border-b border-gray-500 w-full text-center md:text-left md:border-b-0">
              <Link
                href="/about-us"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                SCREENING
              </Link>
            </li>
            <li className="border-b border-gray-500 w-futext-center md:text-left text-center md:border-b-0">
              <Link
                href="/about-us"
                className="text-sm text-gray-700 p-3  font-normal hover:text-green-500"
              >
                SELECTION
              </Link>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <Link
          href="/"
          className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
            pathname !== "/career"
              ? "text-gray-700 border-b md:text-black border-gray-600 md:border-0  hover:bg-green-500 hover:text-white"
              : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
          } md:p-0 text-base  font-normal `}
        >
          GALLERY
          </Link>
      </li>
      <li>
        <Link
          href="/branch"
          className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
            pathname !== "/career"
              ? "text-gray-700 border-b md:text-black border-gray-600 md:border-0  hover:bg-green-500 hover:text-white"
              : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
          } md:p-0 text-base  font-normal`}
        >
          BRANCH
          </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`block py-3  text-center md:hover:bg-transparent md:hover:text-green-500 md:bg-transparent  ${
            pathname !== "/contact"
              ? "text-gray-700 border-b md:text-black border-gray-600 md:border-0  hover:bg-green-500 hover:text-white"
              : "text-white bg-green-500 hover:bg-green-700 md:text-green-600"
          } md:p-0  text-base  font-normal`}
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
    <nav className="bg-gray-50 px-0 py-1 box-border gap-4 sticky top-0  h-20 z-50 border-b-4 border-green-500 md:px-[5vw]">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto h-full ">
        <Link href="/" className="flex items-center h-full">
          <Image src={logo} alt="logo" className="h-12  w-auto" />
        </Link>
        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-700 rounded-lg md:hidden outline-none "
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
        <div className="items-center justify-between  flex w-full md:flex  md:order-1 relative  flex-col z-10 md:w-[60%] md:pl-10">
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
