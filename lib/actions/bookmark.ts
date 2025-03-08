"use server";

import { db } from "@/database/drizzle";
import { bookmarks } from "@/database/schema";
import { revalidatePath } from "next/cache"; // Import Next.js cache invalidation

interface Props {
    url: string;
    name: string;
    image?: string;
    owner: string;
    createdAt: Date;
}

export const addBookmark = async (data: Props) => {
    await db.insert(bookmarks).values(data);

    // ✅ Clear cache for the bookmarks page after adding a new bookmark
    revalidatePath("/bookmarks");
};
