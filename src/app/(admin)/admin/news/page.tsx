"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { NewsCard } from "@/components";
import { NewsItem } from "@/models/News.models";

const Page = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/news");
      setItems(response.data.news);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen px-[10vw] py-12 bg-green-50">
      <h2 className="font-bold text-3xl text-emerald-800 mb-6 text-center">
        News Management
      </h2>
      <div className="w-full flex justify-end">
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          Add News
        </button>
      </div>
      <div className="space-y-6 mt-5">
        {items.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
