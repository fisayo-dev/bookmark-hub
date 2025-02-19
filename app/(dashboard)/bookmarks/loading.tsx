const Loading = () => {
    return (
      <div className="space-y-4 p-4">
        {/* Skeleton Header */}
        <div className="h-6 w-48 bg-gray-200 rounded-md animate-pulse"></div>
        
        {/* Skeleton Cards */}
        <div className="space-y-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-16 w-full bg-gray-300 rounded-md animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Loading;