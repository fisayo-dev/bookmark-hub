import type { Metadata } from "next";
import {ReactNode} from 'react'
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookmark Hub",
  description: "Effortlessly save and organize your favorite links—just type in the URL and keep your bookmarks handy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='antialiased'
      >
        {children}
      </body>
    </html>
  );
}
