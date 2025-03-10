import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "lucide-react";

const EmptyBookmarks = () => {
    return (
        <div className="app-container mt-20 text-gray-900">
            <div className="grid gap-2 justify-center">
                <Image
                    src='/empty_bookmarks.svg'
                    height={300}
                    width={300}
                    className="mx-auto"
                    alt="Empty Bookmarks"
                />
                <h2 className="mx-auto text-2xl font-bold text-center">You have no bookmarks yet! 🤔</h2>
                <Link href="/create-bookmark" className="mx-auto">
                    <Button className="text-center flex gap-2 justify-between items-center">
                        <PlusIcon />
                        <p>Create my first bookmark</p>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
export default EmptyBookmarks
