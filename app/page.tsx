import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8 pt-4 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Good morning, Goodluck.</h1>
        <p className="text-gray-500 mt-2">What medical information do you need today?</p>
      </div>

      <Link href="/search" className="block relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <div className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-sm text-gray-400">
          Search drugs, hospitals...
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-gray-50">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
          <span className="font-medium text-gray-700 text-sm">Scan Medicine</span>
        </button>
        <button className="bg-white p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center space-y-2 hover:bg-red-50">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <span className="font-medium text-red-700 text-sm">Emergency</span>
        </button>
      </div>
    </div>
  );
}