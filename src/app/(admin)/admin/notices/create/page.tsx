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
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  // Create a ref for the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to reset values
  const resetValue = () => {
    setTitle("");
    setVisibility(Visibility.PUBLIC);
    setImages([]);
    setPreviews([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);

    // Generate previews for all selected images
    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
      });
    });

    Promise.all(filePreviews).then((loadedPreviews) => {
      setPreviews(loadedPreviews);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || images.length === 0) {
      toast.error("Please fill in all fields and select at least one image.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("visibility", visibility);

    images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      const response = await axios.post("/api/notices", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);

      // Reset values
      resetValue();
    } catch (err) {
      toast.error("An error occurred while adding the notice.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex py-3 px-3 justify-center relative">
      <Link
        href={`/admin/notices/`}
        className="px-3 py-1 text-sm m-2 font-medium flex gap-1 justify-center items-center text-white bg-green-500 rounded-md border border-transparent hover:bg-white hover:border-green-500 hover:text-green-500 absolute top-0 left-0"
      >
        <FaArrowLeft />
        Back
      </Link>
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 h-max">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Notice</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notice Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            {previews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-700 mb-1">Images Preview:</p>
                <div className="grid grid-cols-2 gap-4">
                  {previews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-auto h-40 rounded-md"
                    />
                  ))}
                </div>
              </div>
            )}
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
