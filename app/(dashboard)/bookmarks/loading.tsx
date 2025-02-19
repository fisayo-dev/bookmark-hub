const Loading = () => {
    return (
      <div className="space-y-6 p-4 mt-10">
        {/* Skeleton Header */}
        <div className="h-14 w-64 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-14 w-9/12 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
        
        {/* Skeleton Cards */}
        <div className="grid gap-2 grid-cols-4 app-container">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-[35vh] bg-gray-200 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Loading;