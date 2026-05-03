export default function Loading() {
  return (
    <div className="min-h-screen bg-white font-outfit animate-pulse">
      {/* Hero Skeleton */}
      <section className="relative pt-36 pb-24 bg-gray-100">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="h-4 bg-gray-200 rounded-full w-48 mb-6" />
          <div className="h-12 bg-gray-200 rounded-2xl w-3/4 mb-4" />
          <div className="h-6 bg-gray-200 rounded-xl w-1/2" />
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="max-w-[1200px] mx-auto px-6 py-20">
        {/* Macro Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="h-3 bg-gray-200 rounded-full w-20 mb-4" />
              <div className="h-10 bg-gray-200 rounded-2xl w-24" />
            </div>
          ))}
        </div>

        {/* Item Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="h-44 bg-gray-100" />
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded-full w-1/2 mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-100 rounded-lg w-14" />
                  <div className="h-6 bg-gray-100 rounded-lg w-14" />
                  <div className="h-6 bg-gray-100 rounded-lg w-14" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
