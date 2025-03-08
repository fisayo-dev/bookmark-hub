import { db } from "@/database/drizzle";
import { bookmarks } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const {userId} = await req.json();
    try {
        // Authenticate user
        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        // Fetch bookmarks
        const bookmarkList = await db
            .select()
            .from(bookmarks)
            .where(eq(bookmarks.owner, userId.toString()))
            .execute();

        return new Response(JSON.stringify(bookmarkList), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "s-maxage=60, stale-while-revalidate"
            },
        });
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
