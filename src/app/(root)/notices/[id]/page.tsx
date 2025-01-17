import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { NoticeItem } from "@/models/Notice.models";
import axios from "axios";
import { dateOptions } from "@/types/ComponentTypes";
import Image from "next/image";

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  let notice: NoticeItem | null = null;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}`
    );
    notice = response.data.notice;
  } catch (error) {
    console.error(error);
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <p className="text-red-500">
          Failed to load news item. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <article className="bg-white rounded-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <FaRegCalendar size={14} />
              {new Date(notice.createdAt).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-green-900">{notice.title}</h1>
          <div className="w-full flex-col gap-2 mt-4">
            {notice.images.length !== 0 &&
              notice.images.map((image, ind) => {
                return (
                  <Image
                    src={image.url}
                    key={ind}
                    width={2480}
                    height={3508}
                    alt={notice.title}
                    className="w-full h-[400px] object-fill"
                  />
                );
              })}
          </div>
        </div>
      </article>
    </div>
  );
}
