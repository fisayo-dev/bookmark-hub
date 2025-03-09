import Image from "next/image";
import Link from "next/link";
import {LinkIcon, MoreHorizontal, MoreVertical} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const BookmarkCard = ({ view, title, favicon, url, onEdit, onDelete }: { title: string; view: string; favicon: string; url: string; onEdit: () => void; onDelete: () => void }) => {
    return (
        <div
            className={`hover:border-gray-400  items-center overflow-hidden cursor-pointer border border-gray-200 rounded-2xl p-4 ${
                view === "grid" ? "h-auto" : "flex  gap-4"
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
                    {title
                        ? title.length > (view === "list" ? 23 : 20)
                            ? `${title.substring(0, view === "list" ? 23 : 20)}...`
                            : title
                        : title.length > (view === "list" ? 23 : 20)
                            ? `${title.substring(0, view === "list" ? 23 : 20)}...`
                            : title}
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
            <div className={`${view == 'grid' && 'absolute top-4 right-4'} `}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <MoreVertical className="hover:bg-gray-200 p-2 rounded-full w-8 h-8 cursor-pointer" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default BookmarkCard;
