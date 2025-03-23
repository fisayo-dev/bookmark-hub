"use client";

import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import BookmarkEmptyData from "@/components/dashboard/BookmarkEmptyData";
import { useSession } from "next-auth/react"; // Assuming NextAuth.js is used
import config from "@/lib/config";
import BookmarksLoader from "@/components/dashboard/BookmarksLoader";

// Fetch function using fetch API
const fetchFavorites = async (userId: string): Promise<Bookmark[]> => {
  const res = await fetch(`${config.env.apiUrl}/api/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) return [];
  const favorites: Bookmark[] = await res.json();
  return favorites
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .filter((bookmark) => bookmark.starred);
};

export default function Pages() {
  const { data: session } = useSession();
  const userId = session?.user?.id as string;

  const { data: favoritesList, isLoading, isError } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => fetchFavorites(userId),
    enabled: !!userId,
    staleTime: 60000,
    // @ts-ignore
    cacheTime: 300000,
    retry: 2,
  });

  if (!userId) {
    return <p className="app-container mt-20 text-red-500">Please log in to view your favorites</p>;
  }

  if (isLoading) {
    return <BookmarksLoader />;
  }

  if (isError) {
    return <p className="app-container mt-20 text-red-500">Failed to load favorites. Try again later.</p>;
  }

  if (!favoritesList || favoritesList.length === 0) {
    return (
        <BookmarkEmptyData
            text="You have no favourites yet! 🤔"
            image_url="/empty_bookmarks.svg"
            showBtn={false}
            image_alt_msg="Empty bookmarks list"
        />
    );
  }

  return (
      <div className="my-10">
        <div className="grid gap-4">
          <div className="app-container flex items-center justify-between">
            <h2 className="text-4xl text-pink-600 font-bold">Favorites</h2>
            <div className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <Link href="/bookmarks">
                <div className="flex items-center justify-center gap-1">
                  <BookmarkIcon className="h-5 w-5" />
                  <p className="text-sm">All Bookmarks</p>
                </div>
              </Link>
            </div>
          </div>
          {/* Pass the userId to BookmarkLists */}
          <BookmarkLists bookmarks={favoritesList} userId={userId} />
        </div>
      </div>
  );
}
