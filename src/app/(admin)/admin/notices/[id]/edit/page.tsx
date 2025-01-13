"use client";

import React, { useState, useRef, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import { Visibility } from "@/types/ApiTypes";

interface PageProps {
  params: {
    id: string;
  };
}

interface ImageDataType {
  url: string;
  public_id?: string;
}

const Page = ({ params }: PageProps) => {
  const { id } = params;
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<Visibility | null>();
  const [previews, setPreviews] = useState<ImageDataType[]>([]);

  const [loading, setLoading] = useState(false);

  const [dataLoading, setDataLoading] = useState(true);
  const noticeImagesRef = useRef<HTMLInputElement | null>(null);

  //function to handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Generate previews for all selected images uploaded from pc
    const filePreviews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<ImageDataType>((resolve) => {
        reader.onloadend = () =>
          resolve({ url: reader.result } as ImageDataType);
      });
    });

    Promise.all(filePreviews).then((loadedPreviews) => {
      const newPreview = [...previews, ...loadedPreviews];

      //append previously selected files in new files
      if (noticeImagesRef.current) {
        const dataTransfer = new DataTransfer();

        // Convert each image URL into a File object and append it to the DataTransfer object
        newPreview.forEach((image: ImageDataType) => {
          fetch(image.url)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], image.public_id || "image.jpg", {
                type: blob.type,
              });
              dataTransfer.items.add(file);
              // After adding all files, set the files on the input
              (noticeImagesRef.current as HTMLInputElement).files =
                dataTransfer.files;
            });
        });
      }
      setPreviews([...previews, ...loadedPreviews]);
    });
  };

  //function to handle remove image
  const handleRemoveImage = async (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const dataTransfer = new DataTransfer();

    try {
      // Fetch and add remaining images to the DataTransfer object
      await Promise.all(
        newPreviews.map(async (image: ImageDataType) => {
          const response = await fetch(image.url);
          const blob = await response.blob();
          const file = new File([blob], image.public_id || "image.jpg", {
            type: blob.type,
          });
          dataTransfer.items.add(file);
        })
      );

      // Set the files on the input
      if (newPreviews.length === 0) {
        (noticeImagesRef.current as HTMLInputElement).files = null;
        (noticeImagesRef.current as HTMLInputElement).value = "";
      } else {
        (noticeImagesRef.current as HTMLInputElement).files =
          dataTransfer.files;
      }

      // Update the previews state
      setPreviews(newPreviews);
    } catch (err) {
      console.error("Error while removing image:", err);
    }
  };

  //function to handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    if (!title || title.length == 0) {
      setLoading(false);
      toast.error("Please enter a title");
    }

    formData.append("title", title);
    formData.append("visibility", visibility as Visibility);

    if (
      !noticeImagesRef?.current?.files ||
      noticeImagesRef.current.files.length === 0
    ) {
      toast.error("Please select at least one image");
      setLoading(false); // Stop loading since there's an error
      return;
    }

    // Append selected images to the form data
    Array.from(noticeImagesRef.current.files).forEach((image: File) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.patch(`/api/notices/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (err) {
      toast.error("An error occurred while updating the notice.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  //function to fetch notice infromation from api during initial render
  const fetchNoticeInformation = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/notices/${id}`
      );
      const { notice } = response.data;
      setTitle(notice?.title);

      //setting images in input initially during fetching
      if (notice?.images && noticeImagesRef.current) {
        const dataTransfer = new DataTransfer();

        // Fetch each image URL and convert to a File object
        const files = await Promise.all(
          notice.images.map(async (image: ImageDataType) => {
            const response = await fetch(image.url);
            const blob = await response.blob();
            return new File([blob], image.public_id || "image.jpg", {
              type: blob.type,
            });
          })
        );

        // Add each File object to the DataTransfer object
        files.forEach((file) => {
          dataTransfer.items.add(file);
        });

        // Set the files on the input
        (noticeImagesRef.current as HTMLInputElement).files =
          dataTransfer.files;

        // Generate previews for the images
        setPreviews(
          files.map((file) => ({
            url: URL.createObjectURL(file),
          }))
        );
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticeInformation();
  }, []);

  if (dataLoading) {
    return (
      <section className="h-full w-full bg-white flex justify-center items-center">
        <div>Loading...</div>;
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 bg-opacity-25 w-full flex py-3 px-3 justify-center">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg px-6 py-4 relative">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Update Notice</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                ref={noticeImagesRef}
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              {previews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-1">Images Preview:</p>
                  <div className="grid grid-cols-2 gap-4">
                    {previews.map((preview, index) => (
                      <div className="relative" key={index}>
                        <MdDelete
                          className="absolute top-0 right-0 text-red-500 text-xl"
                          onClick={() => handleRemoveImage(index)}
                        />
                        <img
                          key={index}
                          src={preview.url}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-40 rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
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
          </div>
          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md w-28 hover:bg-green-600 flex items-center justify-center">
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md w-28 hover:bg-green-600 flex items-center justify-center gap-2 disabled:bg-green-400"
              disabled={loading}
            >
              {loading && (
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
              )}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
