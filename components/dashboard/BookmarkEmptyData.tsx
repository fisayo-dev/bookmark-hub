import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PlusIcon} from "lucide-react";

interface Props {
    text: string;
    subtext?: string;
    image_url: string;
    btn_text: string;
    image_alt_msg?: string;
    url_link?: string;
}

const BookmarkData = ({text, subtext, image_url, btn_text, image_alt_msg, url_link}: Props) => {
    return (
        <div className="app-container mt-20 text-gray-900">
            <div className="grid gap-2 justify-center">
                <Image
                    src={image_url}
                    height={300}
                    width={300}
                    className="mx-auto"
                    alt={image_alt_msg || "Bookmark data image"}
                />
                <h2 className="mx-auto text-2xl font-bold text-center">{text}</h2>
                {subtext && (<p className="mx-auto text-sm text-center">{subtext}</p>)}
                <Link href={url_link || "/create-bookmark"} className="mx-auto">
                    <Button className="text-center flex gap-2 justify-between items-center">
                        <PlusIcon/>
                        <p>{btn_text}</p>
                    </Button>
                </Link>
            </div>
        </div>
    )
}
export default BookmarkData
