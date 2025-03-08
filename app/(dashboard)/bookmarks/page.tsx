import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Pages() {
    // Get authenticated user
    const session = await auth();
    const userId = session?.user?.id;
    console.log(userId);

    if (!userId) {
        console.error("User is not authenticated.");
        return <p className="text-red-500">Please log in to view bookmarks</p>;
    }

    console.log("Fetching bookmarks for userId:", userId);

    // Fetch bookmarks from API route
    const res = await fetch("http://localhost:3000/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
        console.error("Failed to fetch bookmarks");
        return <p className="text-red-500">Failed to load bookmarks</p>;
    }

    const bookmarkList = await res.json();
    console.log("Received bookmarks:", bookmarkList);

    if (!bookmarkList.length) {
        return <p className="app-container mt-20 text-gray-900">No bookmarks found</p>;
    }

    return (
        <div className="my-10">
            <div className="grid gap-4">
                <div className="app-container flex items-center justify-between">
                    <h2 className="text-4xl color-pink font-bold">Bookmarks</h2>
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
