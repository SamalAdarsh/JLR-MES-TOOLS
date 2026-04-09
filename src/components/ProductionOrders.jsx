import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Download, RefreshCw, ChevronLeft, ChevronRight, ClipboardList } from 'lucide-react';

// 1. Move mock data OUTSIDE the component.
// 2. Use deterministic math (based on index 'i') instead of Math.random()
const mockData = Array.from({ length: 50 }).map((_, i) => {
  // Deterministic pattern: Every 3rd item is T3K, the rest are T3R
  const isT3R = i % 3 !== 0; 
  
  return {
    id: i,
    location: i + 1,
    // Use math based on 'i' to create static, fake IDs that look random
    itemId: `${123456 + (i * 7891)}T...`, 
    itemType: 'PRODUCT...',
    vin: '-',
    product: isT3R ? 'T3R' : 'T3K',
    model: isT3R ? 'T3R' : 'T3K',
    tls: `005${19918 + i}`,
    bsn: `${850000 + (i * 347)}`,
    entryTime: `09/04/26 07:${(24 + (i % 30)).toString().padStart(2, '0')}:03`,
    modTime: `09/04/26 11:47:04`
  };
});

const ProductionOrders = ({ darkMode, user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className={`h-screen w-full overflow-hidden transition-colors duration-300 flex flex-col ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      
      {/* HEADER */}
      <header className={`px-6 py-4 border-b flex justify-between items-center shadow-sm shrink-0 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
              <ClipboardList size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Production Order Viewer</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className={`px-4 py-2 text-sm font-medium rounded-lg border flex items-center gap-2 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'}`}>
            <RefreshCw size={16} /> Refresh
          </button>
          <button className={`px-4 py-2 text-sm font-medium rounded-lg border flex items-center gap-2 transition-all ${darkMode ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/20' : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'}`}>
            <Download size={16} /> Export
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 lg:p-6 flex flex-col gap-4 overflow-hidden">
        
        {/* CONTROL BAR (Mimicking the legacy Region/Location/Cache controls) */}
        <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Region ID</label>
              <select className={`text-sm px-3 py-1.5 rounded-lg border outline-none font-medium ${darkMode ? 'bg-slate-900 border-slate-600 text-white' : 'bg-slate-50 border-slate-300 text-slate-800'}`}>
                <option>TNF_ORDERS</option>
                <option>GLOBAL_QUEUE</option>
              </select>
            </div>
            <div className={`w-px h-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-600 focus-within:border-indigo-500' : 'bg-slate-50 border-slate-300 focus-within:border-indigo-400'}`}>
                <Search size={14} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                <input type="text" placeholder="Search Item ID..." className="bg-transparent text-sm outline-none w-32 md:w-48" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Showing 1 - 50 of 1,240 updates</span>
            <div className="flex gap-1">
              <button className={`p-1.5 rounded border transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 hover:bg-slate-700 text-slate-400' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}><ChevronLeft size={16}/></button>
              <button className={`p-1.5 rounded border transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 hover:bg-slate-700 text-slate-400' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'}`}><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>

        {/* SCROLLABLE DATA TABLE */}
        <div className={`flex-1 rounded-xl border overflow-hidden shadow-lg flex flex-col ${darkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              
              {/* STICKY HEADER */}
              <thead className={`sticky top-0 z-10 backdrop-blur-md shadow-sm ${darkMode ? 'bg-slate-800/95 text-slate-400 border-slate-700' : 'bg-slate-100/95 text-slate-600 border-slate-200'}`}>
                <tr className="text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 border-b border-inherit">Location</th>
                  <th className="p-4 border-b border-inherit">Item ID</th>
                  <th className="p-4 border-b border-inherit">Item Type</th>
                  <th className="p-4 border-b border-inherit">VIN</th>
                  <th className="p-4 border-b border-inherit">Product</th>
                  <th className="p-4 border-b border-inherit">Model</th>
                  <th className="p-4 border-b border-inherit">TLs</th>
                  <th className="p-4 border-b border-inherit">BSN</th>
                  <th className="p-4 border-b border-inherit">Entry Time</th>
                  <th className="p-4 border-b border-inherit">Mod Time</th>
                </tr>
              </thead>
              
              {/* TABLE BODY */}
              <tbody className="text-sm font-mono">
                {mockData.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`border-b transition-colors cursor-pointer ${
                      darkMode 
                        ? 'border-slate-800 hover:bg-indigo-500/10' // Subtle blue glow on hover in dark mode
                        : 'border-slate-100 hover:bg-indigo-50'
                    } ${index % 2 === 0 ? (darkMode ? 'bg-slate-800/20' : 'bg-slate-50/50') : ''}`} // Zebra striping
                  >
                    <td className={`p-3 pl-4 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{row.location}</td>
                    <td className={`p-3 font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{row.itemId}</td>
                    <td className={`p-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{row.itemType}</td>
                    <td className={`p-3 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{row.vin}</td>
                    <td className={`p-3 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{row.product}</td>
                    <td className={`p-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{row.model}</td>
                    <td className={`p-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{row.tls}</td>
                    <td className={`p-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{row.bsn}</td>
                    <td className={`p-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{row.entryTime}</td>
                    <td className={`p-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{row.modTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Custom scrollbar style specifically for this table so it looks premium */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: ${darkMode ? '#334155' : '#cbd5e1'}; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: ${darkMode ? '#475569' : '#94a3b8'}; }
      `}} />
    </div>
  );
};

export default ProductionOrders;