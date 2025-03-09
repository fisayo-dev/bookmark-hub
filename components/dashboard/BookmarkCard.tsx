import Image from "next/image";
import Link from "next/link";
import {LinkIcon, MoreVertical, PencilIcon, TrashIcon} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BookmarkCard = ({ view, title, favicon, url, onEdit, onDelete }: { title: string; view: string; favicon: string; url: string; onEdit: (newUrl: string) => Promise<void>; onDelete: () => void }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [newUrl, setNewUrl] = useState(url);

    const handleEdit = async () => {
        if (url == newUrl) {
            setIsEditOpen(false);
            return;
        }
        await onEdit(newUrl);
        setIsEditOpen(false);
    };

    return (
        <div
            className={`hover:border-gray-400 overflow-hidden cursor-pointer border border-gray-200 rounded-2xl p-4 ${
                view === "grid" ? "h-auto" : "flex items-center gap-4"
            } relative`}
        >
            {favicon === 'image' ? (
                <LinkIcon className={`${view === "grid" && "mx-auto" } w-10 h-10`} />
            ) : (
                <Image
                    height={40}
                    width={40}
                    className={`${view === "grid" ? "mx-auto" : "w-10 h-10"}`}
                    src={favicon || "/not-found.svg"}
                    alt={title || url}
                    unoptimized={true} // Prevents Next.js optimizations if needed
                />
            )}
            <div className={`${view == 'grid' && 'md:py-4'} w-full px-4`}>
                <h2 className="text-nowrap capitalize text-xl font-bold">
                    {title.length > (view === "list" ? 23 : 20) ? `${title.substring(0, view === "list" ? 23 : 20)}...` : title}
                </h2>
                <p className="text-nowrap text-sm">
                    {url.length > (view === "list" ? 35 : 25) ? `${url.substring(0, view === "list" ? 35 : 25)}...` : url}
                </p>
                {view === "grid" && (
                    <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                    >
                        Visit
                    </Link>
                )}
            </div>
            {view === "list" && (
                <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-full bg-gray-200 text-sm hover:underline"
                >
                    Visit
                </Link>
            )}
            <div className={`${view == 'grid' && "absolute top-2 right-2"}`}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className="hover:bg-gray-200 p-2 rounded-full w-8 h-8 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                            <div className="flex items-center gap-2">
                                <PencilIcon className="w-5 h-5"/>
                                <p>Edit</p>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="hover:text-red-500 text-red-500">
                            <div className="flex items-center gap-2">
                                <TrashIcon className="w-5 h-5"/>
                                <p>Delete</p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Bookmark</DialogTitle>
                    </DialogHeader>
                    <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="Enter new URL" />
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button onClick={handleEdit}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BookmarkCard;
