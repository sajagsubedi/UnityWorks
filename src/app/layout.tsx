import type { Metadata } from "next";
import "./globals.css";
import {Header,Footer} from "@/components";

export const metadata: Metadata = {
  title: "UnityWorks: Empowering Communities for Sustainable Growth",
  description: "UnityWorks, a Pokhara-based cooperative, fosters sustainable growth through community-driven initiatives, offering financial support, skill development, and collaborative opportunities for local empowerment.",
  keywords:"UnityWorks, unity, works, unity works, cooperative, Pokhara, Nepal, sustainable growth, community empowerment, financial support, skill development, local initiatives, collaborative opportunities, community-driven projects, social enterprise, member-owned cooperative, economic development, community programs, financial services"  
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
