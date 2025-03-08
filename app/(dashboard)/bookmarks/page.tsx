import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { unstable_cache } from "next/cache";

export default async function Pages() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return <p className="app-container mt-20 text-red-500">Please log in to view bookmarks</p>;
    }

    // ✅ Cache bookmarks per user and revalidate when a new one is added
    const fetchBookmarks = unstable_cache(
        async (userId) => {
            const res = await fetch("http://localhost:3000/api/bookmarks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
                cache: "no-store", // ✅ Force fresh fetch
            });

            return res.ok ? res.json() : [];
        },
        ["bookmarks"], // ✅ Ensure this matches revalidateTag("bookmarks")
        { revalidate: false }
    );

    let bookmarkList = await fetchBookmarks(userId);

    bookmarkList = bookmarkList.sort((a: Bookmark, b: Bookmark) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

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
