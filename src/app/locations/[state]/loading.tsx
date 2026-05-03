export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F9FAF7] font-outfit animate-pulse pt-[104px]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="h-10 bg-gray-200 rounded-2xl w-2/3 mb-4" />
        <div className="h-5 bg-gray-100 rounded-xl w-1/3 mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100" />
                <div className="h-5 bg-gray-100 rounded-full w-16" />
              </div>
              <div className="h-5 bg-gray-200 rounded-xl w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded-full w-full mb-4" />
              <div className="h-8 bg-gray-50 rounded-xl w-full mt-4 border-t border-gray-100 pt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
