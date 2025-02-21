const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="grid w-full h-[100vh] md:grid-cols-2 p-2 bg-gray-200">
      <div className="bg-pink h-full text-white rounded-3xl overflow-hidden">
        <div className="flex flex-col items-center place-content-center justify-items-center">
          <div className="grid items-center text-center">
            <h2 className="text-3xl font-bold">Bookmark Hub</h2>
            <p>Your all in one bookmark store. <br /> Organize your bookmarks in one place.</p>
          </div>
        </div>
      </div>
      <div className="p-4 h-full">
        {children}
      </div> 
    </div>
  )
}

export default layout