import BookmarkLists from "@/components/dashboard/BookmarkLists";
import {BookmarkIcon} from 'lucide-react'
import Link from "next/link";

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
      <div className="grid gap-4">
        <div className='app-container flex items-center justify-between'>
          <h2 className=" text-4xl color-pink font-bold">Bookmarks</h2>
          <div className='p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 cursor-pointer'>
            <Link href="/create-bookmark" className='flex items-center justify-center gap-1'>
              <BookmarkIcon className='h-5 w-5'/>
              <p className='text-sm'>New</p>
            </Link>
          </div>
        </div>
        <BookmarkLists bookmarks={bookmarks} />
      </div>
    </div>
  );
}
