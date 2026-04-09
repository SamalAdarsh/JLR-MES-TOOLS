import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Activity, Settings, Database, Server, PowerOff } from 'lucide-react';

const TlsSequencingControl = ({ darkMode, theme }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live clock effect to match the top right of your legacy screen
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 flex flex-col ${theme.bg} ${theme.text}`}>
      
      {/* TOP HEADER */}
      <header className={`px-6 py-4 border-b flex justify-between items-center shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <img src="https://img.favpng.com/21/11/11/jlr-logo-UnyQiUTN.jpg" alt="JLR" className="h-8 w-8 object-contain rounded bg-white p-0.5" />
            <h1 className="text-xl font-bold tracking-tight">TLS Sequencing Control</h1>
          </div>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-mono font-medium border ${darkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
          <Clock size={14} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          <span>{formatDate(currentTime)}</span>
          <span className="mx-1 opacity-50">|</span>
          <span>{formatTime(currentTime)}</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6">
        
        {/* TOP ROW: AUTO SEQUENCE STATUS */}
        <div className={`p-8 rounded-2xl border relative overflow-hidden shadow-lg ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1 flex items-center gap-2">
                <Activity size={16} /> Status Overview
              </h2>
              <h3 className="text-2xl font-light">TLS Auto Sequence</h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 md:gap-10">
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1">Last Order</p>
                <p className="font-mono text-lg font-medium">159794TNF</p>
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-500 opacity-20"></div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wider opacity-50 mb-1">RLM ID</p>
                <p className="font-mono text-lg font-medium">SEQUENCING_RLM</p>
              </div>
              
              {/* Premium Disabled Badge */}
              <div className={`ml-2 px-6 py-3 rounded-xl border flex items-center gap-2 shadow-inner ${darkMode ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'}`}>
                <PowerOff size={18} className="animate-pulse" />
                <span className="font-bold tracking-wider">DISABLED</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: SPLIT DATA PANELS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* LEFT PANEL: QUANTITIES */}
          <div className={`rounded-2xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-2 ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
              <Database size={18} className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} />
              <h3 className="font-bold uppercase tracking-wide text-sm">Quantities & Metrics</h3>
            </div>
            
            <div className="p-6 space-y-3">
              {[
                { label: 'TLS Min Quantity', value: '109', highlight: true },
                { label: 'Orders Min Quantity', value: '105', highlight: true },
                { label: 'Orders in TNF Orders', value: '35' },
                { label: 'Orders in TLS', value: '109' },
                { label: 'Last Generated TLS', value: '00519917' }
              ].map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-lg border ${darkMode ? 'border-slate-800/50 hover:bg-slate-800/50' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                  <span className="font-medium opacity-80 text-sm">{item.label}</span>
                  <div className={`px-3 py-1 rounded border font-mono text-sm font-bold ${
                    item.highlight 
                      ? (darkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-800 border-slate-900 text-white')
                      : 'border-transparent'
                  }`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL: CONFIGURATION */}
          <div className={`rounded-2xl border shadow-sm flex flex-col ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className={`px-6 py-4 border-b flex items-center gap-2 ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
              <Settings size={18} className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} />
              <h3 className="font-bold uppercase tracking-wide text-sm">Configuration</h3>
            </div>
            
            <div className="p-6 space-y-3 flex-1">
              {[
                { label: 'Dest Region', value: 'TNF_ORDERS' },
                { label: 'Production Line', value: 'FA3T010' },
                { label: 'SEQ Attribute', value: 'SQ' },
                { label: 'MATCH BODY ON', value: 'XB,XP' }
              ].map((item, idx) => (
                <div key={idx} className={`flex justify-between items-center p-3 rounded-lg border ${darkMode ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-100/50 border-slate-200'}`}>
                  <span className="font-medium opacity-80 text-sm">{item.label}</span>
                  <span className="font-mono text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER STATUS BAR */}
      <footer className={`px-6 py-3 border-t flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] ${darkMode ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-slate-100 border-slate-200 text-emerald-700'}`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          Qty OK. Idle.
        </div>
        <div className="flex items-center gap-2 opacity-50">
          <Server size={14} /> System Active
        </div>
      </footer>

    </div>
  );
};

export default TlsSequencingControl;