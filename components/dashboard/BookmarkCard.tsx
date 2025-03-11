import Image from "next/image";
import Link from "next/link";
import { LinkIcon, MoreVertical, PencilIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Custom hook to adjust truncation lengths based on screen size for list view.
function useResponsiveTruncate(view: "list" | "grid") {
    const [maxLengths, setMaxLengths] = useState({
        titleMax: view === "list" ? 15 : 15,
        urlMax: view === "list" ? 20 : 20,
    });

    useEffect(() => {
        function update() {
            const width = window.innerWidth;
            if (view === "list") {
                if (width < 640) {
                    // Mobile
                    setMaxLengths({ titleMax: 15, urlMax: 20 });
                } else if (width < 1024) {
                    // Tablet
                    setMaxLengths({ titleMax: 20, urlMax: 25 });
                } else {
                    // Desktop
                    setMaxLengths({ titleMax: 25, urlMax: 30 });
                }
            } else {
                // For grid view (if needed) you can adjust these values accordingly.
                if (width < 640) {
                    setMaxLengths({ titleMax: 10, urlMax: 15 });
                } else if (width < 1024) {
                    setMaxLengths({ titleMax: 15, urlMax: 20 });
                } else {
                    setMaxLengths({ titleMax: 20, urlMax: 25 });
                }
            }
        }
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [view]);

    return maxLengths;
}

const BookmarkCard = ({view, title, favicon, url, onEdit, onDelete}: {
    title: string;
    view: "list" | "grid";
    favicon: string;
    url: string;
    onEdit: (newUrl: string) => Promise<void>;
    onDelete: () => void;
}) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [newUrl, setNewUrl] = useState(url);
    const { titleMax, urlMax } = useResponsiveTruncate(view);

    const handleEdit = async () => {
        if (url === newUrl) {
            setIsEditOpen(false);
            return;
        }
        await onEdit(newUrl);
        setIsEditOpen(false);
    };

    return (
        <div
            className={`hover:border-gray-400 overflow-hidden  border border-gray-200 rounded-2xl p-4 relative ${
                view === "list" ? "bookmark-list-mode-grid" : "grid gap-2 h-auto"
            }`}
        >
                    {/* Column 1: Icon */}
                    <div className="flex items-center justify-center">
                        {favicon === "image" ? (
                            <LinkIcon className="w-10 h-10" />
                        ) : (
                            <Link
                                href={favicon || ''}
                                target="_blank"
                                rel="noopener noreferrer">
                                <Image
                                    height={40}
                                    width={40}
                                    className="cursor-pointer w-10 h-10"
                                    src={favicon || "/not-found.svg"}
                                    alt={title || url}
                                    unoptimized={true}
                                />
                            </Link>
                        )}
                    </div>

                    {/* Column 2: Text */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-nowrap capitalize font-bold">
                            {title.length > titleMax ? `${title.substring(0, titleMax)}...` : title}
                        </h2>
                        <p className="text-nowrap text-sm">
                            {url.length > urlMax ? `${url.substring(0, urlMax)}...` : url}
                        </p>
                    </div>

                    {/* Column 3: Actions */}
                    <div className={`flex items-center ${view == 'list' && 'justify-end'} gap-1`}>
                        <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 px-4 rounded-full bg-gray-200 text-sm hover:underline"
                        >
                            Visit
                        </Link>
                        <div className={`${view == 'grid' && 'absolute top-3 right-3'}`}>

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical className="hover:bg-gray-200 p-2 rounded-full w-8 h-8 cursor-pointer" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                                        <div className="flex items-center gap-2">
                                            <PencilIcon className="w-5 h-5" />
                                            <p>Edit</p>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={onDelete} className="hover:text-red-500 text-red-500">
                                        <div className="flex items-center gap-2">
                                            <TrashIcon className="w-5 h-5" />
                                            <p>Delete</p>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                    </div>
                </div>
            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Bookmark</DialogTitle>
                    </DialogHeader>
                    <Input
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        placeholder="Enter new URL"
                    />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEdit}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BookmarkCard;
