"use client";

import {ReactNode, useState} from "react";
import { Grid, List, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import BookmarkCard from "@/components/dashboard/BookmarkCard";

interface Bookmark {
    userId: number,
    id: number,
    title: string,
    body: string,
}

interface Props {
  bookmarks: Bookmark[];
}

interface BookmarkStyleBtns {
    function: Function;
    icon: ReactNode;
    name?: string;
}

const BookmarkLists = ({ bookmarks }: Props) => {
  const [view, setView] = useState<"grid" | "list">("grid"); // State to toggle layout
  const [search, setSearch] = useState(""); // State for search input

    const bookmarkStyleBtns: BookmarkStyleBtns[] = [
        {
            function: () => setView("grid"),
            icon:  <Grid className="h-7 w-7" />,
            name: 'grid'
        },
        {
            function: () => setView("list"),
            icon:  <List className="h-7 w-7" />,
            name: 'list'
        }
    ]

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
            {bookmarkStyleBtns.map((btn, index) => (
              <div key={index}
                onClick={() => btn.function()}
                className={`cursor-pointer hover:bg-gray-200 p-2 rounded-full ${btn.name == 'grid' && view === "grid" && "bg-gray-200"} ${btn.name == 'list' && view === "list" && "bg-gray-200"}`}
              >
                  {btn.icon}
              </div>
            ))}
        </div>
      </div>

      {/* Bookmarks Display */}
      <div className={view === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
        {filteredBookmarks.map((bookmark, index) => (
         <BookmarkCard key={index} title={bookmark.title} body={bookmark.body} view={view}/>
        ))}
      </div>
    </div>
  );
};

export default BookmarkLists;
