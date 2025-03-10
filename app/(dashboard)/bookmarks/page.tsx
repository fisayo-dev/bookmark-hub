import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { cache } from "react";
import {Metadata} from "next";
import config from "@/lib/config";
import BookmarkEmptyData from "@/components/dashboard/BookmarkEmptyData"; // Caching API

export async function generateMetadata(): Promise<Metadata> {
    const session = await auth();
    return {
        title: session?.user?.name ? `${session.user.name} - Bookmark Hub` : "User Bookmarks page",
        description: session?.user?.name ? `This is ${session.user.name}'s bookmarks page. All bookmarks here belong to ${session.user.name}` : "User bookmark page description - A page that contains all the user bookmarks",
    };
}

// Function to fetch bookmarks with caching
const fetchBookmarks = cache(async (userId: string): Promise<Bookmark[]> => {
    const res = await fetch(`${config.env.apiUrl}/api/bookmarks`, {
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

    if (bookmarkList.length == 0) {
        return <BookmarkEmptyData text="You have no bookmarks yet! 🤔" image_url="/empty_bookmarks.svg" btn_text="Create my first bookmark" image_alt_msg="Empty bookamrks list"/>
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
