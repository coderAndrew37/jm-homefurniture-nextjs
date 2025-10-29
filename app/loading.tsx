export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Skeleton */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-amber-200 rounded-lg animate-pulse"></div>
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Main Loading Spinner */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mb-8 mx-auto"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="mt-16 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Image Skeleton */}
                <div className="aspect-[4/3] bg-gray-200 animate-pulse"></div>

                {/* Content Skeleton */}
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>

                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <div
                        key={starIndex}
                        className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                      ></div>
                    ))}
                  </div>

                  <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
