import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import config from "@/lib/config";
import BookmarkEmptyData from "@/components/dashboard/BookmarkEmptyData";

export const revalidate = 60; // Cache for 60 seconds globally

async function fetchBookmarks(userId: string): Promise<Bookmark[]> {
    const res = await fetch(`${config.env.apiUrl}/api/bookmarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
        next: { revalidate: 60 }, // Cache data for 1 minute
    });

    if (!res.ok) return [];
    let bookmarks: Bookmark[] = await res.json();
    return bookmarks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export default async function Pages() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return <p className="app-container mt-20 text-red-500">Please log in to view bookmarks</p>;
    }

    const bookmarkList = await fetchBookmarks(userId);

    if (bookmarkList.length == 0) {
        return <BookmarkEmptyData text="You have no bookmarks yet! 🤔" image_url="/empty_bookmarks.svg" btn_text="Create my first bookmark" image_alt_msg="Empty bookmarks list"/>
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
