import React from "react";
import { FaRegCalendar } from "react-icons/fa";
import { NewsItem } from "@/models/News.models";
import axios from "axios";

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

          <h1 className="text-3xl font-bold text-green-900">{news.title}</h1>

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
