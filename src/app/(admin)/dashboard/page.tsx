"use client";

import React from "react";
import { useGetSession } from "@/hooks/useGetSession";

const page = () => {
  const { session, loading } = useGetSession();
  return <div>page</div>;
};

export default page;
