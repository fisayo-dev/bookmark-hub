"use server"

import {db} from "@/database/drizzle";
import {bookmarks} from "@/database/schema";

type Props = {
    url: string;
    name: string;
    image?: string;
}

export const addBookmark = async (data: Props) => {
    await db
        .insert(bookmarks)
        .values(data)
}