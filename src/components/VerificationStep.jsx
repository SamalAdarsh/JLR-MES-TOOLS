import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const VerificationStep = ({ query, index, currentStep, stepData, loading, handleRunQuery, theme, renderStatusBadge }) => {
  const actualIndex = index + 1; 
  const isDisabled = currentStep < 1; 
  const data = stepData[query.id];
  const hasPassed = data && data.result.length === 0;

  return (
    <div className={`${theme.card} rounded-2xl border flex flex-col transition-all duration-300 ${isDisabled ? 'opacity-40 grayscale blur-[1px]' : 'hover:scale-[1.01]'}`}>
      <div className={`p-4 border-b flex justify-between items-center ${theme.cardHeader}`}>
          <div className="flex gap-3 items-center">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${hasPassed ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-slate-200 text-slate-500'}`}>
                {index + 2}
            </div>
            <h3 className={`font-bold ${theme.text}`}>{query.name.split('. ')[1]}</h3>
          </div>
          {data ? renderStatusBadge(data, true) : null}
      </div>
      
      <div className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full flex items-center justify-center md:justify-start text-center md:text-left">
              {data ? (
                hasPassed ? (
                  <div className="text-green-500 flex items-center gap-3 animate-in zoom-in duration-300">
                    <CheckCircle size={32} strokeWidth={2} className="drop-shadow-md"/>
                    <span className="font-bold text-lg">Check Passed Successfully</span>
                  </div>
                ) : (
                  <div className="text-red-500 flex flex-col md:flex-row items-center md:items-start gap-4 animate-in zoom-in duration-300 w-full">
                    <AlertTriangle size={32} strokeWidth={2} className="drop-shadow-md shrink-0 md:mt-1"/>
                    <div className="w-full">
                        <span className="font-bold text-lg block mb-2">Wait! Found Data.</span>
                        <div className="text-xs bg-red-50 p-4 rounded-lg text-left w-full overflow-hidden text-red-800 font-mono border border-red-100">
                            {JSON.stringify(data.result[0])}
                        </div>
                    </div>
                  </div>
                )
              ) : (
                <span className={`text-sm italic ${theme.subText} flex items-center gap-3`}>
                    <div className="w-12 h-1 bg-slate-200 rounded-full hidden md:block"></div>Pending execution...
                </span>
              )}
          </div>

          <div className="w-full md:w-64 shrink-0">
              <button
                disabled={isDisabled || loading} onClick={() => handleRunQuery(actualIndex)}
                className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${hasPassed ? 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200' : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 hover:shadow-lg'}`}
              >
                {loading ? 'Running...' : hasPassed ? 'Re-Verify' : 'Run Check'}
              </button>
          </div>
      </div>
    </div>
  );
};

export default VerificationStep;