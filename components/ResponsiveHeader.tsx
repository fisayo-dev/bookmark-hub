import Logo from "@/components/logo";
import {MenuIcon} from "lucide-react";

const ResponsiveHeader = () => {
    return (
        <div>
            <div className="absolute">

            </div>
            <div className="bg-transparent backdrop-blur-md lg:hidden fixed w-full">
                <div className="app-container py-2 flex items-center justify-between">
                    <div>
                        <Logo/>
                    </div>
                    <div className='p-2 cursor-pointer hover:bg-gray-100 rounded-full'>
                        <MenuIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResponsiveHeader
