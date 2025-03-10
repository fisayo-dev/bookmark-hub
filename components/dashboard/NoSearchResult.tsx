import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

const NoSearchResult = () => {
    return (
        <div className="app-container mt-20 text-gray-900">
            <div className="grid gap-2 justify-center">
                <Image
                    src='/no_search_result.svg'
                    height={300}
                    width={300}
                    className="mx-auto"
                    alt="Empty Bookmarks"
                />
                <h2 className="mx-auto text-2xl font-bold text-center">Sorry, couldn't get a search result 🔍</h2>
                <p className="mx-auto text-sm text-center">Why not try creating it?</p>
                <Link href="/create-bookmark" className="mx-auto">
                    <Button className="text-center flex gap-2 justify-between items-center">
                        <PlusIcon/>
                        <p>Create a new  bookmark</p>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
export default NoSearchResult
