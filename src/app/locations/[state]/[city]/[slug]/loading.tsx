export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F9FAF7] font-outfit animate-pulse pt-[104px]">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2">
          <div className="h-3 bg-gray-200 rounded-full w-12" />
          <div className="h-3 bg-gray-200 rounded-full w-16" />
          <div className="h-3 bg-gray-200 rounded-full w-20" />
          <div className="h-3 bg-gray-200 rounded-full w-24" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2rem] p-8 sm:p-12 border border-gray-100 shadow-sm">
              {/* Store Name */}
              <div className="h-10 bg-gray-200 rounded-2xl w-3/4 mb-4" />
              <div className="flex items-center gap-3 mb-10">
                <div className="h-7 bg-gray-200 rounded-full w-24" />
                <div className="h-7 bg-gray-200 rounded-full w-32" />
              </div>

              {/* Address & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 shrink-0" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded-full w-16 mb-3" />
                    <div className="h-5 bg-gray-200 rounded-xl w-full mb-2" />
                    <div className="h-3 bg-gray-200 rounded-full w-3/4" />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 shrink-0" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 rounded-full w-16 mb-3" />
                    <div className="h-5 bg-gray-200 rounded-xl w-3/4" />
                  </div>
                </div>
              </div>

              {/* About Paragraph */}
              <div className="mt-8 pt-6 border-t border-gray-50 space-y-2">
                <div className="h-3 bg-gray-100 rounded-full w-full" />
                <div className="h-3 bg-gray-100 rounded-full w-5/6" />
                <div className="h-3 bg-gray-100 rounded-full w-4/6" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-6">
            {/* Hours Card */}
            <div className="bg-gray-200 rounded-[2rem] p-10 h-[500px]" />
            {/* Map Card */}
            <div className="bg-gray-100 rounded-[2rem] h-[400px] border border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
