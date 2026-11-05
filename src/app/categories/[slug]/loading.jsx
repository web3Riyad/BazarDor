export default function Loading() {
  return (
    <div className="bg-[#f6f8f6] min-h-screen py-8 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 flex items-center gap-4">
          <div className="w-14 h-14 bg-gray-200 rounded-2xl shrink-0" />
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded-md" />
            <div className="h-4 w-48 bg-gray-100 rounded-md" />
          </div>
        </div>

        {/* Sort Bar Skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3 flex justify-end">
          <div className="h-8 w-36 bg-gray-100 rounded-lg" />
        </div>

        {/* Subtitle Skeleton */}
        <div className="h-4 w-40 bg-gray-200 rounded-md" />

        {/* Product Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-xl shrink-0" />
                <div className="space-y-2 w-full">
                  <div className="h-4 w-28 bg-gray-200 rounded-md" />
                  <div className="h-3 w-16 bg-gray-100 rounded-md" />
                </div>
              </div>
              <div className="flex items-end justify-between pt-3 border-t border-gray-50">
                <div className="h-5 w-20 bg-gray-200 rounded-md" />
                <div className="h-5 w-16 bg-gray-100 rounded-md" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

