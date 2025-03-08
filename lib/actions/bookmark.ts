"use server"

import {db} from "@/database/drizzle";
import {bookmarks} from "@/database/schema";
import {eq} from "drizzle-orm";
import {auth} from "@/auth";

interface Props {
    url: string;
    name: string;
    image?: string;
    owner: string;
    createdAt: Date;
}

export const addBookmark = async (data: Props) => {
    await db
        .insert(bookmarks)
        .values(data)
}

export const fetchBookmarks = async () => {
    const session = await auth();
    const userId = session?.user?.id as string;

    const bookmarkList = await db
        .select()
        .from(bookmarks)
        .where(eq(bookmarks.owner, userId))

    return {bookmarkList}
}