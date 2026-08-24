'Change client'
'use client';
import { useState } from 'react';

const DRUGS = [
  { id: '1', name: 'Coartem 80/480mg', generic: 'Artemether / Lumefantrine', nafdac: 'NAFDAC-04-7892', uses: 'Treatment of acute, uncomplicated malaria.' },
  { id: '2', name: 'Paracetamol 500mg', generic: 'Acetaminophen', nafdac: 'NAFDAC-A4-0192', uses: 'Relief of mild to moderate pain and fever.' }
];

export default function SearchPage() {
  const [selectedDrug, setSelectedDrug] = useState<any>(null);
  const [query, setQuery] = useState('');

  const filteredDrugs = DRUGS.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.generic.toLowerCase().includes(query.toLowerCase())
  );

  if (selectedDrug) {
    return (
      <div className="pt-2 animate-in slide-in-from-right-4 duration-300">
        <button onClick={() => setSelectedDrug(null)} className="text-blue-600 text-sm font-semibold mb-4 flex items-center space-x-1 hover:opacity-80 transition">
          <span>&larr;</span> <span>Back to search</span>
        </button>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
            ✓ NAFDAC Verified
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedDrug.name}</h2>
            <p className="text-gray-500 font-medium text-sm mt-0.5">{selectedDrug.generic}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Registration</h3>
              <p className="text-gray-900 font-mono text-sm bg-gray-50 p-3 rounded-2xl border border-gray-100">{selectedDrug.nafdac}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Primary Uses</h3>
              <p className="text-gray-800 text-sm leading-relaxed bg-gray-50 p-3 rounded-2xl border border-gray-100">{selectedDrug.uses}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-2 animate-in fade-in duration-500 space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Drug Database</h2>
        <p className="text-sm text-gray-500 font-medium mt-0.5">Search official verified NAFDAC records.</p>
      </div>

      {/* Search Input with Integrated Icon */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by drug name or ingredient..."
          className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl shadow-sm text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredDrugs.length > 0 ? (
          filteredDrugs.map(drug => (
            <div 
              key={drug.id} 
              onClick={() => setSelectedDrug(drug)} 
              className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:border-blue-300 hover:shadow-md transition-all active:scale-[0.99]"
            >
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{drug.name}</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{drug.generic}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                &rarr;
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-400 text-sm">
            No verified medication found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}