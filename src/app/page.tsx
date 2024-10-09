import React from "react";
import { AboutUs,Services, Testimonials, Achievments, Activities } from "@/components";

export default function Page() {
  return (
    <main>
      <AboutUs/>
      <Services />
      <Activities />
      <Testimonials />
      <Achievments />
    </main>
  );
}
