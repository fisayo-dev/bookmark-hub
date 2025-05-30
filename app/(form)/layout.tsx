import Image from "next/image"
import Logo from '@/components/logo'
import {ReactNode} from 'react'
import {auth} from "@/auth";
import {redirect} from "next/navigation";

const layout = async ({children}: {children: ReactNode}) => {
    const session = await auth()
    if (session) redirect('/bookmarks')
  return (
    <div className="grid w-full h-[100vh] lg:grid-cols-2 bg-white">
      <div className="hidden lg:block w-full text-white">
        <div className="flex relative h-full flex-col items-center place-content-center justify-items-center">
          <div className="mx-auto absolute top-10">
            <Logo />
          </div>
            <Image
              src="/signup_vector.svg"
              alt="Google signing"
              height={100}
              width={100}
              className="w-5/6 mx-auto"
              draggable={false}
          />
        </div>
      </div>
      <div className="p-4 h-full">
        <div className="flex h-full flex-col place-content-center">
          <div className="grid gap-6 mx-auto px-4 w-full sm:w-5/6">
            {children}              
          </div>
         </div>
      </div> 
    </div> 
  )
}

export default layout