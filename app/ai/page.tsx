'use client';
import { useState } from 'react';

export default function AIPage() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([{ role: 'ai', text: 'Hi Goodluck. I am your verified medical assistant. How can I help?' }]);
  const [loading, setLoading] = useState(false);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    
    setChat([...chat, { role: 'user', text: msg }]);
    setMsg('');
    setLoading(true);
    
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'ai', text: 'Based on verified data: Always consult a licensed professional before taking new medications.' }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      <div className="mb-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl shadow-sm">🤖</div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Medical AI</h2>
          <p className="text-xs text-gray-500 font-medium">Powered by verified clinical data.</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-gray-100 p-4 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto space-y-4 mb-16 pb-4 pr-2">
          {chat.map((c, i) => (
            <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm transition-all animate-in zoom-in-90 duration-300 ${c.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-50 text-gray-900 rounded-bl-none border border-gray-100'}`}>
                {c.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start animate-in fade-in zoom-in-90 duration-300">
              <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl rounded-bl-none flex space-x-1.5 shadow-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:150ms]"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:300ms]"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleChat} className="absolute bottom-4 left-4 right-4 bg-white border border-gray-200 rounded-full flex items-center p-1.5 shadow-lg">
          <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message AI..." className="flex-1 bg-transparent py-2.5 px-4 text-sm outline-none text-gray-900 placeholder-gray-400 font-medium" />
          <button type="submit" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white rounded-full flex items-center justify-center shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}