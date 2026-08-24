'use client';
import { useState } from 'react';

export default function AIPage() {
  const [msg, setMsg] = useState('');
  const [chat, setChat] = useState([{ role: 'ai', text: 'Hi Goodluck. I am your verified medical assistant.' }]);

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setChat([...chat, { role: 'user', text: msg }]);
    setMsg('');
    setTimeout(() => {
      setChat(prev => [...prev, { role: 'ai', text: 'Always consult a licensed professional before mixing medications.' }]);
    }, 800);
  };

  return (
    <div className="h-[75vh] flex flex-col pt-4 animate-in fade-in">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Medical AI</h2>
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
          <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Ask a question..." className="w-full bg-gray-50 rounded-full py-3 pl-4 pr-12 text-sm outline-none" />
          <button type="submit" className="absolute right-2 top-1.5 p-1.5 bg-blue-600 text-white rounded-full">&uarr;</button>
        </form>
      </div>
    </div>
  );
}