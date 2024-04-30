import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, UnauthenticatedNavbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Marmut-E13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      
      <body>
        <Navbar />

        <main  className="">
          {children}
        </main>
      </body>
    </html>
  );
}
