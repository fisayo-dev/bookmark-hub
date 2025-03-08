import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const {userId} = await req.json();
    try {
        if (!userId) return;

        const particularUser = await db
            .select()
            .from(users)
            .where(eq(users.id, userId.toString()))
            .limit(1)

        return new Response(JSON.stringify(particularUser[0]));

    } catch(err) {
        return new Response(JSON.stringify({ error: "Error occurred while trying to fetch user details" }), { status: 401 });
    }


}