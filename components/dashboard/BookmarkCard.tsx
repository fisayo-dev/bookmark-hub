"use client"; // Ensure this runs on the client side

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const BookmarkCard = ({ view, name, url }: { name: string; view: string; url: string }) => {
    const [meta, setMeta] = useState<{ title?: string; favicon?: string }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMetadata() {
            const cacheKey = `meta-${url}`;
            const cachedData = localStorage.getItem(cacheKey);
            const cachedTime = localStorage.getItem(`${cacheKey}-time`);

            if (cachedData && cachedTime && Date.now() - Number(cachedTime) < CACHE_DURATION) {
                setMeta(JSON.parse(cachedData)); // Use cached data
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/getMeta?url=${encodeURIComponent(url)}`, {
                    next: { revalidate: 300 }, // Backend caches data for 5 minutes
                });
                const data = await response.json();
                setMeta(data);

                // Store metadata in localStorage with a timestamp
                localStorage.setItem(cacheKey, JSON.stringify(data));
                localStorage.setItem(`${cacheKey}-time`, Date.now().toString());
            } catch (error) {
                console.error("Error fetching metadata:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMetadata();
    }, [url]);

    return (
        <div
            className={`hover:border-gray-400 overflow-hidden cursor-pointer border border-gray-200 rounded-2xl p-4 ${
                view === "grid" ? "h-auto" : "flex items-center gap-4"
            }`}
        >
            <Image
                height={40}
                width={40}
                className={`${view === "grid" ? "mx-auto" : "w-10 h-10"}`}
                src={meta.favicon || "/not-found.svg"}
                alt={meta.title || name}
                unoptimized={true} // Prevents Next.js optimizations if needed
            />
            <div className="md:py-4 px-4">
                <h2 className="text-nowrap capitalize text-xl font-bold">
                    {loading
                        ? "Loading..."
                        : meta.title
                            ? meta.title.length > 20
                                ? `${meta.title.substring(0, 20)}...`
                                : meta.title
                            : name.length > 20
                                ? `${name.substring(0, 20)}...`
                                : name}
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
