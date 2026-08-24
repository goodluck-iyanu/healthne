export default function FeedPage() {
  return (
    <div className="pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4 pb-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Verified Feed</h2>
        <p className="text-sm text-gray-500">Updates from licensed professionals.</p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 transition hover:shadow-md">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-100">Dr</div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm flex items-center">Dr. A. Oladipo <span className="ml-1 bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded-full">✓ Verified</span></h4>
            <p className="text-xs text-gray-400 font-medium">Lagos University Teaching Hospital • 2h ago</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed mb-4">
          Friendly reminder: Antibiotics do not cure viral infections like the common cold. Using them incorrectly leads to resistance. Always finish your prescribed dosage even if you feel better!
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-gray-50 text-xs text-gray-400 font-medium">
          <button className="hover:text-blue-600 flex items-center space-x-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg><span>48 Likes</span></button>
          <button className="hover:text-blue-600 flex items-center space-x-1"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg><span>12 Comments</span></button>
        </div>
      </div>
    </div>
  );
}