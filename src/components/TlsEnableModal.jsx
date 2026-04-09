import React from 'react';
import { AlertTriangle, Loader } from 'lucide-react';

const TlsEnableModal = ({ darkMode, isOpen, onClose, onConfirm, isEnabling }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className={`max-w-sm w-full rounded-2xl shadow-2xl border p-6 text-center transform transition-all ${darkMode ? 'bg-[#1e2433] border-slate-700/50' : 'bg-white border-slate-200'}`}>
        <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="text-orange-500 w-8 h-8" />
        </div>
        <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>Enable Auto Sequence</h3>
        <p className={`text-sm mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Are you sure you want to enable the TLS Auto Sequence? This will initiate automated batch processing for line <strong className={darkMode ? 'text-white' : 'text-slate-900'}>FA3T010</strong>.
        </p>
        <div className="flex gap-3 w-full">
          <button 
            onClick={onClose}
            disabled={isEnabling}
            className={`flex-1 px-4 py-2.5 font-semibold rounded-lg transition-colors border ${darkMode ? 'bg-transparent border-slate-600 hover:bg-slate-800 text-slate-300' : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-700'}`}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            disabled={isEnabling}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#00b65e] hover:bg-[#009b50] text-white font-semibold rounded-lg transition-colors shadow-lg shadow-green-900/20 disabled:opacity-70"
          >
            {isEnabling ? <Loader size={18} className="animate-spin" /> : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TlsEnableModal;