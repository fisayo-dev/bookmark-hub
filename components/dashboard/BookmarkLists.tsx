"use client";

import { useState } from "react";
import { Grid, List, SearchIcon } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Bookmark {
    userId: number,
    id: number,
    title: string,
    body: string,
}

interface Props {
  bookmarks: Bookmark[];
}

const BookmarkLists = ({ bookmarks }: Props) => {
  const [view, setView] = useState<"grid" | "list">("grid"); // State to toggle layout
  const [search, setSearch] = useState(""); // State for search input

  // Filter bookmarks based on search input
  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="flex items-center gap-4 py-4">
        <div className="bg-gray-100 w-full px-4 gap-2 py-3 rounded-2xl flex items-center">
          <SearchIcon className="h-6 w-6 text-gray-400" />
          <Input
            className="w-full px-0 py-1"
            placeholder="Search for your bookmarks 😎"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Layout Toggle Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-full ${view === "grid" ? "bg-gray-200" : "hover:bg-gray-100"}`}
          >
            <Grid className="h-7 w-7" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-full ${view === "list" ? "bg-gray-300" : "hover:bg-gray-200"}`}
          >
            <List className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Bookmarks Display */}
      <div className={view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
        {filteredBookmarks.map((bookmark, index) => (
          <div
            key={index}
            className={`hover:border-gray-400 cursor-pointer border border-gray-200 rounded-2xl p-2 ${
              view === "grid" ? "h-auto" : "flex items-center gap-4"
            }`}
          >
            <Image
              height={300}
              width={300}
              className={`${view == 'grid' ? 'mx-auto' : 
            'w-24'}`}
              src="/not-found.svg"
              alt={bookmark.title}
            />
            <div className="px-4">
              <h2 className="text-nowrap capitalize text-2xl font-bold">{bookmark.title.length > 12 ? `${bookmark.title.substring(0,12)}...`: bookmark.title }</h2>
              <p className="text-nowrap capitalize">{bookmark.title.length > 30 ? `${bookmark.title.substring(0,30)}...`: bookmark.title }</p>
              <Link href='/ddd' className="text-sm hover:underline">
                Visit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkLists;
