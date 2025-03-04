"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookmarkHub from "@/components/logo";
import { ReactNode } from "react";
import {BookmarkIcon, PlusIcon, StarIcon, WalletIcon} from "lucide-react";
import {ProfileCircle} from "iconsax-react";

interface SidebarProps {
  link: string;
  text: string;
  icon: (color: string) => ReactNode;
}

const links: SidebarProps[] = [
    { link: "/bookmarks", text: "Bookmarks", icon: (color) => <BookmarkIcon size="24" color={color}  /> },
    { link: "/create-bookmark", text: "Create", icon: (color) => <PlusIcon size="24" color={color}  /> },
    { link: "/favorites", text: "Favorites", icon: (color) => <StarIcon size="24" color={color}  /> },
    { link: "/subscriptions", text: "Subscriptions", icon: (color) => <WalletIcon size="24" color={color}  /> },
    { link: "/account", text: "Account", icon: (color) => <ProfileCircle size="24" color={color}  /> },
];

export const SidebarContent = () =>  {
    const pathname = usePathname();

    return (
        <div className="grid gap-6 py-4 px-6 mx-auto">
            <div className="py-4">
                <BookmarkHub/>
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
    )
}


const Sidebar = () => {
    return (
        <div className="hidden lg:block h-[100vh] w-[21vw] bg-white shadow">
            <SidebarContent />
        </div>
    );
};

export default Sidebar;
