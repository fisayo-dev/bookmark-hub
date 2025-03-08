import axios from "axios";
import * as cheerio from "cheerio";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");

    if (!url) {
        return Response.json({ error: "URL is required" }, { status: 400 });
    }

    try {
        // Fetch HTML content
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract the title
        const title = $("title").first().text() || "No title found";

        // Extract the favicon
        let favicon =
            $('link[rel="icon"]').attr("href") ||
            $('link[rel="shortcut icon"]').attr("href");

        if (favicon && !favicon.startsWith("http")) {
            const baseUrl = new URL(url).origin;
            favicon = `${baseUrl}${favicon.startsWith("/") ? "" : "/"}${favicon}`;
        } else if (!favicon) {
            favicon = `${new URL(url).origin}/favicon.ico`; // Default favicon
        }

        return Response.json({ title, favicon });
    } catch (error) {
        return Response.json({ error: "Failed to fetch metadata" }, { status: 500 });
    }
}
