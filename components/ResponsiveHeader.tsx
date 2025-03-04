import React from 'react'
import Logo from "@/components/logo";
import {MenuIcon} from "lucide-react";

const ResponsiveHeader = () => {
    return (
        <div className="md:hidden app-container sticky w-full">
            <div className="py-2 flex items-center justify-between">
                <Logo/>
                <div className='p-2 cursor-pointer hover:bg-gray-100 rounded-full'>
                    <MenuIcon />
                </div>
            </div>
        </div>
    )
}
export default ResponsiveHeader
