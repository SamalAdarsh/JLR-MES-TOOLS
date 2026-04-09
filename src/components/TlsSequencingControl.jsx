import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Activity, Settings, Database, Server, PowerOff, Power, User, Sun, Moon, LogOut, AlertTriangle, Loader } from 'lucide-react';

const TlsSequencingControl = ({ darkMode, setDarkMode, user, onLogout }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // --- INTERACTIVE STATES ---
  const [isAutoSequenceEnabled, setIsAutoSequenceEnabled] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);
  
  const [metrics, setMetrics] = useState({
    tlsMinQty: 109,
    ordersMinQty: 105,
    ordersInTnf: 35,
    ordersInTls: 109,
    lastGenerated: '00519917'
  });

  // Live clock effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- UPDATED: Forced UK Timezone (Europe/London) ---
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { 
      timeZone: 'Europe/London', 
      day: '2-digit', 
      month: '2-digit', 
      year: '2-digit' 
    });
  };
  
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { 
      timeZone: 'Europe/London', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  // --- TOGGLE LOGIC ---
  const handleToggleClick = () => {
    if (!isAutoSequenceEnabled) {
      // If it's currently disabled, show the confirmation modal
      setShowEnableModal(true);
    } else {
      // If it's already enabled, disable it immediately without a modal
      setIsAutoSequenceEnabled(false);
    }
  };

  const handleConfirmEnable = () => {
    setIsEnabling(true);
    // Simulate backend validation/API call
    setTimeout(() => {
      setIsAutoSequenceEnabled(true);
      setIsEnabling(false);
      setShowEnableModal(false);
    }, 1200);
  };

  const handleMetricChange = (key, value) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`h-screen w-full overflow-hidden transition-colors duration-300 flex flex-col ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      
      {/* TOP HEADER */}
      <header className={`px-6 py-3 border-b flex justify-between items-center shadow-sm relative z-20 shrink-0 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
        
        {/* Header Left: Navigation & Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <img src="https://img.favpng.com/21/11/11/jlr-logo-UnyQiUTN.jpg" alt="JLR" className="h-7 w-7 object-contain rounded bg-white p-0.5" />
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">TLS Sequencing Control</h1>
          </div>
        </div>
        
        {/* Header Right: User Profile & Theme Toggle */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 relative">
            <div className="text-right hidden md:block">
              <div className={`text-sm font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {user || 'ASAMAL1'}
              </div>
              <div className={`text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Operator • Morning
              </div>
            </div>
            
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="h-10 w-10 rounded-full bg-[#4f46e5] flex items-center justify-center text-white hover:bg-[#4338ca] transition-colors shadow-md focus:outline-none ring-2 ring-transparent focus:ring-[#4f46e5]/50"
            >
              <User size={18} strokeWidth={2.5} />
            </button>

            {isProfileOpen && (
              <div className={`absolute top-12 right-0 mt-2 w-48 rounded-xl border shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <button className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${darkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                  <User size={16} /> Profile
                </button>
                <button className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${darkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                  <Settings size={16} /> Settings
                </button>
                <div className={`my-1 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}></div>
                <button 
                  onClick={handleLogoutClick}
                  className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors text-red-500 ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>

          <div className={`h-8 w-px ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

          <button 
            onClick={() => setDarkMode && setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl transition-all shadow-sm ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-6 flex flex-col justify-center gap-4 lg:gap-6 overflow-y-auto" onClick={() => isProfileOpen && setIsProfileOpen(false)}>
        
        {/* TOP ROW: AUTO SEQUENCE STATUS */}
        <div className={`p-6 lg:p-8 rounded-2xl border relative overflow-hidden shadow-xl shrink-0 transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-md'}`}>
          {/* DYNAMIC GRADIENT LINE */}
          <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-700 ${isAutoSequenceEnabled ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1 flex items-center gap-2">
                <Activity size={16} /> Status Overview
              </h2>
              <h3 className="text-2xl font-light">TLS Auto Sequence</h3>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1">Last Order</p>
                <p className="font-mono text-lg font-medium">159794TNF</p>
              </div>
              <div className="hidden sm:block w-px h-10 bg-slate-500 opacity-20"></div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1">RLM ID</p>
                <p className="font-mono text-lg font-medium">SEQUENCING_RLM</p>
              </div>
              
              {/* INTERACTIVE TOGGLE BUTTON */}
              <button 
                onClick={handleToggleClick}
                className={`ml-4 px-6 py-2.5 rounded-xl border flex items-center gap-2 shadow-inner transition-all duration-300 active:scale-95 ${
                  isAutoSequenceEnabled 
                    ? (darkMode ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20' : 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100')
                    : (darkMode ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' : 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100')
                }`}
              >
                {isAutoSequenceEnabled ? <Power size={18} /> : <PowerOff size={18} className="animate-pulse" />}
                <span className="font-bold tracking-wider">{isAutoSequenceEnabled ? 'ENABLED' : 'DISABLED'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: SPLIT DATA PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 shrink-0">
          
          {/* LEFT PANEL: QUANTITIES (Editable) */}
          <div className={`rounded-2xl border shadow-xl flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-md'}`}>
            <div className={`px-5 py-3.5 border-b flex items-center gap-2 ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/80'}`}>
              <Database size={18} className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} />
              <h3 className="font-bold uppercase tracking-wide text-sm">Quantities & Metrics</h3>
            </div>
            
            <div className="p-5 space-y-2.5 flex-1">
              {[
                { key: 'tlsMinQty', label: 'TLS Min Quantity', highlight: true, editable: true },
                { key: 'ordersMinQty', label: 'Orders Min Quantity', highlight: true, editable: true },
                { key: 'ordersInTnf', label: 'Orders in TNF Orders', highlight: false, editable: false },
                { key: 'ordersInTls', label: 'Orders in TLS', highlight: false, editable: false },
                { key: 'lastGenerated', label: 'Last Generated TLS', highlight: false, editable: false, mono: true }
              ].map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center px-3 py-2.5 rounded-lg border transition-colors ${darkMode ? 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/60' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
                  <span className="font-medium opacity-90 text-sm">{item.label}</span>
                  <div className={`px-2 py-0.5 rounded border font-mono text-sm font-bold ${
                    item.highlight 
                      ? (darkMode ? 'bg-slate-900 border-slate-600 text-white focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500' : 'bg-slate-800 border-slate-900 text-white focus-within:ring-2 focus-within:ring-indigo-400')
                      : 'border-transparent'
                  }`}>
                    {item.editable ? (
                      <input 
                        type="number"
                        value={metrics[item.key]}
                        onChange={(e) => handleMetricChange(item.key, e.target.value)}
                        className="w-14 text-center bg-transparent outline-none cursor-text hide-arrows"
                      />
                    ) : (
                      <span className="px-1">{metrics[item.key]}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: CONFIGURATION */}
          <div className={`rounded-2xl border shadow-xl flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-md'}`}>
            <div className={`px-5 py-3.5 border-b flex items-center gap-2 ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/80'}`}>
              <Settings size={18} className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} />
              <h3 className="font-bold uppercase tracking-wide text-sm">Configuration</h3>
            </div>
            
            <div className="p-5 space-y-2.5 flex-1">
              {[
                { label: 'Dest Region', value: 'TNF_ORDERS' },
                { label: 'Production Line', value: 'FA3T010' },
                { label: 'SEQ Attribute', value: 'SQ' },
                { label: 'MATCH BODY ON', value: 'XB,XP' }
              ].map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center px-3 py-2.5 rounded-lg border transition-colors ${darkMode ? 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/60' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
                  <span className="font-medium opacity-90 text-sm">{item.label}</span>
                  <span className="font-mono text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER STATUS BAR */}
      <footer className={`shrink-0 px-6 py-2.5 border-t flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-white border-slate-200 text-emerald-600 shadow-inner'}`}>
        
        <div className="flex items-center gap-2 w-1/3">
          <div className={`w-2 h-2 rounded-full ${isAutoSequenceEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`}></div>
          Qty OK. {isAutoSequenceEnabled ? 'Running...' : 'Idle.'}
        </div>

        {/* UK TIMEZONE CLOCK */}
        <div className="w-1/3 flex justify-center">
          <div className={`flex items-center gap-2 px-4 py-1 rounded-full text-[10px] sm:text-xs font-medium border ${darkMode ? 'bg-slate-800/50 border-slate-700 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            <Clock size={12} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            <span title="UK Time (GMT/BST)">{formatDate(currentTime)}</span>
            <span className="mx-1 opacity-50">|</span>
            <span title="UK Time (GMT/BST)">{formatTime(currentTime)}</span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 opacity-60 w-1/3">
          <Server size={14} /> <span className="hidden sm:inline">System Active</span>
        </div>
      </footer>

      {/* --- CONFIRMATION MODAL --- */}
      {showEnableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <div className={`max-w-sm w-full rounded-2xl shadow-2xl border p-6 text-center transform transition-all ${darkMode ? 'bg-[#1e2433] border-slate-700/50' : 'bg-white border-slate-200'}`}>
            
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-orange-500 w-8 h-8" />
            </div>
            
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Enable Auto Sequence
            </h3>
            
            <p className={`text-sm mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Are you sure you want to enable the TLS Auto Sequence? This will initiate automated batch processing for line <strong className={darkMode ? 'text-white' : 'text-slate-900'}>FA3T010</strong>.
            </p>
            
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowEnableModal(false)}
                disabled={isEnabling}
                className={`flex-1 px-4 py-2.5 font-semibold rounded-lg transition-colors border ${darkMode ? 'bg-transparent border-slate-600 hover:bg-slate-800 text-slate-300' : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700'}`}
              >
                Cancel
              </button>
              
              <button 
                onClick={handleConfirmEnable}
                disabled={isEnabling}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00b65e] hover:bg-[#009b50] text-white font-semibold rounded-lg transition-colors shadow-lg shadow-green-900/20 disabled:opacity-70"
              >
                {isEnabling ? <Loader size={18} className="animate-spin" /> : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .hide-arrows {
          -moz-appearance: textfield;
        }
      `}} />
    </div>
  );
};

export default TlsSequencingControl;