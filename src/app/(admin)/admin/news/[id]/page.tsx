import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { NewsItem, Visibility } from "@/models/News.models";
import axios from "axios";
import Link from "next/link";

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  let news: NewsItem | null = null;

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`
    );
    news = response.data.news;
  } catch (error) {
    console.error(error);
  }

  if (!news) {
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
      <div className="flex w-full justify-end">
        <Link
          href={`admin/news/${news._id}/edit`}
          className="px-3 py-1 text-sm m-2 font-medium text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500"
        >
          Edit
        </Link>
      </div>
      <article className="bg-white rounded-xl overflow-hidden">
        {news.image?.url && (
          <img
            src={news.image.url}
            alt={news.title}
            className="w-full h-[400px] object-fill"
          />
        )}

        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <FaRegCalendar size={14} />
              {new Date(news.createdAt).toLocaleDateString(
                "en-US",
                dateOptions
              )}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-green-900">
            {news.title}
          </h1>
          <span
            className={`px-2 py-1 text-xs font-medium rounded uppercase ${
              news.visibility === Visibility.PUBLIC
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {news.visibility}
          </span>

          <div className="prose prose-green max-w-none mt-6">
            <p className="text-gray-600 text-lg leading-relaxed">
              {news.description}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
