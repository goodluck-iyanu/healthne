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
      setChat(prev => [...prev, { role: 'ai', text: 'Always consult a licensed professional before taking new medications.' }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[75vh] flex flex-col pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Medical AI</h2>
        <p className="text-sm text-gray-500">Powered by verified NAFDAC data.</p>
      </div>
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-gray-100 p-4 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto space-y-4 mb-16 pb-4">
          {chat.map((c, i) => (
            <div key={i} className={`flex ${c.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all animate-in zoom-in duration-300 ${c.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-50 text-gray-900 rounded-bl-none border border-gray-100'}`}>
                {c.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl rounded-bl-none text-sm text-gray-400 flex space-x-1">
                <span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleChat} className="absolute bottom-4 left-4 right-4 bg-white border border-gray-200 rounded-full flex items-center p-1 shadow-md">
          <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Message AI..." className="flex-1 bg-transparent py-2 px-4 text-sm outline-none text-gray-900" />
          <button type="submit" className="p-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          </button>
        </form>
      </div>
    </div>
  );
}