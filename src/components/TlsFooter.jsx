import React, { useState, useEffect } from 'react';
import { Clock, Server } from 'lucide-react';

const TlsFooter = ({ darkMode, isAutoSequenceEnabled }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => date.toLocaleDateString('en-GB', { timeZone: 'Europe/London', day: '2-digit', month: '2-digit', year: '2-digit' });
  const formatTime = (date) => date.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <footer className={`shrink-0 px-6 py-2.5 border-t flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider transition-colors duration-500 ${darkMode ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-white border-slate-200 text-emerald-600 shadow-inner'}`}>
      <div className="flex items-center gap-2 w-1/3">
        <div className={`w-2 h-2 rounded-full ${isAutoSequenceEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-500'}`}></div>
        Qty OK. {isAutoSequenceEnabled ? 'Running...' : 'Idle.'}
      </div>
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
  );
};

export default TlsFooter;