'use client';
import Link from 'next/link';

// Mock database for feed posts so future doctors/pharmacists can easily be added dynamically
const FEED_POSTS = [
  {
    id: 'post-1',
    doctorId: 'oladipo',
    doctorName: 'Dr. A. Oladipo',
    doctorRole: 'Chief Pharmacist',
    facility: 'Lagos University Teaching Hospital',
    timeAgo: '2h ago',
    content: '🚨 Friendly reminder: Antibiotics do not cure viral infections like the common cold. Using them incorrectly leads to resistance. Always finish your prescribed dosage even if you feel better!',
    likes: 48,
    comments: 12
  },
  {
    id: 'post-2',
    doctorId: 'chinedu',
    doctorName: 'Pharm. Chinedu Okoro',
    doctorRole: 'Clinical Pharmacist',
    facility: 'Reddington Multi-Specialist Hospital',
    timeAgo: '5h ago',
    content: '💊 Medication Storage Tip: Keep your insulin and biological medications stored strictly between 2°C and 8°C in a refrigerator. Heat exposure can denature active peptides and render them completely ineffective.',
    likes: 95,
    comments: 24
  }
];

export default function FeedPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Verified Feed</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">Updates from licensed professionals.</p>
      </div>

      {FEED_POSTS.map((post) => (
        <div key={post.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all active:scale-[0.99]">
          {/* Clickable Header linking to the specific doctor's profile */}
          <Link href={`/doctor/${post.doctorId}`} className="flex items-center space-x-3 mb-4 group cursor-pointer">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold border border-blue-100 shadow-sm group-hover:scale-105 transition">
              {post.doctorName.includes('Pharm') ? 'Ph' : 'Dr'}
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm flex items-center group-hover:text-blue-600 transition">
                {post.doctorName} 
                <span className="ml-2 bg-green-100 text-green-700 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">✓ Verified</span>
              </h4>
              <p className="text-[11px] text-gray-400 font-medium mt-0.5">{post.doctorRole} • {post.facility} • {post.timeAgo}</p>
            </div>
          </Link>

          <p className="text-gray-800 text-sm leading-relaxed mb-4">
            {post.content}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-gray-50 text-xs text-gray-400 font-semibold">
            <button className="hover:text-blue-600 flex items-center space-x-1.5 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              <span>{post.likes} Likes</span>
            </button>
            <button className="hover:text-blue-600 flex items-center space-x-1.5 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              <span>{post.comments} Comments</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}