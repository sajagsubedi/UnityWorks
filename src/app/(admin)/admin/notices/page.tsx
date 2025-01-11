"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { RiLoader2Fill } from "react-icons/ri";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { Visibility } from "@/types/ApiTypes";
import { FaRegCalendar } from "react-icons/fa6";
import { dateOptions } from "@/types/ComponentTypes";
import { NoticeItem } from "@/models/Notice.model";

interface NoticeCardProps {
  item: NoticeItem;
}

const NoticeCard = ({ item }: NoticeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-3 flex flex-col flex-grow gap-2">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            <FaRegCalendar size={14} />
            {new Date(item.createdAt).toLocaleDateString("en-US", dateOptions)}
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
                item.visibility === Visibility.PUBLIC
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {item.visibility}
            </span>
          </div>

          <Link
            className="text-green-500 text-sm w-max underline mt-5"
            href={`/admin/notices/${item._id}`}
          >
            View Information
          </Link>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [items, setItems] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalNotices, setTotalNotices] = useState(0);

  const fetchNotices = async () => {
    try {
      const response = await axios.get("/api/notices?page=1");
      setPage(1);
      setItems(response.data.notices);
      setTotalNotices(response.data.totalNotices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchMoreNotices = async () => {
    try {
      const response = await axios.get(`/api/notices?page=${page + 1}`);
      setItems([...items, ...response.data.notices]);
      setPage((p) => p + 1);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  return (
    <div className="min-h-screen px-[10vw] py-12 bg-green-50">
      <h2 className="font-bold text-3xl text-green-800 mb-6 text-center">
        Notices Management
      </h2>
      <div className="w-full flex justify-end">
        <Link
          className="bg-green-500 border border-transparent hover:border-green-500 hover:bg-transparent hover:text-green-500 text-white px-4 py-2 rounded-md"
          href="/admin/notices/create"
        >
          Add Notice
        </Link>
      </div>
      {loading && (
        <RiLoader2Fill className="animate-spin text-3xl absolute left-[50%] top-[50%]" />
      )}
      <div className="space-y-6 mt-5">
        <InfiniteScroll
          className="space-y-6 overflow-hidden"
          dataLength={items.length}
          next={fetchMoreNotices}
          hasMore={items.length !== totalNotices}
          loader={
            <RiLoader2Fill className="animate-spin text-xl w-full flex justify-center" />
          }
        >
          {!loading &&
            items.map((item, i) => <NoticeCard item={item} key={i} />)}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Page;
