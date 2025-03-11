"use client";

import {ReactNode, useEffect, useState} from "react";
import { Grid, List, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import BookmarkCard from "@/components/dashboard/BookmarkCard";
import { deleteBookmark, editBookmark } from "@/lib/actions/bookmark";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import config from "@/lib/config";
import BookmarkEmptyData from "@/components/dashboard/BookmarkEmptyData";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
    bookmarks: Bookmark[];
}

interface BookmarkStyleBtns {
    function: () => void;
    icon: ReactNode;
    name?: string;
}

const BookmarkLists = ({ bookmarks }: Props) => {
    const [view, setView] = useState<"grid" | "list">("grid");
    const [search, setSearch] = useState("");
    const [bookmarksState, setBookmarksState] = useState(bookmarks);
    const router = useRouter();
    const queryClient = useQueryClient();


    useEffect(() => {
        const layout = localStorage.getItem("layout");
        if(!layout) {
            localStorage.setItem("layout", "grid");
        } else {
            setView(layout as "grid" | "list");
        }
    }, [queryClient]);

    const changeLayout = (layout: string) => {
        const currentLayout = localStorage.getItem("layout");
        if (layout === currentLayout) return;
        setView(layout as "grid" | "list");
        localStorage.setItem("layout", layout);
    }

    const bookmarkStyleBtns: BookmarkStyleBtns[] = [
        {
            function: () => changeLayout("grid"),
            icon: <Grid className="h-7 w-7" />,
            name: "grid",
        },
        {
            function: () => changeLayout("list"),
            icon: <List className="h-7 w-7" />,
            name: "list",
        },
    ];

    const filteredBookmarks = bookmarksState.filter(
        (bookmark) =>
            bookmark.name.toLowerCase().includes(search.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(search.toLowerCase())
    );

    // Delete Bookmark Mutation
    const { mutate: removeBookmark, isPending: isDeleting } = useMutation({
        mutationFn: async (id: string) => {
            await deleteBookmark(id);
        },
        onSuccess: (_, id) => {
            setBookmarksState((prev) => prev.filter((bookmark) => bookmark.id !== id));
            toast.success("Bookmark deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] }); // ✅ Refresh cache
            router.refresh(); // ✅ Ensure SSR cache update
        },
        onError: () => {
            toast.error("Failed to delete bookmark.");
        },
    });

    // Update Bookmark Mutation (Fixed)
    const { mutate: updateBookmark, isPending: isUpdating } = useMutation({
        mutationFn: async ({ id, newUrl }: { id: string; newUrl: string }) => {
            if (!newUrl.startsWith("http")) {
                throw new Error("Invalid URL. Please enter a valid URL.");
            }

            const metaDataResponse = await fetch(`${config.env.apiUrl}/api/getMeta?url=${encodeURIComponent(newUrl)}`);
            if (!metaDataResponse.ok) {
                throw new Error(`Failed to fetch metadata. Status: ${metaDataResponse.status}`);
            }

            const data = await metaDataResponse.json();
            await editBookmark(id, data?.title ?? "No Title", data?.favicon ?? "", newUrl);

            return { id, newUrl, name: data?.title, image: data?.favicon };
        },
        onSuccess: ({ id, newUrl, name, image }) => {
            setBookmarksState((prev) =>
                prev.map((bookmark) =>
                    bookmark.id === id ? { ...bookmark, url: newUrl, name, image } : bookmark
                )
            );

            toast.success("Bookmark updated successfully! 🎉");
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] }); // ✅ Refresh cache
            router.refresh(); // ✅ Ensure SSR cache update
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update bookmark. ❌ Please check the URL.");
        },
    });

    return (
        <div className="app-container">
            <div className="flex items-center gap-4 py-4">
                <div className="bg-gray-100 w-full px-4 gap-2 py-3 rounded-2xl flex items-center">
                    <SearchIcon className="h-6 w-6 text-gray-400" />
                    <Input
                        className="w-full px-0 py-1"
                        placeholder={`${bookmarks.length === 1 ? 'Search for one bookmark' : `Search through your ${bookmarks.length} bookmarks 😎`}`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    {bookmarkStyleBtns.map((btn, index) => (
                        <div
                            key={index}
                            onClick={btn.function}
                            className={`cursor-pointer hover:bg-gray-200 p-2 rounded-full ${
                                btn.name === view ? "color-pink" : ""
                            }`}
                        >
                            {btn.icon}
                        </div>
                    ))}
                </div>
            </div>

            {filteredBookmarks.length == 0 && (
                <BookmarkEmptyData text="Sorry, couldn't get a search result 🔍" image_url="/no_search_result.svg" subtext="Why not try creating it?" btn_text="Create a new bookmark" image_alt_msg="Empty bookmarks list" />
            )}

            <div
                className={
                    view === "grid"
                        ? "grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
                        : "flex flex-col gap-4"
                }
            >
                {filteredBookmarks.map((bookmark) => (
                    <BookmarkCard
                        key={bookmark.id}
                        onEdit={(newUrl) => updateBookmark({ id: bookmark.id, newUrl })}
                        onDelete={() => removeBookmark(bookmark.id)}
                        url={bookmark.url}
                        favicon={bookmark.image}
                        title={bookmark.name}
                        view={view}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookmarkLists;
