'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DoctorProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(1280);
  const [userRating, setUserRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const handleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
    } else {
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
    }
  };

  const handleRate = (star: number) => {
    setUserRating(star);
    setHasRated(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-6 pb-12">
      {/* Back button */}
      <Link href="/feed" className="inline-flex items-center space-x-1 text-sm font-semibold text-blue-600 hover:opacity-80 transition">
        <span>&larr;</span>
        <span>Back to Feed</span>
      </Link>

      {/* Profile Header Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl border-2 border-white shadow-md">
          Dr
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Dr. A. Oladipo, B.Pharm</h1>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Chief Pharmacist • Lagos University Teaching Hospital</p>
          <div className="flex items-center justify-center space-x-1 mt-2 text-xs text-green-700 bg-green-50 py-1 px-3 rounded-full w-fit mx-auto font-semibold">
            <span>🟢 PCN License Verified Active</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center space-x-8 py-2 border-y border-gray-50">
          <div>
            <div className="text-lg font-bold text-gray-900">{followersCount}</div>
            <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Followers</div>
          </div>
          <div className="border-r border-gray-100"></div>
          <div>
            <div className="text-lg font-bold text-gray-900">4.9 ★</div>
            <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">Rating</div>
          </div>
        </div>

        {/* Action Buttons: Follow & Message */}
        <div className="flex space-x-3 pt-1">
          <button
            onClick={handleFollow}
            className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95 ${
              isFollowing
                ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isFollowing ? 'Following ✓' : 'Follow'}
          </button>
          <button
            onClick={() => alert('Opening encrypted direct medical consultation chat...')}
            className="flex-1 py-3 rounded-2xl font-bold text-sm bg-gray-50 text-gray-800 border border-gray-200 hover:bg-gray-100 transition-all active:scale-95"
          >
            Message
          </button>
        </div>
      </div>

      {/* Star Rating Section */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 text-center space-y-3">
        <h3 className="text-sm font-bold text-gray-900">Rate This Professional's Credibility</h3>
        <p className="text-xs text-gray-500">Your feedback helps secure verified clinical accuracy on Healthne.</p>
        <div className="flex justify-center space-x-2 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              className={`text-2xl transition-transform hover:scale-125 ${
                star <= userRating ? 'text-amber-400' : 'text-gray-200'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {hasRated && <p className="text-xs text-green-600 font-semibold animate-in fade-in">Thank you for rating Dr. Oladipo!</p>}
      </div>

      {/* Posts Published by this Doctor */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Publications & Updates</h3>
        
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
          <p className="text-xs text-gray-400 font-medium">2 hours ago</p>
          <p className="text-gray-800 text-sm leading-relaxed">
            🚨 <strong>Friendly reminder:</strong> Antibiotics do not cure viral infections like the common cold. Using them incorrectly leads to resistance. Always finish your prescribed dosage even if you feel better!
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-xs text-gray-400">
            <span>❤️ 48 Likes</span>
            <span>💬 12 Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}