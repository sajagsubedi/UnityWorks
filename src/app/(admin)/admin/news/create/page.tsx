"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { RiLoader2Fill } from "react-icons/ri";
import { Visibility } from "@/types/ApiTypes";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

const Page: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  //function to reset value
  const resetValue = () => {
    setTitle("");
    setDescription("");
    setVisibility(Visibility.PUBLIC);
    setImage(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
    if (!title || !description || !image) {
      toast.error("Please fill in all fields and select an image.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("visibility", visibility);
    formData.append("image", image);

    try {
      const response = await axios.post("/api/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);

      //reset values
      resetValue();
    } catch (err) {
      toast.error("An error occurred while adding the news.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex py-3 px-3 justify-center relative">
       <Link
          href={`/admin/news/`}
          className="px-3 py-1 text-sm m-2 font-medium flex gap-1 justify-center items-center text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500 absolute top-0 left-0"
        >
          <FaArrowLeft />
          Back
        </Link>
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add News</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
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
              required
            />
            {preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-1">Image Preview:</p>
                <img
                  src={preview}
                  alt="Image Preview"
                  className="w-auto h-60 rounded-md"
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
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label
              htmlFor="visibility"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Visibility
            </label>
            <select
              id="visibility"
              name="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as Visibility)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value={Visibility.PUBLIC}>Public</option>
              <option value={Visibility.PRIVATE}>Private</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="reset"
              onClick={resetValue}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
              disabled={loading}
            >
              {loading && <RiLoader2Fill className="animate-spin text-3xl" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
