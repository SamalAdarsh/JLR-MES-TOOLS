import React from 'react';
import { 
  Play, Database, CheckCircle, AlertTriangle, 
  RefreshCw, ShieldAlert, Globe, Loader, ArrowRightCircle 
} from 'lucide-react';

const WorkflowTab = ({
  startTls, setStartTls, endTls, setEndTls, workflowStarted, handleEnterBatch,
  getBatchCount, resetWorkflow, stepData, loading, handleRunQuery, websiteData,
  isFetchingWeb, handleFetchWebsiteData, comparisonResult, handleCompare,
  currentStep, queries, darkMode, theme
}) => {

  const renderStatusBadge = (data, expectedEmpty) => {
    if (!data) return <span className={`${darkMode ? 'text-slate-500' : 'text-gray-400'} text-sm font-medium`}>Not Run</span>;
    const isEmpty = data.result.length === 0;
    
    if (expectedEmpty) {
      return isEmpty 
        ? <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-green-200"><CheckCircle size={14}/> PASSED</span>
        : <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-red-200"><AlertTriangle size={14}/> FAILED</span>;
    } else {
      return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold shadow-sm border border-blue-200">Data Loaded</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* RANGE INPUT HEADER */}
      <div className={`${theme.card} p-1 rounded-2xl`}>
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="flex-1 grid grid-cols-2 gap-6 w-full">
                <div className="space-y-2">
                  <label className={`block text-xs font-bold uppercase tracking-wider ${theme.subText}`}>Start TLS</label>
                  <input 
                      type="text" 
                      maxLength={8}
                      value={startTls}
                      onChange={(e) => setStartTls(e.target.value)}
                      placeholder="eg: 50100101"
                      className={`w-full text-xl p-3 border rounded-xl outline-none font-mono transition-all duration-200 ${theme.input}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`block text-xs font-bold uppercase tracking-wider ${theme.subText}`}>End TLS</label>
                  <input 
                      type="text" 
                      maxLength={8}
                      value={endTls}
                      onChange={(e) => setEndTls(e.target.value)}
                      placeholder=" eg: 50100105"
                      className={`w-full text-xl p-3 border rounded-xl outline-none font-mono transition-all duration-200 ${theme.input}`}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                  <button
                    onClick={handleEnterBatch}
                    disabled={!startTls || !endTls}
                    className={`h-[56px] px-6 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${
                      (!startTls || !endTls) 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 hover:scale-105 active:scale-95'
                    }`}
                  >
                    <Play fill="currentColor" size={18} /> Enter
                  </button>

                  <div className={`px-4 h-[56px] rounded-xl border flex flex-col items-center justify-center min-w-[100px] ${darkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-slate-50'}`}>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Batch Size</span>
                    <span className={`text-xl font-bold ${theme.text}`}>{getBatchCount() > 0 ? getBatchCount() : '-'}</span>
                  </div>
                  
                  <button 
                  onClick={resetWorkflow}
                  className={`h-[56px] px-4 rounded-xl font-medium transition-colors flex items-center justify-center ${darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-400 hover:bg-slate-50 hover:text-red-500'}`}
                  title="Reset Form"
                  >
                  <RefreshCw size={20} />
                  </button>
              </div>
          </div>
        </div>
      </div>

      {/* STEP 1: OBOM & VALIDATION */}
      <div className="transition-all duration-500 ease-in-out transform opacity-100 translate-y-0">
          <div className={`${theme.card} rounded-2xl border overflow-hidden`}>
            <div className={`${theme.cardHeader} p-4 border-b flex justify-between items-center`}>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/30">1</div>
                  <h3 className={`font-bold ${theme.text}`}>OBOM Extraction & Validation</h3>
                </div>
                {stepData['obom'] ? renderStatusBadge(stepData['obom'], false) : null}
            </div>
            
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* LEFT: SQL DATA */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold uppercase tracking-wider ${theme.subText}`}>SQL Database Result</span>
                      <button 
                      onClick={() => handleRunQuery(0)}
                      disabled={loading || !startTls || !endTls}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${(!startTls || !endTls) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700'}`}
                      >
                      <Database size={14}/> {stepData['obom'] ? 'Re-Run Query' : 'Run Query 1'}
                      </button>
                  </div>
                  <div className={`rounded-xl h-72 overflow-auto border p-0 ${theme.codeBlock}`}>
                      {stepData['obom'] ? (
                      <table className="w-full text-left text-sm">
                          <thead className={`sticky top-0 z-10 shadow-sm ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                          <tr className={`border-b ${theme.tableHeader}`}>
                              <th className="py-3 px-4">TLS ID</th>
                              <th className="py-3 px-4 text-right">Total Parts</th>
                          </tr>
                          </thead>
                          <tbody>
                          {stepData['obom'].result.map((row, i) => (
                              <tr key={i} className={`border-b last:border-0 hover:bg-white/5 transition-colors ${theme.tableRow}`}>
                              <td className={`py-3 px-4 font-bold font-mono ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{row.tls_id}</td>
                              <td className="py-3 px-4 text-right font-mono text-slate-500">{row.part_count}</td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                      ) : (
                      <div className={`h-full flex flex-col items-center justify-center ${theme.subText}`}>
                          <Database size={48} strokeWidth={1} className="mb-4 opacity-20"/>
                          <p>Waiting for query execution...</p>
                      </div>
                      )}
                  </div>
                </div>

                {/* RIGHT: WEBSITE DATA FETCHING */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold uppercase tracking-wider ${theme.subText}`}>Website Portal Data</span>
                      <div className="flex gap-2">
                        {websiteData && stepData['obom'] && (
                          <button 
                            onClick={handleCompare}
                            className={`text-xs px-4 py-1.5 rounded-lg transition-all shadow-lg flex items-center gap-2 font-bold ${
                              comparisonResult?.status === 'MATCH' 
                                ? 'bg-green-500 text-white shadow-green-500/30' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'
                            }`}
                          >
                            {comparisonResult?.status === 'MATCH' ? <CheckCircle size={14}/> : <ShieldAlert size={14}/>}
                            {comparisonResult?.status === 'MATCH' ? 'Matched' : 'Compare'}
                          </button>
                        )}
                      </div>
                  </div>
                  
                  <div className={`rounded-xl h-72 overflow-hidden border relative flex flex-col ${theme.input}`}>
                      {websiteData ? (
                        <div className="overflow-auto font-mono text-sm flex-1">
                          <table className="w-full text-left">
                            <thead className={`sticky top-0 z-10 shadow-sm ${darkMode ? 'bg-slate-950' : 'bg-white'}`}>
                              <tr className={`border-b ${theme.tableHeader}`}>
                                <th className="py-3 px-4">TLS ID</th>
                                <th className="py-3 px-4 text-right">Count</th>
                              </tr>
                            </thead>
                            <tbody>
                              {websiteData.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 hover:bg-black/5 transition-colors ${theme.tableRow}`}>
                                  <td className={`py-3 px-4 font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>{row.tls_id}</td>
                                  <td className="py-3 px-4 text-right text-slate-500">{row.part_count}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className={`flex-1 flex flex-col items-center justify-center ${theme.subText}`}>
                          {isFetchingWeb ? (
                            <div className="text-center animate-pulse">
                                <Loader size={48} strokeWidth={1} className="mb-4 mx-auto animate-spin text-blue-500"/>
                                <p>Fetching from Portal...</p>
                            </div>
                          ) : (
                            <>
                              <Globe size={48} strokeWidth={1} className="mb-4 opacity-20"/>
                              <button 
                                onClick={handleFetchWebsiteData}
                                disabled={!startTls || !endTls}
                                className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-colors border ${(!startTls || !endTls) ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200'}`}
                              >
                                Fetch Website Data
                              </button>
                            </>
                          )}
                        </div>
                      )}
                  </div>

                  {comparisonResult && comparisonResult.status === 'ERROR' && (
                      <div className="mt-2 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 shadow-sm">
                      <strong>Discrepancies found:</strong>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                          {comparisonResult.details.map((d, i) => (
                          <li key={i}><span className="font-mono font-bold">{d.part}:</span> {d.issue}</li>
                          ))}
                      </ul>
                      </div>
                  )}
                </div>
            </div>
          </div>
      </div>

      {/* STEPS 2, 3, 4 - THE CHECKS (NOW FULL WIDTH) */}
      <div className="space-y-6">
          {[queries[1], queries[2], queries[3]].map((query, index) => {
          const actualIndex = index + 1; 
          const isDisabled = currentStep < 1; 
          const data = stepData[query.id];
          const hasPassed = data && data.result.length === 0;

          return (
              <div key={query.id} className={`${theme.card} rounded-2xl border flex flex-col transition-all duration-300 ${isDisabled ? 'opacity-40 grayscale blur-[1px]' : 'hover:scale-[1.01]'}`}>
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
                  {/* Status output section */}
                  <div className="flex-1 w-full flex items-center justify-center md:justify-start text-center md:text-left">
                      {data ? (
                      hasPassed ? (
                          <div className="text-green-500 flex items-center gap-3 animate-in zoom-in duration-300">
                          <CheckCircle size={32} strokeWidth={2} className="drop-shadow-md"/>
                          <span className="font-bold text-lg">Check Passed Successfully</span>
                          </div>
                      ) : (
                          <div className="text-red-500 flex flex-col md:flex-row items-center md:items-start gap-4 animate-in zoom-in duration-300 w-full">
                          <AlertTriangle size={32} strokeWidth={2} className="drop-shadow-md flex-shrink-0 md:mt-1"/>
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
                          <div className="w-12 h-1 bg-slate-200 rounded-full hidden md:block"></div>
                          Pending execution...
                      </span>
                      )}
                  </div>

                  {/* Action button section */}
                  <div className="w-full md:w-64 shrink-0">
                      <button
                      disabled={isDisabled || loading}
                      onClick={() => handleRunQuery(actualIndex)}
                      className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 ${
                          hasPassed 
                          ? 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200' 
                          : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-blue-500/30 hover:shadow-lg'
                      }`}
                      >
                      {loading ? 'Running...' : hasPassed ? 'Re-Verify' : 'Run Check'}
                      </button>
                  </div>
              </div>
              </div>
          );
          })}
      </div>

      {/* FINAL STEP: SEQUENCE */}
      <div className={`bg-slate-900 rounded-2xl p-1 shadow-2xl transition-all duration-500 transform ${
          stepData['ag_processing'] && stepData['ag_processing'].result.length === 0 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
      }`}>
          <div className="bg-linear-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-center text-white border border-slate-700/50">
            <div className="mb-6 flex justify-center">
              <div className="p-3 bg-green-500/20 rounded-full text-green-400">
                  <CheckCircle size={48} />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Workflow Complete</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">All systems green. You are authorized to sequence the next production batch.</p>
            <button className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-green-900/50 flex items-center gap-3 mx-auto transition-all hover:scale-105 active:scale-95 text-lg">
              Sequence Batch {startTls} <ArrowRightCircle size={24}/>
            </button>
          </div>
      </div>
    </div>
  );
};

export default WorkflowTab;