import BookmarkLists from "@/components/dashboard/BookmarkLists";
import { BookmarkIcon } from "lucide-react";
import Link from "next/link";
import { db } from "@/database/drizzle";
import { bookmarks } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

export default async function Pages() {
  const session = await auth();
  const userId = session?.user?.id as string;

  const bookmarkList = await db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.owner, userId))
      .execute();

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
