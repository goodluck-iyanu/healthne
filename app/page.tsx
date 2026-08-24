'use client';

import React, { useState } from 'react';

// --- MOCK DATABASE ---
interface Drug {
  id: string;
  name: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  manufacturer: string;
  nafdacReg: string;
  status: 'Verified' | 'Pending';
  uses: string;
  sideEffectsCommon: string[];
  sideEffectsSerious: string[];
  contraindications: string;
  interactions: string;
  sourceUrl: string;
  lastUpdated: string;
}

const DRUGS_DATA: Drug[] = [
  {
    id: '1',
    name: 'Coartem 80/480mg',
    genericName: 'Artemether / Lumefantrine',
    brandNames: ['Coartem', 'Lonart', 'Amatem'],
    drugClass: 'Antimalarial',
    manufacturer: 'Novartis Pharma AG',
    nafdacReg: 'NAFDAC-04-7892',
    status: 'Verified',
    uses: 'Treatment of acute, uncomplicated malaria infections caused by Plasmodium falciparum.',
    sideEffectsCommon: ['Headache', 'Dizziness', 'Loss of appetite', 'Joint pain'],
    sideEffectsSerious: ['Severe allergic skin reaction', 'Irregular heart rhythm (QT prolongation)', 'Difficulty breathing'],
    contraindications: 'Do not use during the first trimester of pregnancy unless advised by a physician.',
    interactions: 'Avoid co-administration with strong CYP3A4 inducers/inhibitors or other QT-prolonging agents.',
    sourceUrl: 'https://nafdac.gov.ng/verified-registry/coartem',
    lastUpdated: 'August 2026'
  },
  {
    id: '2',
    name: 'Paracetamol 500mg',
    genericName: 'Acetaminophen',
    brandNames: ['Panadol', 'Emzor Paracetamol', 'M&B Paracetamol'],
    drugClass: 'Analgesic / Antipyretic',
    manufacturer: 'Emzor Pharmaceuticals Ltd',
    nafdacReg: 'NAFDAC-A4-0192',
    status: 'Verified',
    uses: 'Relief of mild to moderate pain (headache, toothache) and reduction of fever.',
    sideEffectsCommon: ['Nausea', 'Mild stomach discomfort'],
    sideEffectsSerious: ['Acute liver damage (in overdose)', 'Severe skin reactions (Stevens-Johnson syndrome)'],
    contraindications: 'Severe hepatic (liver) impairment or known hypersensitivity to acetaminophen.',
    interactions: 'Alcohol increases risk of hepatotoxicity. Consult doctor if taking Warfarin.',
    sourceUrl: 'https://nafdac.gov.ng/verified-registry/paracetamol-500',
    lastUpdated: 'July 2026'
  },
  {
    id: '3',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin Trihydrate',
    brandNames: ['Amoxil', 'Novamox', 'Hovid Amoxicillin'],
    drugClass: 'Beta-lactam Antibiotic',
    manufacturer: 'GlaxoSmithKline Nigeria',
    nafdacReg: 'NAFDAC-02-3341',
    status: 'Verified',
    uses: 'Bacterial infections including ear, nose, throat, chest, and urinary tract infections.',
    sideEffectsCommon: ['Diarrhea', 'Mild nausea', 'Skin rash'],
    sideEffectsSerious: ['Severe anaphylactic allergic reaction', 'Clostridioides difficile colitis (severe diarrhea)'],
    contraindications: 'Known allergy to penicillins or cephalosporins.',
    interactions: 'May decrease effectiveness of oral contraceptives. Avoid taking with Methotrexate.',
    sourceUrl: 'https://nafdac.gov.ng/verified-registry/amoxicillin-500',
    lastUpdated: 'August 2026'
  }
];

