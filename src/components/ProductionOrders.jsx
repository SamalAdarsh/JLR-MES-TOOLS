import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Download, RefreshCw, ChevronLeft, ChevronRight, ClipboardList, Sun, Moon } from 'lucide-react';


const MOCK_DATA = Array.from({ length: 250 }).map((_, i) => {
  const isT3R = i % 3 !== 0; 
  return {
    id: i,
    location: i + 1,
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

const ProductionOrders = ({ darkMode, setDarkMode}) => {
  const navigate = useNavigate();

  // --- FUNCTIONAL STATES ---
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState('TNF_ORDERS');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const itemsPerPage = 50;

  // --- LOGIC: Filter and Paginate ---
  const filteredData = useMemo(() => {
    if (!searchQuery) return MOCK_DATA;
    return MOCK_DATA.filter(item => 
      item.itemId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  // --- HANDLERS ---
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate network delay
    setTimeout(() => {
      setCurrentPage(1);
      setSearchQuery('');
      setIsRefreshing(false);
    }, 800);
  };

  const handleExport = () => {
    alert(`Exporting ${filteredData.length} records for region: ${region}`);
  };

  const handlePrevPage = () => setCurrentPage(p => Math.max(1, p - 1));
  const handleNextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));

  return (
    // MAIN WRAPPER: Deep background to allow cards to pop
    <div className={`h-screen w-full overflow-hidden transition-colors duration-300 flex flex-col ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      
      {/* HEADER: Darkest element */}
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
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Production Order Viewer</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 text-sm font-medium rounded-lg border flex items-center gap-2 transition-all ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'}`}
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin text-blue-500' : ''} /> 
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button 
            onClick={handleExport}
            className={`px-4 py-2 text-sm font-medium rounded-lg border flex items-center gap-2 transition-all ${darkMode ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/20' : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100'}`}
          >
            <Download size={16} /> Export
          </button>
          
          <div className={`h-6 w-px mx-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-300'}`}></div>
          
          {/* THEME TOGGLE BUTTON */}
          <button 
            onClick={() => setDarkMode && setDarkMode(!darkMode)}
            className={`p-2 rounded-xl transition-all shadow-sm border ${darkMode ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-4 lg:p-6 flex flex-col gap-4 overflow-hidden">
        
        {/* CONTROL BAR */}
        <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <label className={`text-xs font-bold uppercase tracking-wider ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Region ID</label>
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={`text-sm px-3 py-1.5 rounded-lg border outline-none font-medium transition-colors ${darkMode ? 'bg-slate-900 border-slate-600 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-400'}`}
              >
                <option value="TNF_ORDERS">TNF_ORDERS</option>
                <option value="GLOBAL_QUEUE">GLOBAL_QUEUE</option>
                <option value="TLS">TLS</option>
                <option value="PROCESS">PROCESS</option>
              </select>
            </div>
            
            <div className={`w-px h-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-colors ${darkMode ? 'bg-slate-900 border-slate-600 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500' : 'bg-slate-50 border-slate-300 focus-within:border-indigo-400 focus-within:ring-1 focus-within:ring-indigo-400'}`}>
                <Search size={14} className={darkMode ? 'text-slate-500' : 'text-slate-400'} />
                <input 
                  type="text" 
                  placeholder="Search Item ID..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to page 1 on search
                  }}
                  className={`bg-transparent text-sm outline-none w-32 md:w-48 ${darkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'}`} 
                />
              </div>
            </div>
          </div>

          {/* PAGINATION CONTROLS */}
          <div className="flex items-center gap-4">
            <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Showing {filteredData.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
            </span>
            <div className="flex gap-1">
              <button 
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-1.5 rounded border transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-900' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-40 disabled:hover:bg-white'}`}
              >
                <ChevronLeft size={16}/>
              </button>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`p-1.5 rounded border transition-colors ${darkMode ? 'bg-slate-900 border-slate-700 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:hover:bg-slate-900' : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600 disabled:opacity-40 disabled:hover:bg-white'}`}
              >
                <ChevronRight size={16}/>
              </button>
            </div>
          </div>
        </div>

        {/* SCROLLABLE DATA TABLE: Contrasting Card Background */}
        <div className={`flex-1 rounded-xl border overflow-hidden shadow-xl flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="flex-1 overflow-auto custom-scrollbar relative">
            <table className="w-full text-left border-collapse whitespace-nowrap min-w-full">
              
              {/* STICKY HEADER: Extra contrast against the table body */}
              <thead className={`sticky top-0 z-10 shadow-sm ${darkMode ? 'bg-slate-700/95 backdrop-blur-md text-slate-300 border-slate-600' : 'bg-slate-100/95 backdrop-blur-md text-slate-600 border-slate-200'}`}>
                <tr className="text-[11px] uppercase tracking-wider font-extrabold">
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
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <tr 
                      key={row.id} 
                      className={`border-b transition-colors cursor-pointer ${
                        darkMode 
                          ? 'border-slate-700/50 hover:bg-indigo-500/20' 
                          : 'border-slate-100 hover:bg-indigo-50'
                      } ${index % 2 === 0 ? (darkMode ? 'bg-slate-800' : 'bg-white') : (darkMode ? 'bg-slate-900/30' : 'bg-slate-50/50')}`} 
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
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className={`p-8 text-center font-sans ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      No records found matching "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* Custom scrollbar style specifically for this table so it looks premium */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: ${darkMode ? '#475569' : '#cbd5e1'}; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: ${darkMode ? '#64748b' : '#94a3b8'}; }
      `}} />
    </div>
  );
};

export default ProductionOrders;