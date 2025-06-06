"use client";

import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import BookmarkEmptyData from "@/components/dashboard/BookmarkEmptyData";
import { useSession } from "next-auth/react"; // Assuming you're using NextAuth.js for authentication
import config from "@/lib/config";
import BookmarksLoader from "@/components/dashboard/BookmarksLoader";

// Fetch function using fetch API
const fetchBookmarks = async (userId: string): Promise<Bookmark[]> => {
    const res = await fetch(`${config.env.apiUrl}/api/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });

    if (!res.ok) return [];
    let bookmarks: Bookmark[] = await res.json();
    return bookmarks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export default function Pages() {
    const { data: session } = useSession(); // Get session data
    const userId = session?.user?.id as string;

    // Use React Query to fetch bookmarks
    const { data: bookmarkList, isLoading, isError } = useQuery({
        queryKey: ["bookmarks", userId],
        queryFn: () => fetchBookmarks(userId),
        enabled: !!userId, // Prevent fetching if user is not logged in
        staleTime: 60000, // Cache data for 60 seconds
        // @ts-ignore
        cacheTime: 300000, // Keep cached data for 5 minutes
        retry: 2, // Retry fetch if it fails
    });

    if (!userId) {
        return <p className="app-container mt-20 text-red-500">Please log in to view bookmarks</p>;
    }

    if (isLoading) {
        return <BookmarksLoader />

    }

    if (isError) {
        return <p className="app-container mt-20 text-red-500">Failed to load bookmarks. Try again later.</p>;
    }

    // @ts-ignore
    if (!bookmarkList || bookmarkList.length === 0) {
        return <BookmarkEmptyData text="You have no bookmarks yet! 🤔" image_url="/empty_bookmarks.svg" btn_text="Create my first bookmark" image_alt_msg="Empty bookmarks list" />;
    }

    return (
        <div className="my-10">
            <div className="grid gap-4">
                <div className="app-container flex items-center justify-between">
                    <h2 className="text-4xl text-pink-600 font-bold">Bookmarks</h2>
                    <div className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer">
                        <Link href="/create-bookmark" className="flex items-center justify-center gap-1">
                            <BookmarkIcon className="h-5 w-5" />
                            <p className="text-sm">New</p>
                        </Link>
                    </div>
                </div>
                {/* @ts-ignore */}
                <BookmarkLists bookmarks={bookmarkList} />
            </div>
        </div>
    );
}
