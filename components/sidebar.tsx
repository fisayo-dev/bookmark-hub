"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookmarkHub from "@/components/logo";
import { ReactNode } from "react";

const Bookmark = dynamic(() => import("iconsax-react").then((mod) => mod.Home), { ssr: false });
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
    { link: "/bookmarks", text: "Bookmarks", icon: (color) => <Bookmark size="24" color={color}  /> },
    { link: "/create-bookmark", text: "Create", icon: (color) => <Create size="24" color={color}  /> },
    { link: "/favorites", text: "Favorites", icon: (color) => <Star1 size="24" color={color}  /> },
    { link: "/account", text: "Account", icon: (color) => <Profile size="24" color={color}  /> },
  ];

  return (
    <div className="h-[100vh] w-[25vw] bg-white shadow">
          <div className="grid gap-6 py-4 px-6 mx-auto">
              <div className="py-4">
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
                  isActive ? "bg-gray-100 font-bold" : "hover:bg-gray-50"
                }`}
              >
                {item.icon(isActive ? "black" : "#aaaaaa")} 
                <span className={isActive ? "text-black" : "text-gray-500"}>{item.text}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
