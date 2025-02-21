import Image from "next/image"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="grid w-full h-[100vh] md:grid-cols-2 bg-white">
      <div className="bg-pink text-white">
        <div className="flex h-full flex-col items-center place-content-center justify-items-center">
          {/* <div className="grid items-center text-center">
            <h2 className="text-3xl font-bold">Bookmark Hub</h2>
            <p>Your all in one bookmark store. <br /> Organize your bookmarks in one place.</p>
          </div> */}
          {/* <x` */}
        </div>
      </div>
      <div className="p-4 h-full">
        <div className="flex h-full flex-col items-center place-content-center justify-items-center">
          {children}
         </div>
      </div> 
    </div> 
  )
}

export default layout