"use client";

import BookmarkHub from "@/components/logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Define the correct type for an array of sidebar links
interface SidebarProps {
  link: string;
  text: string;
  icon: ReactNode; // Change to 'string' if the icon is an image path
}

const Sidebar = () => {
  const pathname = usePathname(); // Get the current path

  const links: SidebarProps[] = [
    {
      link: "/bookmarks",
      text: "Bookmarks",
      icon: "📌", 
    },
    {
      link: "/account",
      text: "Account",
      icon: "📌", 
    },
    {
      link: "/favorites",
      text: "Favorites",
      icon: "⭐",
    },
    {
      link: "/create-bookmark",
      text: "Create",
      icon: "⚙️",
    },
  ];

  return (
    <div className="h-[100vh] bg-blue-500 container w-[25vw]">
      <div className="grid gap-6 text-white py-4 px-6 mx-auto">
        <BookmarkHub />
        <div className="flex gap-2 flex-col justify-between h-full">
          {links.map((item, index) => {
            const isActive = pathname === item.link; 
            return (
              <Link
                href={item.link}
                key={index}
                className={`flex px-2 py-2 rounded-2xl items-center space-x-2 ${
                  isActive ? "bg-blue-700 text-white" : "hover:bg-blue-600"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
