"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { EditNewsModal, NewsCard, DeleteModal } from "@/components";
import { NewsItem } from "@/models/News.models";
import { RiLoader2Fill } from "react-icons/ri";
import Link from "next/link";
import { EditNewsModalState, DeleteModalState } from "@/types/ComponentTypes";
import { toast } from "react-toastify";

const Page = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState<EditNewsModalState>({
    isOpen: false,
  });
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
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

  //function for delete modal
  const openDeleteModal = (id: string) => {
    setDeleteModal({ isOpen: true, id });
  };
  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false });
  };
  const handleDeleteNews = async () => {
    try {
      const response = await axios.delete(`/api/news/${deleteModal.id}`);
      console.log(response);
      toast.success(response.data.message)
      closeDeleteModal();
      fetchNews();
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error deleting news:", error);
      toast.error(error.message)
    }
  };

  return (
    <div className="min-h-screen px-[10vw] py-12 bg-green-50">
      <h2 className="font-bold text-3xl text-emerald-800 mb-6 text-center">
        News Management
      </h2>
      {deleteModal.isOpen && deleteModal.id && (
        <DeleteModal
          onCancel={closeDeleteModal}
          onConfirm={handleDeleteNews}
          message="news item"
        />
      )}
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
          items.map((item, i) => (
            <NewsCard
              key={i}
              item={item}
              openModal={openModal}
              openDeleteModal={openDeleteModal}
            />
          ))}
      </div>
    </div>
  );
};

export default Page;
