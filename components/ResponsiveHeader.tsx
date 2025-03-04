"use client"
import Logo from "@/components/logo";
import {MenuIcon} from "lucide-react";
import {SidebarContent} from "@/components/sidebar";
import {useEffect, useState} from "react";

const ResponsiveHeader = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div>
            {showMenu && (
                <div>
                    <div className="block lg:hidden absolute top-0 left-0 z-50">
                        <div className="h-[100vh] w-[70vw] md:w-[35vw] lg:w-[25vw] bg-white shadow">
                            <SidebarContent />
                        </div>
                    </div>
                    <div onClick={() => setShowMenu(false)} className="absolute w-[100vw] h-[100vh] top-0 left-0 bg-black/25 z-40"></div>
                </div>
            )}
            <div className="bg-transparent backdrop-blur-md lg:hidden fixed w-full">
                <div className="app-container py-2 flex items-center justify-between">
                    <div>
                        <Logo/>
                    </div>
                    <div onClick={() => setShowMenu(true)} className='p-2 cursor-pointer hover:bg-gray-100 rounded-full'>
                        <MenuIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ResponsiveHeader
