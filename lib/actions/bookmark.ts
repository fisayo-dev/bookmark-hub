"use server";

import { db } from "@/database/drizzle";
import { bookmarks } from "@/database/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

interface Props {
    url: string;
    name: string;
    image?: string;
    owner: string;
    createdAt: Date;
}

export const addBookmark = async (data: Props) => {
    const newBookmark = await db.insert(bookmarks).values(data).returning();
    revalidatePath("/bookmarks");
    return newBookmark[0]; // Return the newly inserted bookmark
};


export const deleteBookmark = async (id: string) => {
    await db.delete(bookmarks).where(eq(bookmarks.id, id));
};

export const editBookmark = async (id: string, title: string, favicon:string, newUrl: string) => {
    try{
        await db
            .update(bookmarks)
            .set({
                url: newUrl,
                name: title || "Untitled",
                image: favicon || null,
            })
            .where(eq(bookmarks.id, id));

        revalidatePath("/bookmarks");
    } catch (err) {
        console.error("Error fetching metadata:", err);
    }
};

export const starBookmark = async (id: string, status: boolean) => {
    try {
        await db
            .update(bookmarks)
            .set({
                starred: status
            })
            .where(eq(bookmarks.id, id));
    } catch (err) {
        console.error("Error starring bookmark:", err);
    }
}
