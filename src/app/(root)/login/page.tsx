"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signin", {
        email,
        password,
      });
      toast.success(response.data.message);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data.message);
    }
  };

  const verifyAuth = useCallback(async () => {
    try {
      const response = await axios.get("/api/verifyAuthentication");
      if (response.data.isAuthenticated) {
        router.push("/dashboard");
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string ,isAuthenticated: boolean}>;
      console.log(err.response?.data.message);
    }
  }, [router]);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 justify-center flex pt-5">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 h-max">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <CiLogin className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
