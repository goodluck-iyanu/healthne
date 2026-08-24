'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <header className="bg-[#F9FAFB] pt-8 pb-4 px-6 sticky top-0 z-40">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition">
            Healthne.
          </Link>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden hover:ring-4 hover:ring-blue-100 transition-all active:scale-95 border border-gray-300 shadow-sm"
          >
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Goodluck&backgroundColor=e2e8f0" alt="Goodluck Profile" />
          </button>
        </div>
      </header>

      {/* Smooth Settings Modal (Slide Up) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-[60] flex justify-center items-end sm:items-center bg-black/20 backdrop-blur-sm transition-opacity">
          {/* Background overlay click to close */}
          <div className="absolute inset-0" onClick={() => setIsSettingsOpen(false)}></div>
          
          {/* Settings Panel */}
          <div className="relative bg-white w-full max-w-md h-[85vh] sm:h-auto sm:rounded-3xl rounded-t-3xl p-6 flex flex-col shadow-2xl animate-in slide-in-from-bottom-full duration-300 ease-out">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Settings</h2>
              <button 
                onClick={() => setIsSettingsOpen(false)} 
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold hover:bg-gray-200 transition"
              >
                ✕
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex items-center space-x-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <img className="w-14 h-14 rounded-full bg-gray-200 border-2 border-white shadow-sm" src="https://api.dicebear.com/7.x/notionists/svg?seed=Goodluck&backgroundColor=e2e8f0" alt="Profile" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">Goodluck</h3>
                <p className="text-xs text-gray-500 font-medium">Hoberg Digital Agency</p>
              </div>
            </div>

            {/* Settings Options */}
            <div className="space-y-3 flex-1 overflow-y-auto pb-4">
              
              {/* Dark Mode Toggle */}
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🌓</span>
                  <span className="font-medium text-gray-700 text-sm">Dark Mode</span>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 flex items-center ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
              </div>

              {/* Account Settings */}
              <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition active:scale-[0.98]">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">👤</span>
                  <span className="font-medium text-gray-700 text-sm">Account Details</span>
                </div>
                <span className="text-gray-400 font-bold">&rarr;</span>
              </button>

              {/* Support */}
              <button className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition active:scale-[0.98]">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🎧</span>
                  <span className="font-medium text-gray-700 text-sm">Help & Support</span>
                </div>
                <span className="text-gray-400 font-bold">&rarr;</span>
              </button>
            </div>

            {/* Logout Button */}
            <button 
              onClick={() => setIsSettingsOpen(false)} 
              className="w-full mt-auto p-4 text-red-600 font-bold bg-red-50 rounded-2xl hover:bg-red-100 transition active:scale-[0.98] text-sm"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}