import type { Metadata } from "next";
import "./globals.css";
import {Header,Footer} from "@/components";

export const metadata: Metadata = {
  title: "Unity Works",
  description: "Unity works is a cooperativeUnityWorks is a cooperative based in Pokhara, Nepal, fostering sustainable growth through community-driven initiatives. Offering a range of services and programs, UnityWorks empowers local members with financial support, skill development, and collaborative opportunities for a brighter future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
