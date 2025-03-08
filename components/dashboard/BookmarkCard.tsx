import Image from "next/image";
import Link from "next/link";
import {LinkIcon} from "lucide-react";

const BookmarkCard = ({ view, title, favicon, url }: { title: string; view: string; favicon: string; url: string }) => {
    return (
        <div
            className={`hover:border-gray-400 overflow-hidden cursor-pointer border border-gray-200 rounded-2xl p-4 ${
                view === "grid" ? "h-auto" : "flex items-center gap-4"
            }`}
        >
            {favicon == 'image' ? (
                <LinkIcon className={`${view === "grid" && "mx-auto" } w-10 h-10`}/>
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
        </div>
    );
};

export default BookmarkCard;
