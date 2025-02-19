const Loading = () => {
    return (
      <div className="space-y-6 p-4 mt-10">
        {/* Skeleton Header */}
        <div className="h-10 w-64 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
        
        {/* Skeleton Cards */}
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-16 w-3/4 mx-auto bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Loading;