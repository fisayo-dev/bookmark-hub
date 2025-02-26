import BookmarkLists from "@/components/dashboard/BookmarkLists";

interface Bookmark {
  userId: number,
  id: number,
  title: string,
  body: string,
}

// Fetch data on the server
async function getBookmarks(): Promise<Bookmark[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: "force-cache" }); 
  if (!res.ok) throw new Error("Failed to fetch bookmarks");
  return res.json();
}

export default async function Pages() {
  const bookmarks = await getBookmarks(); // Fetching happens server-side

  return (
    <div className="my-10">
      <div className=" grid gap-4">
        <h2 className="app-container text-4xl color-pink font-bold">My Bookmarks</h2>
        <BookmarkLists bookmarks={bookmarks} />
      </div>
    </div>
  );
}
