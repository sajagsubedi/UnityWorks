import React from "react";
import { LuLightbulb } from "react-icons/lu";
import { FaRegHandshake } from "react-icons/fa6"
import { FaHands } from "react-icons/fa";
import { GiDjedPillar } from "react-icons/gi";

const foundations = [
  {
    icon: LuLightbulb,
    title: "Vision",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
  },
  {
    icon: FaRegHandshake,
    title: "Mission",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
  },
  {
    icon: FaHands,
    title: "Core Values",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
  },
  {
    icon: GiDjedPillar,
    title: "Strategic Pillars",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing",
  },
];
export default function Foundations() {
  return (
    <section className="grid grid-cols-4 w-full bg-green-50 py-4 px-[10vw] gap-3">
      {foundations.map((foundation, i) => {
        return (
          <div className="flex p-3 text-gray-500 shadow rounded bg-white gap-2" key={i}>
            <foundation.icon className="h-20 w-20 text-green-500" />
            <div className="flex flex-col">
              <h3 className="text-green-500 font-bold text-left">
                {foundation.title}
              </h3>
              <p>{foundation.description}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
