import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Networking Graph",
  description: "This simple Data Visualization app is designed to provide users with a graphical representation of network connections between various nodes and carriers, using interactive force-directed graphs. The application allows users to upload JSON files containing structured data, which is then processed and visualized in a dynamic graph format. This app is particularly useful for analyzing and understanding complex relationships between nodes in a network, such as logistics networks, social networks, or any other system where entities are interconnected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        <main className="p-5 md:p-10 container">{children}</main>
      </body>
    </html>
  );
}
