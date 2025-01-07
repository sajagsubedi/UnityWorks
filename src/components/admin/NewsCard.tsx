"use client";

import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { NewsItem } from "@/models/News.models";
import Link from "next/link";

interface NewsCardProps {
  item: NewsItem;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};
const NewsCard = ({ item }: NewsCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="flex">
        <img
          src={item.image.url}
          alt={item.title}
          className="h-60 w-60 object-fill flex-shrink-0"
        />
        <div className="p-3 flex flex-col flex-grow gap-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <FaRegCalendar size={14} />
              {new Date(item.createdAt).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </span>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500">
                Edit
              </button>
              <button className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md border border-transparent hover:bg-white hover:border-red-500 hover:text-red-500">
                Delete
              </button>
            </div>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-bold text-emerald-800 line-clamp-2">
                {item.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded uppercase ${
                  item.visibility === "public"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.visibility}
              </span>
              <p className="text-gray-600 line-clamp-3 mt-2">
                {item.description}
              </p>
            </div>

            <Link
              className="text-green-500 text-sm w-max underline"
              href={`admin\\news\\${item._id}`}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
