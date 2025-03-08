"use server"

import {db} from "@/database/drizzle";
import {bookmarks} from "@/database/schema";

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