import React from 'react';
import { Settings } from 'lucide-react';

const TlsConfigPanel = ({ darkMode }) => {
  const items = [
    { label: 'Dest Region', value: 'TNF_ORDERS' },
    { label: 'Production Line', value: 'FA3T010' },
    { label: 'SEQ Attribute', value: 'SQ' },
    { label: 'MATCH BODY ON', value: 'XB,XP' }
  ];

  return (
    <div className={`rounded-2xl border shadow-xl flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-md'}`}>
      <div className={`px-5 py-3.5 border-b flex items-center gap-2 ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/80'}`}>
        <Settings size={18} className={darkMode ? 'text-emerald-400' : 'text-emerald-600'} />
        <h3 className="font-bold uppercase tracking-wide text-sm">Configuration</h3>
      </div>
      <div className="p-5 space-y-2.5 flex-1">
        {items.map((item, idx) => (
          <div key={idx} className={`flex justify-between items-center px-3 py-2.5 rounded-lg border transition-colors ${darkMode ? 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/60' : 'bg-white border-slate-100 hover:bg-slate-50'}`}>
            <span className="font-medium opacity-90 text-sm">{item.label}</span>
            <span className="font-mono text-sm font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TlsConfigPanel;