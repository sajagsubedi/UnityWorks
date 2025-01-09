"use client";

import React, { useState, useEffect } from "react";
import { FaRegCalendar, FaArrowLeft } from "react-icons/fa";
import { NewsItem } from "@/models/News.models";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Image from "next/image";
import { EditNewsModal } from "@/components";
import { Visibility } from "@/types/ApiTypes";
import { dateOptions, EditNewsModalState } from "@/types/ComponentTypes";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editModal, setEditModal] = useState<EditNewsModalState>({
    isOpen: false,
  });

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/news/${id}`
      );
      setNews(response.data.news);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [id]);

  //function for editModal
  const closeModal = () => {
    setEditModal({ isOpen: false });
  };

  const openModal = (news: NewsItem) => {
    setEditModal({ isOpen: true, news });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <p className="text-gray-500">Loading news item...</p>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <p className="text-red-500">
          Failed to load news item. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full y-5 px-4">
      {editModal.isOpen && editModal.news && (
        <EditNewsModal
          news={editModal?.news}
          closeModal={closeModal}
          fetchNews={fetchNews}
        />
      )}
      <div className="flex w-full justify-start mb-4">
        <Link
          href={`/admin/news/`}
          className="px-3 py-1 text-sm m-2 font-medium flex gap-1 justify-center items-center text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500"
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>
      <article className="bg-white rounded-xl overflow-hidden w-full max-w-5xl mx-auto">
      <div className="flex w-full justify-end mb-1">
      <button
          className="px-3 py-1 text-sm m-2 font-medium flex gap-1 justify-center items-center text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500"
          onClick={() => openModal(news)}
        >
          Edit
        </button>
      </div>
        {news.image?.url && (
          <Image
            src={news.image.url}
            alt={news.title}
            className="w-full h-[400px] object-fill"
            width={1200}
            height={1200}
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
