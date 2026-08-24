'use client';
import { useState } from 'react';

const DRUGS = [
  { id: '1', name: 'Coartem 80/480mg', generic: 'Artemether / Lumefantrine', nafdac: 'NAFDAC-04-7892' },
  { id: '2', name: 'Paracetamol 500mg', generic: 'Acetaminophen', nafdac: 'NAFDAC-A4-0192' }
];

export default function SearchPage() {
  const [selectedDrug, setSelectedDrug] = useState<any>(null);

  if (selectedDrug) {
    return (
      <div className="pt-4 animate-in slide-in-from-right-4">
        <button onClick={() => setSelectedDrug(null)} className="text-blue-600 text-sm font-medium mb-4">&larr; Back</button>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-4">✓ NAFDAC Verified</div>
          <h2 className="text-2xl font-bold text-gray-900">{selectedDrug.name}</h2>
          <p className="text-gray-500 mb-6">{selectedDrug.generic}</p>
          <div className="bg-gray-50 p-4 rounded-xl font-mono text-sm">{selectedDrug.nafdac}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 animate-in fade-in">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Drug Database</h2>
      <div className="space-y-3">
        {DRUGS.map(drug => (
          <div key={drug.id} onClick={() => setSelectedDrug(drug)} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center cursor-pointer">
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
}