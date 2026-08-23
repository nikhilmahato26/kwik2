export default function Loading() {
  return (
    <div className="flex-1 w-full min-h-[80vh] bg-off-white animate-pulse pt-24">
      {/* Section Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-24">
        {/* Title Skeleton */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <div className="h-10 bg-gray-200 rounded w-64"></div>
          <div className="h-4 bg-gray-200 rounded w-96 max-w-full"></div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
              <div className="h-56 bg-gray-200 w-full"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="pt-4 flex justify-between items-center border-t border-gray-100 mt-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
