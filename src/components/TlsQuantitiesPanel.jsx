import React from 'react';
import { Database } from 'lucide-react';

const TlsQuantitiesPanel = ({ darkMode, metrics, onMetricChange }) => {
  const items = [
    { key: 'tlsMinQty', label: 'TLS Min Quantity', highlight: true, editable: true },
    { key: 'ordersMinQty', label: 'Orders Min Quantity', highlight: true, editable: true },
    { key: 'ordersInTnf', label: 'Orders in TNF Orders', highlight: false, editable: false },
    { key: 'ordersInTls', label: 'Orders in TLS', highlight: false, editable: false },
    { key: 'lastGenerated', label: 'Last Generated TLS', highlight: false, editable: false, mono: true }
  ];

  return (
    <div className={`rounded-2xl border shadow-xl flex flex-col ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-md'}`}>
      <div className={`px-5 py-3.5 border-b flex items-center gap-2 ${darkMode ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/80'}`}>
        <Database size={18} className={darkMode ? 'text-indigo-400' : 'text-indigo-600'} />
        <h3 className="font-bold uppercase tracking-wide text-sm">Quantities & Metrics</h3>
      </div>
      <div className="p-5 space-y-2.5 flex-1">
        {items.map((item, idx) => (
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
                  onChange={(e) => onMetricChange(item.key, e.target.value)}
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
  );
};

export default TlsQuantitiesPanel;