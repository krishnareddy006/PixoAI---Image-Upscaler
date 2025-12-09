import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PixoAI - AI Image Upscaler",
  description: "Transform your images with cutting-edge AI technology",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          className: "dark:bg-gray-800 dark:text-white",
          duration: 3000,
        }}
      />
      <Footer />
    </>
  );
}
