"use client";

import React from "react";
import { RiLoader2Fill } from "react-icons/ri";
import { useGetSession } from "@/hooks/useGetSession";

const Page = () => {
  const { session, loading } = useGetSession();

  if (!session && loading) {
    return (
      <RiLoader2Fill className="animate-spin text-3xl absolute left-[50%] top-[50%]" />
    );
  }
  return <div>page</div>;
};

export default Page;
