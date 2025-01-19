"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import ContactBanner from "@/assets/contact-banner.jpg";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ContactPage() {
  const defaultValue = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("/api/contact", formData);
      toast.success(response.data.message);
      setFormData(defaultValue);
      setLoading(false);
    } catch (err) {
      const error = err as AxiosError;
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="mb-20">
        <Image
          src={ContactBanner}
          alt="banner"
          className="w-full md:h-[40vh]"
        />
      </div>
      <div className="w-full px-[10vw] flex flex-col gap-5 mb-8">
        <h2 className="text-xl font-bold text-gray-600">Unity Works</h2>
        <h4 className="text-gray-500">Head Office: Pokhara-11, Fulbari</h4>
        <h4 className="text-gray-500">P.O Box: 36936</h4>
        <h4 className="text-gray-500">Tel no.: 98460XXXXX, 98460XXXXX</h4>
        <h4 className="text-gray-500">Email: sajagsubedi03@gmail.com</h4>
      </div>
      <div className="w-full px-[10vw]">
        <iframe
          className="w-full h-80 border border-green-500 outline-none"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.366645545639!2d83.99806221114618!3d28.226549202300216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39959576f4a4c929%3A0xd46d8c0c6a619151!2sPragati%20tole!5e0!3m2!1sen!2snp!4v1728399389442!5m2!1sen!2snp"
          loading="lazy"
        ></iframe>
      </div>
      <div className="text-gray-600 body-font px-[10vw] mt-10 mb-20">
        <h2 className="text-center font-bold text-gray-600">Message Us</h2>
        <form
          className="max-w-[480px] sm:w-full w-auto mx-auto flex flex-col"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="leading-7 text-sm text-gray-600"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
          <button
            className="w-full px-5 py-3 mt-5 bg-green-500 rounded text-white flex justify-center items-center gap-2 disabled:bg-green-400"
            type="submit"
            disabled={loading}
          >
            <AiOutlineLoading3Quarters
              className={`animate-spin text-xl ${
                loading ? "opacity-100" : "opacity-0"
              } `}
            />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
