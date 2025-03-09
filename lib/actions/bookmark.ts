"use server";

import { db } from "@/database/drizzle";
import { bookmarks } from "@/database/schema";
import { revalidatePath } from "next/cache";
import {eq} from "drizzle-orm";
import {redirect} from "next/navigation"; // Import Next.js cache invalidation

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


export const deleteBookmark = async (id: string) => {
    await db
        .delete(bookmarks)
        .where(eq(bookmarks.id, id));

    // ✅ Clear cache for the bookmarks page after deleting bookmark
    revalidatePath("/bookmarks");
}

export const editBookmark = async (id: string, newUrl: string) => {
    try {
        const metaDataResponse = await fetch(`/api/getMeta?url=${encodeURIComponent(newUrl)}`);
        const data = await metaDataResponse.json();
        console.log(data)

        await db
            .update(bookmarks)
            .set({
                url:newUrl,
                name: data?.title,
                image: data?.favicon,
            })
            .where(eq(bookmarks.id, id));

        // ✅ Clear cache for the bookmarks page after editing bookmark
        revalidatePath("/bookmarks");
    } catch(err) {
        console.log(err, 'Error occurred trying to get meta data of new url');
    }
}