"use client";

import React, { useState, useEffect } from "react";
import { FaRegCalendar, FaArrowLeft } from "react-icons/fa";
import { NoticeItem } from "@/models/Notice.models";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import Image from "next/image";
import { Visibility } from "@/types/ApiTypes";
import { dateOptions } from "@/types/ComponentTypes";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;

  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotice = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}`
      );
      setNotice(response.data.notice);
    } catch (error) {
      const err = error as AxiosError;
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <p className="text-gray-500">Loading notice item...</p>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <p className="text-red-500">
          Failed to load notice item. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full y-5 px-4">
      <div className="flex w-full justify-start mb-4">
        <Link
          href={`/admin/notices/`}
          className="px-3 py-1 text-sm m-2 font-medium flex gap-1 justify-center items-center text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500"
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>
      <article className="bg-white rounded-xl overflow-hidden w-full max-w-5xl mx-auto">
        <div className="flex w-full justify-end mb-1">
          <button className="px-3 py-1 text-sm m-2 font-medium flex gap-1 justify-center items-center text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500">
            Edit
          </button>
        </div>

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
          <span
            className={`px-2 py-1 text-xs font-medium rounded uppercase ${
              notice.visibility === Visibility.PUBLIC
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {notice.visibility}
          </span>
        </div>
        <div className="w-full flex flex-col gap-2">
          {notice.images.map((image, index) => {
            return <Image src={image.url} key={index} alt={notice.title} width={2480} height={3508} />;
          })}
        </div>
      </article>
    </div>
  );
}
