import React from 'react';
import { Play, RefreshCw } from 'lucide-react';

const RangeInputHeader = ({ startTls, setStartTls, endTls, setEndTls, handleEnterBatch, getBatchCount, resetWorkflow, theme, darkMode }) => (
  <div className={`${theme.card} rounded-2xl`}>
  
    <div className={`p-6 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-700 shadow-md' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div className="flex flex-col md:flex-row items-end gap-6">
          <div className="flex-1 grid grid-cols-2 gap-6 w-full">
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${theme.subText}`}>Start TLS</label>
              <input 
                  type="text" maxLength={8} value={startTls} onChange={(e) => setStartTls(e.target.value)}
                  placeholder="eg: 50100101" className={`w-full text-xl p-3 border rounded-xl outline-none font-mono transition-all duration-200 ${theme.input}`}
              />
            </div>
            <div className="space-y-2">
              <label className={`block text-xs font-bold uppercase tracking-wider ${theme.subText}`}>End TLS</label>
              <input 
                  type="text" maxLength={8} value={endTls} onChange={(e) => setEndTls(e.target.value)}
                  placeholder=" eg: 50100105" className={`w-full text-xl p-3 border rounded-xl outline-none font-mono transition-all duration-200 ${theme.input}`}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
              <button
                onClick={handleEnterBatch} disabled={!startTls || !endTls}
                className={`h-14 px-6 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${(!startTls || !endTls) ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 hover:scale-105 active:scale-95'}`}
              >
                <Play fill="currentColor" size={18} /> Enter
              </button>

              <div className={`px-4 h-14 rounded-xl border flex flex-col items-center justify-center min-w-25 ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-slate-50'}`}>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Batch Size</span>
                <span className={`text-xl font-bold ${theme.text}`}>{getBatchCount() > 0 ? getBatchCount() : '-'}</span>
              </div>
              
              <button 
                onClick={resetWorkflow} title="Reset Form"
                className={`h-14 px-4 rounded-xl font-medium transition-colors flex items-center justify-center ${darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-400 hover:bg-slate-50 hover:text-red-500'}`}
              >
                <RefreshCw size={20} />
              </button>
          </div>
      </div>
    </div>
  </div>
);

export default RangeInputHeader;