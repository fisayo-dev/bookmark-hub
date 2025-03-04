import Logo from "@/components/logo";
import {MenuIcon} from "lucide-react";
import {SidebarContent} from "@/components/sidebar";

const ResponsiveHeader = () => {
    return (
        <div>
            <div className="block lg:hidden absolute top-0 left-0 z-50">
                <div className="h-[100vh] w-[50vw] md:w-[35vw] lg:w-[25vw] bg-white shadow">
                    <SidebarContent />
                </div>
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
