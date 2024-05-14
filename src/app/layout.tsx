import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { AuthContextProvider } from "@/contexts/authContext";

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
        <AuthContextProvider>
          <Navbar />
          <main className="">
            {children}
          </main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
