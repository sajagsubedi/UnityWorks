import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify"; 

export const metadata: Metadata = {
  title: "UnityWorks: Empowering Communities for Sustainable Growth",
  description:
    "UnityWorks, a Pokhara-based cooperative, drives sustainable growth through financial support, skill development, and community empowerment initiatives..",
  keywords:
    "UnityWorks, unity, works, unity works, cooperative, Pokhara, Nepal, sustainable growth, community empowerment, financial support, skill development, local initiatives, collaborative opportunities, community-driven projects, social enterprise, member-owned cooperative, economic development, community programs, financial services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ToastContainer
            position="top-left"
            autoClose={3000}
            style={{ width: "230px" }}
          />
        {children}
      </body>
    </html>
  );
}
