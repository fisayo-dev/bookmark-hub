const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="grid md:grid-cols-2">
      <div className="bg-pink text-white h-[100vh]">
        <div className="flex flex-col h-[100vh] items-center place-content-center justify-items-center">
          <div className="grid items-center text-center">
            <h2 className="text-3xl font-bold">Bookmark Hub</h2>
            <p>Your all in one bookmark store. <br /> Organize your bookmarks in one place.</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 h-[100vh]">
        {children}
      </div>
    </div>
  )
}

export default layout