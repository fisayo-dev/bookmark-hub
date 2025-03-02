import Image from "next/image";
import Link from "next/link";

const BookmarkCard = ({view, title, body }: {title: string; view: string; body: string }) => {
    return (
        <div
            className={`hover:border-gray-400 overflow-hidden cursor-pointer border border-gray-200 rounded-2xl p-2 ${
                view === "grid" ? "h-auto" : "flex items-center gap-4"
            }`}
        >
            <Image
                height={100}
                width={100}
                className={`${view == 'grid' ? 'mx-auto' :
                    'w-24'}`}
                src="/not-found.svg"
                alt={title}
            />
            <div className="px-4">
                <h2 className="text-nowrap capitalize text-2xl font-bold">{title.length > 12 ? `${title.substring(0, 12)}...` : title}</h2>
                <p className="text-nowrap capitalize">{body.length > 30 ? `${body.substring(0, 30)}...` : body}</p>
                <Link href='/ddd' className="text-sm hover:underline">
                    Visit
                </Link>
            </div>
        </div>
    )
}
export default BookmarkCard
