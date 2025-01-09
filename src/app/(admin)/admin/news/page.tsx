"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditNewsModal, NewsCard } from "@/components";
import { NewsItem } from "@/models/News.models";
import { RiLoader2Fill } from "react-icons/ri";
import Link from "next/link";

interface EditModalState {
  isOpen: boolean;
  news?: NewsItem;
}

const Page = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState<EditModalState>({
    isOpen: false,
  });

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/news");
      console.log(response);
      setItems(response.data.news);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  //function for editModal
  const closeModal = () => {
    setEditModal({ isOpen: false });
  };

  const openModal = (news: NewsItem) => {
    setEditModal({ isOpen: true, news });
  };

  return (
    <div className="min-h-screen px-[10vw] py-12 bg-green-50">
      <h2 className="font-bold text-3xl text-emerald-800 mb-6 text-center">
        News Management
      </h2>
      {editModal.isOpen && editModal.news && (
        <EditNewsModal
          news={editModal?.news}
          closeModal={closeModal}
          fetchNews={fetchNews}
        />
      )}
      <div className="w-full flex justify-end">
        <Link
          className="bg-green-500 border border-transparent hover:border-green-500 hover:bg-transparent hover:text-green-500 text-white px-4 py-2 rounded-md"
          href="/admin/news/create"
        >
          Add News
        </Link>
      </div>
      {loading && (
        <RiLoader2Fill className="animate-spin text-3xl absolute left-[50%] top-[50%]" />
      )}
      <div className="space-y-6 mt-5">
        {!loading &&
          items.map((item) => (
            <NewsCard key={item.id} item={item} openModal={openModal} />
          ))}
      </div>
    </div>
  );
};

export default Page;
