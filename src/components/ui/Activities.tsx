"use client";
import { News, Notices, Downloads } from "@/components";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({});

export default function Activities() {
  const [tab, setTab] = useState("news");
  return (
    <QueryClientProvider client={queryClient}>
      <section className="w-full bg-green-100 py-10 md:px-[15vw] px-4 md:py-14 min-h-[50vh]">
        <div className=" w-full mb-6 lg:mb-0 flex flex-col items-center">
          <div className="h-1 w-20 bg-green-500 rounded"></div>
          <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
            ACTIVITIES
          </h2>
        </div>
        <div className="w-full flex flex-col">
          <div className="flex gap-5 flex-wrap">
            <button
              className={`py-3 px-4 rounded ${
                tab == "news"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-black"
              } font-medium`}
              onClick={() => setTab("news")}
            >
              News
            </button>
            <button
              onClick={() => setTab("notices")}
              className={`py-3 px-4 rounded ${
                tab == "notices"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-black"
              } font-medium`}
            >
              Notices
            </button>
            <button
              onClick={() => setTab("downloads")}
              className={`py-3 px-4 rounded ${
                tab == "downloads"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-black"
              } font-medium`}
            >
              Downloads
            </button>
          </div>
          {tab == "news" && <News />}
          {tab == "notices" && <Notices />}
          {tab == "downloads" && <Downloads />}
        </div>
      </section>
    </QueryClientProvider>
  );
}
