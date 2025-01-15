import React from "react";
import { FaHome } from "react-icons/fa";
import { LuFileQuestion } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-6 flex justify-center">
          <Image
            src={logo}
            alt={"logo"}
            className="w-80 md:w-[400px] shadow-3xl shadow-gray-100"
          />
        </div>
        <div className="mb-8 flex justify-center">
          <LuFileQuestion className="h-32 w-32 text-green-500 animate-pulse" />
        </div>

        <h1 className="text-6xl font-bold text-green-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-green-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-green-600 mb-8">
          Oops! The page you're looking for seems to have gone on an unexpected
          journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 w-max"
            href="/"
          >
            <FaHome className="w-5 h-5 mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
