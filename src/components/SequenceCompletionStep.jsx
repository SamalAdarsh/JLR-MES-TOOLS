import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRightCircle, AlertTriangle, Loader } from 'lucide-react';

const SequenceCompletionStep = ({ stepData, startTls, endTls }) => {
  // 1. Initialize navigation and local states
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSequencing, setIsSequencing] = useState(false);

  // 2. The self-contained sequence function
  const handleFinalSequence = () => {
    setIsSequencing(true);
    
    // Simulate backend API call delay
    setTimeout(() => {
      console.log(`Sequencing batch ${startTls} to database...`);
      setIsSequencing(false);
      setShowConfirmModal(false);
      
      // 3. Redirect the user to the new TLS Control page!
      navigate('/tls-control'); 
    }, 1500);
  };

  return (
    <>
      <div className={`bg-slate-900 rounded-2xl p-1 shadow-2xl transition-all duration-500 transform ${stepData['ag_processing'] && stepData['ag_processing'].result.length === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
        <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-center text-white border border-slate-700/50">
          <div className="mb-6 flex justify-center">
            <div className="p-3 bg-green-500/20 rounded-full text-green-400">
              <CheckCircle size={48} />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Workflow Complete</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">All systems green. You are authorized to sequence the next production batch.</p>
          <button 
            onClick={() => setShowConfirmModal(true)}
            className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg flex items-center gap-3 mx-auto transition-all hover:scale-105 active:scale-95 text-lg"
          >
            Sequence Batch {startTls} <ArrowRightCircle size={24}/>
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 animate-in fade-in duration-200">
          <div className="bg-[#1e2433] border border-slate-700/50 rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="text-orange-500 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Confirm Sequence</h3>
            <p className="text-sm text-slate-400 mb-8">Are you sure you want to push batch <strong className="text-white">{startTls} to {endTls}</strong> to production? This action is final.</p>
            <div className="flex gap-3 w-full">
              <button 
                onClick={() => setShowConfirmModal(false)} 
                disabled={isSequencing} 
                className="flex-1 px-4 py-2.5 bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-300 font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleFinalSequence} 
                disabled={isSequencing} 
                className="flex-1 flex justify-center gap-2 px-4 py-2.5 bg-[#00b65e] hover:bg-[#009b50] text-white font-semibold rounded-lg transition-colors shadow-lg shadow-green-900/20 disabled:opacity-70"
              >
                {isSequencing ? <Loader size={18} className="animate-spin" /> : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SequenceCompletionStep;