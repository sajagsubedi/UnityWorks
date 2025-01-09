"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import {  NewsItem } from "@/models/News.models";
import { Visibility } from "@/types/ApiTypes";

interface PageProps {
  news: NewsItem;
  closeModal: () => void;
  fetchNews: () => Promise<void>;
}

const EditNewsModal = (props: PageProps) => {
  const { news, closeModal, fetchNews } = props;
  const [title, setTitle] = useState(news.title);
  const [description, setDescription] = useState(news.description);
  const [visibility, setVisibility] = useState<Visibility>(news.visibility);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(news.image.url);

  const [loading, setLoading] = useState(false);

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("visibility", visibility);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.patch(`/api/news/${news._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (err) {
      toast.error("An error occurred while updating the news.");
      console.error(err);
    } finally {
      setLoading(false);
      fetchNews();
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 bg-opacity-25 w-full flex py-3 px-3 justify-center fixed z-50 top-0 left-0">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg px-6 py-4 relative">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Update News</h1>
        <button className="absolute top-0 right-0 text-black z-[99] m-3" onClick={closeModal}>
        <IoMdClose className="text-black h-6 w-6"/>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="w-3/4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Thumbnail Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2 w-max self-end mb-1">
                <span className="text-sm font-medium text-gray-700">
                  Visibility:
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (visibility == Visibility.PUBLIC) {
                      setVisibility(Visibility.PRIVATE);
                    } else {
                      setVisibility(Visibility.PUBLIC);
                    }
                  }}
                  className={`p-2 rounded-full ${
                    visibility == Visibility.PUBLIC
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {visibility == Visibility.PUBLIC ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>
            {preview && (
              <div className="mt-2">
                <p className="text-sm text-gray-700 mb-1">Image Preview:</p>
                <img
                  src={preview}
                  alt="Image Preview"
                  className="w-auto h-36 rounded-md"
                />
              </div>
            )}
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md w-28 hover:bg-green-600 flex items-center justify-center"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md w-28 hover:bg-green-600 flex items-center justify-center gap-2 disabled:bg-green-400"
              disabled={loading}
            >
              {loading && <AiOutlineLoading3Quarters className="animate-spin text-xl" />}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewsModal;
