'use client';

import React, { useState } from 'react';

// --- MOCK DATA ---
const DRUGS = [
  {
    id: '1',
    name: 'Coartem 80/480mg',
    generic: 'Artemether / Lumefantrine',
    nafdac: 'NAFDAC-04-7892',
    uses: 'Treatment of acute, uncomplicated malaria.',
    warning: 'Take with food/milk for absorption.',
  },
  {
    id: '2',
    name: 'Paracetamol 500mg',
    generic: 'Acetaminophen',
    nafdac: 'NAFDAC-A4-0192',
    uses: 'Relief of mild to moderate pain and fever.',
    warning: 'Do not exceed 4,000mg per day. Liver risk.',
  }
];

export default function HealthneApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<any>(null);
  const [chat, setChat] = useState([{ role: 'ai', text: 'Hi Goodluck. I am your verified medical assistant. How can I help you today?' }]);
  const [msg, setMsg] = useState('');

  // --- ICONS (Clean SVGs instead of emojis for a professional look) ---
  const Icons = {
    Home: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    Search: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    AI: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
    Feed: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>,
    Scan: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    Emergency: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  };

  // --- ACTIONS ---
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) setActiveTab('search');
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setChat([...chat, { role: 'user', text: msg }]);
    setMsg('');
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'ai', text: 'Based on NAFDAC verified data: Always consult a licensed professional before mixing medications.' }]);
    }, 800);
  };

  // --- VIEWS ---
  const renderHome = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pt-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Good morning, Goodluck.</h1>
        <p className="text-gray-500 mt-2">What medical information do you need today?</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          {Icons.Search}
        </div>
        <input
          type="text"
          placeholder="Search drugs, hospitals, or symptoms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border-none rounded-2xl shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </form>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-gray-50 transition">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">{Icons.Scan}</div>
          <span className="font-medium text-gray-700 text-sm">Scan Medicine</span>
        </button>
        <button className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-red-50 transition">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">{Icons.Emergency}</div>
          <span className="font-medium text-red-700 text-sm">Emergency</span>
        </button>
      </div>
    </div>
  );

  const renderSearch = () => {
    if (selectedDrug) {
      return (
        <div className="animate-in slide-in-from-right-4 duration-300 pt-4">
          <button onClick={() => setSelectedDrug(null)} className="text-blue-600 text-sm font-medium mb-4 flex items-center">
            &larr; Back to results
          </button>
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-4">
              ✓ NAFDAC Verified
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedDrug.name}</h2>
            <p className="text-gray-500 font-medium mb-6">{selectedDrug.generic}</p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Registration</h3>
                <p className="text-gray-900 font-mono bg-gray-50 p-3 rounded-xl">{selectedDrug.nafdac}</p>
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Primary Uses</h3>
                <p className="text-gray-800 leading-relaxed">{selectedDrug.uses}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">Important Warning</h3>
                <p className="text-amber-900 text-sm">{selectedDrug.warning}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="animate-in fade-in pt-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Search Results</h2>
        <div className="space-y-3">
          {DRUGS.map(drug => (
            <div 
              key={drug.id} 
              onClick={() => setSelectedDrug(drug)}
              className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center cursor-pointer hover:border-blue-500 border border-transparent transition"
            >
              <div>
                <h3 className="font-bold text-gray-900">{drug.name}</h3>
                <p className="text-sm text-gray-500">{drug.generic}</p>
              </div>
              <div className="text-blue-500">&rarr;</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAI = () => (
    <div className="h-[80vh] flex flex-col pt-4 animate-in fade-in">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Medical AI</h2>
        <p className="text-xs text-gray-500">Translating clinical data into plain English.</p>
      </div>
      
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-4 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {chat.map((c, i) => (
            <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${c.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-900 rounded-bl-none'}`}>
                {c.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleChat} className="relative mt-auto">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Ask about medications..."
            className="w-full bg-gray-50 border-none rounded-full py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button type="submit" className="absolute right-2 top-1.5 p-1.5 bg-blue-600 text-white rounded-full">
            &uarr;
          </button>
        </form>
      </div>
    </div>
  );

  const renderFeed = () => (
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
          Friendly reminder: Antibiotics do not cure viral infections like the common cold. Using them incorrectly leads to resistance. Always finish your prescribed dosage!
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-24 selection:bg-blue-100">
      {/* Header */}
      <header className="bg-[#F9FAFB] pt-8 pb-4 px-6 sticky top-0 z-10">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <span className="text-xl font-bold text-gray-900 tracking-tight">Healthne.</span>
          <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Goodluck&backgroundColor=e2e8f0" alt="Profile" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto px-6">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'search' && renderSearch()}
        {activeTab === 'ai' && renderAI()}
        {activeTab === 'feed' && renderFeed()}
      </main>

      {/* Modern Bottom Navigation */}
      <nav className="fixed bottom-6 left-0 right-0 z-50">
        <div className="max-w-xs mx-auto bg-white/90 backdrop-blur-md shadow-lg border border-gray-100 rounded-full px-6 py-3 flex justify-between items-center">
          <button onClick={() => { setActiveTab('home'); setSelectedDrug(null); }} className={`p-2 transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}>
            {Icons.Home}
          </button>
          <button onClick={() => setActiveTab('search')} className={`p-2 transition-colors ${activeTab === 'search' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}>
            {Icons.Search}
          </button>
          <button onClick={() => setActiveTab('ai')} className={`p-2 transition-colors ${activeTab === 'ai' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}>
            {Icons.AI}
          </button>
          <button onClick={() => setActiveTab('feed')} className={`p-2 transition-colors ${activeTab === 'feed' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-900'}`}>
            {Icons.Feed}
          </button>
        </div>
      </nav>
    </div>
  );
}