const FACILITIES_DATA = [
  {
    id: '1',
    name: 'Lagos University Teaching Hospital (LUTH)',
    type: 'Hospital',
    category: 'Tertiary / Teaching Hospital',
    location: 'Idi-Araba, Surulere, Lagos',
    emergency24h: true,
    phone: '+234 1 774 0000',
    verifiedRegistry: 'HEFAMAA & NHFR Verified',
    status: 'Verified'
  },
  {
    id: '2',
    name: 'Reddington Multi-Specialist Hospital',
    type: 'Hospital',
    category: 'Private General Hospital',
    location: 'Victoria Island, Lagos',
    emergency24h: true,
    phone: '+234 1 271 5340',
    verifiedRegistry: 'HEFAMAA Verified',
    status: 'Verified'
  },
  {
    id: '3',
    name: 'Medplus Pharmacy - Admiralty Way',
    type: 'Pharmacy',
    category: 'Community Retail Pharmacy',
    location: 'Lekki Phase 1, Lagos',
    emergency24h: false,
    phone: '+234 809 000 1122',
    verifiedRegistry: 'PCN (Pharmacists Council of Nigeria) Active',
    status: 'Verified'
  },
  {
    id: '4',
    name: 'HealthPlus Pharmacy - Ikeja GRA',
    type: 'Pharmacy',
    category: 'Community Retail Pharmacy',
    location: 'Isaac John St, Ikeja, Lagos',
    emergency24h: true,
    phone: '+234 803 123 4567',
    verifiedRegistry: 'PCN Active',
    status: 'Verified'
  }
];

