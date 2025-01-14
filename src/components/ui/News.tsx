import { FaRegCalendar } from "react-icons/fa";
import Link from "next/link";
import { RiLoader2Fill } from "react-icons/ri";
import { dateOptions } from "@/types/ComponentTypes";
import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "@/models/News.models";

export default function News() {
  const fetchNews = async () => {
    const response = await fetch("/api/news?limit=5&pagetype=landing");
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  if (error) {
    console.log(error);
  }

  return (
    <div className=" py-10 w-full max-w-[90vw] mx-auto">
      <div className="flex flex-col w-full gap-3 relative">
        {isLoading && (
          <RiLoader2Fill className="animate-spin text-3xl absolute left-[50%] top-[50%]" />
        )}
        {!isLoading &&
          data.news.map((item: NewsItem, i: number) => {
            return (
              <div
                className="rounded-lg border-b border-green-500 w-full overflow-hidden md:max-h-44"
                key={i}
              >
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
