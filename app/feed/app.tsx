export default function FeedPage() {
  return (
    <div className="pt-4 animate-in fade-in space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Verified Feed</h2>
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">Dr</div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm flex items-center">Dr. A. Oladipo <span className="ml-1 text-green-500 text-xs">✓</span></h4>
            <p className="text-xs text-gray-500">Verified Physician • 2h ago</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed">
          Friendly reminder: Antibiotics do not cure viral infections like the common cold. Always finish your prescribed dosage!
        </p>
      </div>
    </div>
  );
}