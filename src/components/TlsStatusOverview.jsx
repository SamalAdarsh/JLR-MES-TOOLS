import React from 'react';
import { Activity, Power, PowerOff } from 'lucide-react';

const TlsStatusOverview = ({ darkMode, isAutoSequenceEnabled, onToggleClick }) => {
  return (
    <div className={`p-6 lg:p-8 rounded-2xl border relative overflow-hidden shadow-xl shrink-0 transition-colors duration-500 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-md'}`}>
      <div className={`absolute top-0 left-0 w-full h-1 transition-all duration-700 ${isAutoSequenceEnabled ? 'bg-linear-to-r from-emerald-500 to-teal-400' : 'bg-linear-to-r from-red-500 to-orange-500'}`}></div>
      
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
          
          <button 
            onClick={onToggleClick}
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
  );
};

export default TlsStatusOverview;