export default function HealthneApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'drugs' | 'ai' | 'facilities' | 'feed' | 'interactions' | 'admin'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  
  // Emergency Modal State
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Interaction Checker State
  const [drugA, setDrugA] = useState('Paracetamol 500mg');
  const [drugB, setDrugB] = useState('Coartem 80/480mg');
  const [interactionResult, setInteractionResult] = useState<{ severity: 'low' | 'moderate' | 'high'; message: string } | null>(null);

  // AI Chat State
  const [aiMessages, setAiMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; source?: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am the Healthne Verified Medical Assistant. Ask me to explain drug leaflets, verify uses, or check side effects in plain English. I do not prescribe or alter medications.',
      source: 'Official NAFDAC & Reference Formulary'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  // Filtered drugs
  const filteredDrugs = DRUGS_DATA.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.drugClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle AI interaction
  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setAiMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMsg('');
    setAiLoading(true);

    setTimeout(() => {
      let responseText = `Based on verified clinical sources: For "${userText}", always adhere strictly to dosage limits indicated by your doctor or pharmacist. Misuse can lead to severe adverse reactions.`;
      let source = 'NAFDAC Public Drug Registry (Updated Aug 2026)';

      if (userText.toLowerCase().includes('paracetamol')) {
        responseText = 'Paracetamol (Acetaminophen) is indicated for mild-to-moderate pain and fever. Maximum adult daily dose is 4,000 mg (8 x 500mg tablets). Exceeding this can cause acute liver failure. Do not combine with other acetaminophen-containing cold remedies.';
        source = 'Emzor Leaflet / NAFDAC-A4-0192 / British National Formulary';
      } else if (userText.toLowerCase().includes('coartem') || userText.toLowerCase().includes('malaria')) {
        responseText = 'Coartem (Artemether/Lumefantrine) is an Artemisinin-based Combination Therapy (ACT) for uncomplicated P. falciparum malaria. It must be taken with meals or milk containing fat to ensure proper absorption.';
        source = 'Novartis Clinical Guidelines / WHO Malaria Guidelines';
      }

      setAiMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: responseText,
          source: source
        }
      ]);
      setAiLoading(false);
    }, 900);
  };

  // Check Interaction
  const handleCheckInteraction = () => {
    if (drugA === drugB) {
      setInteractionResult({
        severity: 'high',
        message: 'Duplicate drug therapy: You have selected the exact same medication twice. This creates an immediate risk of overdose.'
      });
      return;
    }

    if (
      (drugA.includes('Paracetamol') && drugB.includes('Coartem')) ||
      (drugA.includes('Coartem') && drugB.includes('Paracetamol'))
    ) {
      setInteractionResult({
        severity: 'low',
        message: '🟢 No known clinically significant interaction between Paracetamol and Artemether/Lumefantrine. They are frequently co-prescribed to manage malaria-associated fever. Ensure recommended dosages are maintained.'
      });
    } else {
      setInteractionResult({
        severity: 'moderate',
        message: '🟡 Monitor with caution. Concurrent use requires confirmation with your pharmacist to check metabolic enzyme clearance pathway overlap.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* HEADER / NAVIGATION */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
              H
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl text-emerald-800 tracking-tight">Healthne</span>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-semibold">Prototype</span>
              </div>
              <p className="text-[10px] text-slate-500 tracking-wider font-semibold uppercase">By Hoberg Digital Agency</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('drugs')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'drugs' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Drug Database
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'ai' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              AI Assistant
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'facilities' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Hospitals & Pharmacies
            </button>
            <button
              onClick={() => setActiveTab('interactions')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'interactions' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Interactions
            </button>
            <button
              onClick={() => setActiveTab('feed')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'feed' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition ${activeTab === 'admin' ? 'bg-purple-100 text-purple-800' : 'text-slate-600 hover:text-slate-900'}`}
            >
              🛡️ Admin
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowEmergencyModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-1 shadow-sm transition animate-pulse"
            >
              <span>🚨 Emergency Help</span>
            </button>
          </div>
        </div>
      </header>

      {/* SPONSORED BANNER (DISCLAIMER TRANSPARENT ADS) */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-900 flex items-center justify-center space-x-2">
        <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-200 px-1.5 py-0.5 rounded text-amber-800">Sponsor</span>
        <span>Verified Health Outreach: Malaria Prevention Initiative Lagos 2026. 100% Free Access for All Users.</span>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* VIEW 1: HOME DASHBOARD */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero / Quick Actions */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="bg-emerald-700/60 text-emerald-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Nigeria Verified Health Engine
                </span>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                  Verified Drug Information & Certified Healthcare Access.
                </h1>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
                  Direct NAFDAC verification records, AI clinical leaflet translator, and registered hospital & pharmacy locator.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('drugs')}
                    className="bg-white text-emerald-900 font-bold text-sm px-5 py-2.5 rounded-xl shadow hover:bg-emerald-50 transition"
                  >
                    🔎 Search Drugs
                  </button>
                  <button
                    onClick={() => setShowScanModal(true)}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition flex items-center space-x-2"
                  >
                    <span>📸 Scan Medicine Package</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('ai')}
                    className="bg-teal-700/50 hover:bg-teal-700 text-white font-bold text-sm px-5 py-2.5 rounded-xl border border-teal-500/30 transition"
                  >
                    🤖 Ask Verified AI
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Grid Nav */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('drugs')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer shadow-sm transition hover:shadow group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition duration-200">💊</div>
                <h3 className="font-bold text-slate-800 text-sm">NAFDAC Drug Registry</h3>
                <p className="text-xs text-slate-500 mt-1">Verified leaflets, side effects & alerts</p>
              </div>

              <div
                onClick={() => setActiveTab('facilities')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer shadow-sm transition hover:shadow group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition duration-200">🏥</div>
                <h3 className="font-bold text-slate-800 text-sm">Hospital & Pharmacy Finder</h3>
                <p className="text-xs text-slate-500 mt-1">HEFAMAA & NHFR verified locations</p>
              </div>

              <div
                onClick={() => setActiveTab('interactions')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer shadow-sm transition hover:shadow group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition duration-200">⚠️</div>
                <h3 className="font-bold text-slate-800 text-sm">Interaction Checker</h3>
                <p className="text-xs text-slate-500 mt-1">Cross-reference 2+ medications</p>
              </div>

              <div
                onClick={() => setActiveTab('feed')}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 cursor-pointer shadow-sm transition hover:shadow group"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition duration-200">📰</div>
                <h3 className="font-bold text-slate-800 text-sm">Pharmacist Feed</h3>
                <p className="text-xs text-slate-500 mt-1">Clinical tips from licensed professionals</p>
              </div>
            </div>

            {/* Featured Verified Drugs Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-slate-900">Featured Verified Medications (Nigeria)</h2>
                <button onClick={() => setActiveTab('drugs')} className="text-xs font-semibold text-emerald-700 hover:underline">
                  View all &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DRUGS_DATA.map((drug) => (
                  <div
                    key={drug.id}
                    onClick={() => {
                      setSelectedDrug(drug);
                      setActiveTab('drugs');
                    }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 transition shadow-sm cursor-pointer space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-1">
                        <span>🟢 NAFDAC Verified</span>
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{drug.nafdacReg}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">{drug.name}</h3>
                      <p className="text-xs text-slate-500">{drug.genericName}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                      <span className="text-slate-600 font-medium">{drug.drugClass}</span>
                      <span className="text-emerald-700 font-bold hover:underline">Full Profile &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DRUG DATABASE */}
        {activeTab === 'drugs' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Official Drug Database</h1>
                <p className="text-xs text-slate-500">Every claim is backed by official NAFDAC registration and reference sources.</p>
              </div>
              <input
                type="text"
                placeholder="Search by drug name, active ingredient, or class..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* List */}
              <div className="space-y-3 md:col-span-1">
                {filteredDrugs.map((drug) => (
                  <div
                    key={drug.id}
                    onClick={() => setSelectedDrug(drug)}
                    className={`p-4 rounded-xl border cursor-pointer transition ${selectedDrug?.id === drug.id ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'}`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-slate-900 text-sm">{drug.name}</h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        {drug.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{drug.genericName}</p>
                    <div className="mt-2 text-[11px] text-slate-400 font-mono">{drug.nafdacReg}</div>
                  </div>
                ))}
              </div>

              {/* Detail View */}
              <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                {selectedDrug ? (
                  <div className="space-y-6">
                    <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h2 className="text-2xl font-black text-slate-900">{selectedDrug.name}</h2>
                          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                            🟢 Verified by NAFDAC
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600">Generic: {selectedDrug.genericName}</p>
                        <p className="text-xs text-slate-400">Class: {selectedDrug.drugClass} | Manufacturer: {selectedDrug.manufacturer}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-slate-700">{selectedDrug.nafdacReg}</div>
                        <div className="text-[10px] text-slate-400">Updated: {selectedDrug.lastUpdated}</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Primary Indications & Uses</h4>
                        <p className="text-sm text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedDrug.uses}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Common Side Effects</h4>
                          <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                            {selectedDrug.sideEffectsCommon.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-2">⚠️ Serious Side Effects</h4>
                          <ul className="text-xs text-red-800 space-y-1 list-disc list-inside font-medium">
                            {selectedDrug.sideEffectsSerious.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Contraindications & Warnings</h4>
                        <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedDrug.contraindications}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Interactions</h4>
                        <p className="text-xs text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">{selectedDrug.interactions}</p>
                      </div>

                      {/* Source Citation button */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-slate-500">
                          Source: <span className="font-semibold text-slate-700">Official NAFDAC Registration Database</span>
                        </div>
                        <a
                          href={selectedDrug.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                        >
                          🔗 View Official Source
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-400">
                    <p className="text-sm">Select any drug from the list to view verified clinical parameters.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: AI MEDICAL ASSISTANT */}
        {activeTab === 'ai' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900">
              <p className="font-bold mb-1">🤖 Safety Protocol & Grounding Guarantee:</p>
              <p>
                The Healthne AI strictly acts as a plain-language translator of verified NAFDAC documents. It is legally prohibited from prescribing medications, altering dosages, or diagnosing medical conditions.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[500px]">
              {/* Messages Container */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {aiMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'user' ? 'bg-emerald-700 text-white rounded-tr-none' : 'bg-slate-100 text-slate-900 rounded-tl-none'}`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      {msg.source && (
                        <div className="mt-2 pt-2 border-t border-slate-200/50 text-[10px] text-emerald-800 font-mono font-semibold">
                          📌 Source: {msg.source}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="text-xs text-slate-400 italic">Querying verified drug knowledge base...</div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleAiSend} className="p-3 border-t border-slate-200 flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Can I take Paracetamol with Coartem? Explain side effects simply..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW 4: HOSPITALS & PHARMACIES */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Hospital & Pharmacy Locator</h1>
              <p className="text-xs text-slate-500">Cross-referenced against Nigeria Health Facility Registry (NHFR) and HEFAMAA.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FACILITIES_DATA.map((fac) => (
                <div key={fac.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      🟢 {fac.verifiedRegistry}
                    </span>
                    {fac.emergency24h && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                        🚨 24/7 Emergency
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{fac.name}</h3>
                    <p className="text-xs text-slate-500">{fac.category}</p>
                    <p className="text-xs text-slate-700 mt-1">📍 {fac.location}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">📞 {fac.phone}</span>
                    <button
                      onClick={() => alert(`Directing to ${fac.name} navigation via Google Maps...`)}
                      className="text-xs font-bold text-emerald-700 hover:underline"
                    >
                      Get Directions &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: INTERACTION CHECKER */}
        {activeTab === 'interactions' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Drug Interaction Checker</h1>
              <p className="text-xs text-slate-500">Select two medicines to evaluate documented clinical interactions.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Medication A</label>
                <select
                  value={drugA}
                  onChange={(e) => setDrugA(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option>Paracetamol 500mg</option>
                  <option>Coartem 80/480mg</option>
                  <option>Amoxicillin 500mg</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Medication B</label>
                <select
                  value={drugB}
                  onChange={(e) => setDrugB(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                >
                  <option>Coartem 80/480mg</option>
                  <option>Paracetamol 500mg</option>
                  <option>Amoxicillin 500mg</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCheckInteraction}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl transition text-sm shadow-sm"
            >
              Analyze Interaction Safety
            </button>

            {interactionResult && (
              <div
                className={`p-4 rounded-xl text-sm leading-relaxed ${
                  interactionResult.severity === 'high'
                    ? 'bg-red-50 border border-red-200 text-red-900'
                    : interactionResult.severity === 'moderate'
                    ? 'bg-amber-50 border border-amber-200 text-amber-900'
                    : 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                }`}
              >
                {interactionResult.message}
              </div>
            )}
          </div>
        )}

        {/* VIEW 6: PHARMACY / HEALTH EDUCATION FEED */}
        {activeTab === 'feed' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Verified Healthcare Feed</h1>
              <p className="text-xs text-slate-500">Only verified pharmacists and physicians with certified license credentials can post.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-800">
                  AO
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">Pharm. Adebayo Oladipo, B.Pharm</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">🟢 PCN Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Chief Pharmacist, Medplus Victoria Island • 2 hours ago</p>
                </div>
              </div>

              <p className="text-sm text-slate-800 leading-relaxed">
                🚨 <strong>Malaria Medication Tip:</strong> If you are taking Artemether/Lumefantrine (Coartem, Lonart), please remember to take your dose with milk or a meal with a little oil/fat. Fat increases the absorption of lumefantrine by up to 16-fold! Taking it on an empty stomach often causes treatment failure.
              </p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 flex justify-between items-center">
                <span>🔗 Ref: WHO Artemisinin Resistance Manual & NAFDAC Clinical Guidance</span>
              </div>

              <div className="flex justify-between items-center pt-2 text-xs text-slate-500 border-t border-slate-100">
                <button className="hover:text-emerald-700 font-semibold">❤️ 48 Helpful</button>
                <button className="hover:text-emerald-700 font-semibold">💬 Ask Follow-up</button>
                <button className="hover:text-red-700 font-semibold">🚩 Report Post</button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 7: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-slate-900">🛡️ Administration & Moderation Panel</h1>
                <p className="text-xs text-slate-500">Manage NAFDAC data sync, facility licensing verification, and flagged reports.</p>
              </div>
              <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full">
                SuperAdmin Mode
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="text-slate-500 text-xs font-bold uppercase">Pending Verifications</div>
                <div className="text-2xl font-black text-slate-900 mt-2">12 Pharmacies</div>
                <div className="text-xs text-amber-600 mt-1">Requires PCN license audit</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="text-slate-500 text-xs font-bold uppercase">NAFDAC Sync Status</div>
                <div className="text-2xl font-black text-emerald-700 mt-2">Online & Active</div>
                <div className="text-xs text-slate-400 mt-1">Last synced 3 hours ago</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <div className="text-slate-500 text-xs font-bold uppercase">User Reports</div>
                <div className="text-2xl font-black text-red-600 mt-2">0 Urgent</div>
                <div className="text-xs text-slate-400 mt-1">No counterfeit reports pending</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SCANNER MODAL DEMO */}
      {showScanModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-lg">📸 Scan Medicine Box / Strip</h3>
              <button onClick={() => setShowScanModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <div className="border-2 border-dashed border-emerald-400 rounded-2xl h-48 bg-emerald-50/50 flex flex-col items-center justify-center text-center p-4">
              <span className="text-4xl mb-2">📷</span>
              <p className="text-xs text-emerald-900 font-medium">Position drug box or prescription within frame for AI OCR detection</p>
            </div>

            {scanResult ? (
              <div className="bg-emerald-100 p-3 rounded-xl text-xs text-emerald-900 font-semibold">
                Detected: {scanResult} (NAFDAC-A4-0192)
              </div>
            ) : (
              <button
                onClick={() => setScanResult('Paracetamol 500mg (Emzor)')}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Simulate Camera Capture
              </button>
            )}

            {scanResult && (
              <button
                onClick={() => {
                  setShowScanModal(false);
                  setSelectedDrug(DRUGS_DATA[1]);
                  setActiveTab('drugs');
                  setScanResult(null);
                }}
                className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Open Verified Drug Sheet &rarr;
              </button>
            )}
          </div>
        </div>
      )}

      {/* EMERGENCY MODAL */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-red-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border-2 border-red-500">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🚨</span>
                <h3 className="font-black text-red-700 text-lg">Emergency Assistance</h3>
              </div>
              <button onClick={() => setShowEmergencyModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>

            <p className="text-xs text-slate-600">
              Immediate dispatch numbers for emergency services in Lagos State & Nigeria:
            </p>

            <div className="space-y-2">
              <a
                href="tel:112"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-xl text-center block text-sm shadow-md transition"
              >
                📞 Call Nigeria Emergency (112 / 767)
              </a>
              <a
                href="tel:+23417740000"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-center block text-xs transition"
              >
                🏥 LUTH Emergency Unit: +234 1 774 0000
              </a>
            </div>

            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-[11px] text-red-800">
              <strong>Medical Disclaimer:</strong> In case of drug overdose, breathing difficulty, or severe allergic anaphylaxis, do not rely on an AI chatbot. Contact emergency responders immediately.
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 Healthne. Prototype Engineered by <strong>Hoberg Digital Agency</strong>.</p>
          <div className="flex space-x-4">
            <button onClick={() => alert('Transparency: All drug profiles are directly linked to official NAFDAC and WHO reference databases.')} className="hover:underline">
              How We Verify
            </button>
            <button onClick={() => alert('Privacy: Healthne does not harvest unencrypted health records.')} className="hover:underline">
              Privacy & Data Ethics
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}