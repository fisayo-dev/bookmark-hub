"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookmarkHub from "@/components/logo";
import { ReactNode } from "react";

const Bookmark = dynamic(() => import("iconsax-react").then((mod) => mod.Bookmark), { ssr: false });
const Profile = dynamic(() => import("iconsax-react").then((mod) => mod.Profile), { ssr: false });
const Create = dynamic(() => import("iconsax-react").then((mod) => mod.Add), { ssr: false });
const Star1 = dynamic(() => import("iconsax-react").then((mod) => mod.Star1), { ssr: false });

interface SidebarProps {
  link: string;
  text: string;
  icon: (color: string) => ReactNode;
}

const Sidebar = () => {
  const pathname = usePathname();

  const links: SidebarProps[] = [
    { link: "/bookmarks", text: "Bookmarks", icon: (color) => <Bookmark size="24" color={color} variant="Bold" /> },
    { link: "/create-bookmark", text: "Create", icon: (color) => <Create size="24" color={color} variant="Bold" /> },
    { link: "/favorites", text: "Favorites", icon: (color) => <Star1 size="24" color={color} variant="Bold" /> },
    { link: "/account", text: "Account", icon: (color) => <Profile size="24" color={color} variant="Bold" /> },
  ];

  return (
    <div className="h-[100vh] w-[25vw] bg-white shadow">
          <div className="grid gap-6 py-4 px-6 mx-auto">
              <div className="px-3 py-4">
                  <BookmarkHub />
              </div>
        <div className="flex gap-2 flex-col justify-between h-full">
          {links.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                href={item.link}
                key={index}
                className={`flex px-3 py-4 rounded-2xl items-center space-x-2 transition-all duration-300 ${
                  isActive ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
                }`}
              >
                {item.icon(isActive ? "black" : "#aaaaaa")} 
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
