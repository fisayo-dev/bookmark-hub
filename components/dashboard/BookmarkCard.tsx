import Image from "next/image";
import Link from "next/link";

const BookmarkCard = ({ view, name, url }: { name: string; view: string; url: string }) => {
    return (
        <div
            className={`hover:border-gray-400 overflow-hidden cursor-pointer border border-gray-200 rounded-2xl p-2 ${
                view === "grid" ? "h-auto" : "flex items-center gap-4"
            }`}
        >
            <Image
                height={100}
                width={100}
                className={`${view === 'grid' ? 'mx-auto' : 'w-24'}`}
                src="/not-found.svg"
                alt={name}
            />
            <div className="px-4">
                <h2 className="text-nowrap capitalize text-2xl font-bold">
                    {name.length > 12 ? `${name.substring(0, 12)}...` : name}
                </h2>
                <p className="text-nowrap text-sm">
                    {url.length > 30 ? `${url.substring(0, 30)}...` : url}
                </p>
                <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:underline"
                >
                    Visit
                </Link>
            </div>
        </div>
    );
};

export default BookmarkCard;
