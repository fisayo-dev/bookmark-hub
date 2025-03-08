import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { revalidateTag } from "next/cache";
import {auth} from "@/auth";

export default async function Pages() {
  // Fetch bookmarks from API route
  const session = await auth();
  const userId = session?.user?.id as string;

  const res = await fetch("http://localhost:3000/api/bookmarks", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({userId}),
        credentials: "include",
  });


  if (!res.ok) {
    console.error("Failed to fetch bookmarks");
    return <p className="text-red-500">Failed to load bookmarks</p>;
  }

  const bookmarkList = await res.json();
  console.log(bookmarkList);

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

// ✅ Revalidate when a bookmark is added/removed
export async function revalidateBookmarks() {
  revalidateTag("bookmarks");
}
