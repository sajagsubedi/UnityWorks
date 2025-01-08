"use client";

import axios, { AxiosError } from "axios";
import { NewsItem } from "@/models/News.models";
import { FaRegCalendar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { RiLoader2Fill } from "react-icons/ri";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/news?limit=5&pagetype=landing");
      setNews(response.data.news);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className=" py-10 w-full max-w-[90vw] mx-auto">
      <div className="flex flex-col w-full gap-3 relative">
        {loading && (
          <RiLoader2Fill className="animate-spin text-3xl absolute left-[50%] top-[50%]" />
        )}
        {!loading &&
          news.map((item, i) => {
            return (
              <div className="rounded-lg border-b border-green-500 w-full overflow-hidden md:max-h-44" key={i}>
                <div className="flex flex-col md:flex-row">
                  <img
                    src={item.image.url}
                    alt={item.title}
                    className="h-40 md:w-40 md:min-w-40 md:max-w-40 w-full object-fill"
                  />
                  <div className="p-3 flex flex-col flex-grow ">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                        <FaRegCalendar size={14} />
                        {new Date(item.createdAt).toLocaleDateString(
                          "en-US",
                          dateOptions
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h3 className=" font-bold text-green-500 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 mt-1 text-sm">
                          {item.description}
                        </p>
                      </div>

                      <Link
                        className="text-green-500 text-sm w-max underline"
                        href={`/news/${item._id}`}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
