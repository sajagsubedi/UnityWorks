import { FaRegCalendar } from "react-icons/fa";
import Link from "next/link";
import { RiLoader2Fill } from "react-icons/ri";
import { dateOptions } from "@/types/ComponentTypes";
import { useQuery } from "@tanstack/react-query";
import { NoticeItem } from "@/models/Notice.models";

export default function News() {
  const fetchNotices = async () => {
    const response = await fetch("/api/notices?limit=5&pagetype=landing");
    return response.json();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["notices"],
    queryFn: fetchNotices,
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
          data.notices.map((item: NoticeItem, i: number) => {
            return (
              <div
                className=" border-b border-green-500 w-full overflow-hidden md:max-h-44"
                key={i}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="p-3 flex flex-col flex-grow ">
                    <div className="flex items-center justify-between mb-2">
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                        <FaRegCalendar size={14} />
                        {new Date(item.createdAt).toLocaleDateString(
                          "en-US",
                          dateOptions
                        )}
                      </span>
                    </div>
                    <div className="flex flex-col h-full justify-between">
                      <h3 className=" font-bold text-green-500 line-clamp-1">
                        {item.title}
                      </h3>
                      <Link
                        className="text-green-500 text-sm w-max underline"
                        href={`/notices/${item._id}`}
                      >
                        View Information
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
