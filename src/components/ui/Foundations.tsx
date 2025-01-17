import React from "react";
import { LuLightbulb } from "react-icons/lu";
import { FaRegHandshake } from "react-icons/fa6";
import { FaHands } from "react-icons/fa";
import { GiDjedPillar } from "react-icons/gi";

const foundations = [
  {
    icon: LuLightbulb,
    title: "Vision",
    description:
      "Empowering communities through innovation, growth, and sustainability.",
  },
  {
    icon: FaRegHandshake,
    title: "Mission",
    description:
      "Delivering excellence by fostering collaboration, trust, and impact",
  },
  {
    icon: FaHands,
    title: "Core Values",
    description:
      "Integrity, innovation, inclusivity, and commitment to excellence.",
  },
  {
    icon: GiDjedPillar,
    title: "Strategic Pillars",
    description:
      "Sustainability, innovation, community engagement, and growth.",
  },
];
export default function Foundations() {
  return (
    <section className="md:grid-cols-4 w-full bg-green-50 py-6 px-[10vw] gap-3 md:grid hidden">
      {foundations.map((foundation, i) => {
        return (
          <div
            className="flex p-3 text-gray-500 shadow rounded bg-white gap-2 hover:shadow-lg"
            key={i}
          >
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
