import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { cache } from "react"; // Caching API

// Function to fetch bookmarks with caching
const fetchBookmarks = cache(async (userId: string): Promise<Bookmark[]> => {
    const res = await fetch("http://localhost:3000/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        next: { revalidate: 60 }, // Cache data for 1 minutes
    });

    if (!res.ok) return [];

    let bookmarks: Bookmark[] = await res.json();

    // Sort bookmarks from newest to oldest
    return bookmarks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
});

export default async function Pages() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return <p className="app-container mt-20 text-red-500">Please log in to view bookmarks</p>;
    }

    const bookmarkList = await fetchBookmarks(userId);

    if (!bookmarkList.length) {
        return <p className="app-container mt-20 text-gray-900">No bookmarks found</p>;
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
                <BookmarkLists bookmarks={bookmarkList} />
            </div>
        </div>
    );
}
