"use client";

import React, { useEffect, useState } from "react";
import { FaInbox } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import { ContactForm } from "@/models/Contact.models";
import axios from "axios";
import { RiLoader2Fill } from "react-icons/ri";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<ContactForm[]>([]);
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactForm | null>(null);
  const [totalMessages, setTotalMessages] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const deleteSubmission = (id: string) => {
    console.log(id);
  };

  const markAllRead = async () => {
    try {
      setSubmissions((prevValue) => {
        return prevValue.map((subm) => ({
          ...subm,
          isRead: true,
        })) as ContactForm[];
      });
      await axios.patch(`/api/contact/`);
      setUnreadMessages(0);
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      setSubmissions((prevValue) => {
        return prevValue.map((subm) =>
          subm._id === id
            ? {
                ...subm,
                isRead: true,
              }
            : subm
        ) as ContactForm[];
      });
      await axios.patch(`/api/contact/${id}`);
      setUnreadMessages((p) => p - 1);
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchForms = async () => {
    try {
      const response = await axios.get("/api/contact?page=1&limit=5");
      setPage(1);
      setSubmissions(response.data.contactForms);
      setTotalMessages(response.data.totalContactForms);
      setUnreadMessages(response.data.unreadMessages);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchForms();
  }, []);

  const fetchMoreForms = async () => {
    try {
      const response = await axios.get(`/api/contact?page=${page + 1}&limit=5`);
      setSubmissions([...submissions, ...response.data.contactForms]);
      setPage((p) => p + 1);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  if (loading) {
    return (
      <section className="h-full w-full bg-white flex justify-center items-center py-[10vw]">
        <div className="w-8 h-8 animate-spin relative">
          <span className="w-3 h-3 bg-green-500 rounded-full top-0 left-0 absolute"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full top-0 right-0 absolute"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full bottom-0 left-0 absolute"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full bottom-0 right-0 absolute"></span>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Contact Submissions
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and view contact form submissions
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-2 gap-6 p-6">
            <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">
                  Unread Messages
                </p>
                <p className="text-2xl font-bold text-green-700">
                  {unreadMessages}
                </p>
              </div>
              <FaInbox className="w-8 h-8 text-green-500" />
            </div>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Messages
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  {totalMessages}
                </p>
              </div>
              <FiMessageCircle className="w-8 h-8 text-gray-500" />
            </div>
          </div>
          <div className="w-full flex justify-end px-2 py-1">
            <button
              className="text-sm text-green-500 underline"
              onClick={markAllRead}
            >
              Mark all as read
            </button>
          </div>

          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.length == 0 && (
                  <tr className="">
                    <td
                      className="text-xl font-bold text-center py-5"
                      colSpan={5}
                    >
                      No contact messages!
                    </td>
                  </tr>
                )}

                {submissions.map((submission, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {submission.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {submission.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          submission.isRead
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {submission.isRead ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(submission.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            markAsRead(submission._id as string);
                            setSelectedSubmission(submission);
                          }}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaEye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            deleteSubmission(submission._id as string)
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5} className="text-center">
                    <InfiniteScroll
                      className="overflow-hidden w-full"
                      dataLength={submissions.length}
                      next={fetchMoreForms}
                      hasMore={submissions.length !== totalMessages}
                      loader={
                        <RiLoader2Fill className="animate-spin text-xl w-full flex justify-center" />
                      }
                    >
                      <div className="hidden">End</div>
                    </InfiniteScroll>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {selectedSubmission && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Message Details
                  </h3>
                  <p className="text-sm text-gray-500">
                    From {selectedSubmission.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedSubmission.subject}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedSubmission.message}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-500">
                    Received: {formatDate(selectedSubmission.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
