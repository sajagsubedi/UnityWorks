import React from "react";
import Image from "next/image";
import { teams } from "@/constants/Teams";

export default function Teams() {
  return (
    <section className="md:px-[15vw] px-[10vw] relative w-full min-h-48 py-10 md:py-14 bg-transparent">
      <div className=" w-full flex flex-col items-center z-2 relative mb-8">
        <div className="h-1 w-20 bg-green-500 rounded"></div>
        <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
          OUR TEAMS
        </h2>
      </div>
      <div className="flex gap-5 justify-between flex-col md:flex-row">
        {teams.map((team,index) => {
          return (
            <div className="relative flex flex-col items-center" key={index}>
              <Image src={team.image} alt="logo" className="w-32 h-32 shadow" />
              <h3 className="text-green-600 font-medium text-lg">{team.name}</h3>
              <p className="text-gray-600 text-sm">{team.post}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
