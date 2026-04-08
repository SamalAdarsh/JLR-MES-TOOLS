import React from 'react';
import { Database, CheckCircle, ShieldAlert, Globe, Loader } from 'lucide-react';

const ObomValidationStep = ({ 
  stepData, loading, startTls, endTls, handleRunQuery, websiteData, 
  isFetchingWeb, handleFetchWebsiteData, comparisonResult, handleCompare, theme, darkMode, renderStatusBadge 
}) => (
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
          {/* SQL DATA */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.subText}`}>SQL Database Result</span>
                <button 
                  onClick={() => handleRunQuery(0)} disabled={loading || !startTls || !endTls}
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
                        <th className="py-3 px-4">TLS ID</th><th className="py-3 px-4 text-right">Total Parts</th>
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
                    <Database size={48} strokeWidth={1} className="mb-4 opacity-20"/><p>Waiting for query execution...</p>
                </div>
                )}
            </div>
          </div>

          {/* WEBSITE DATA */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.subText}`}>Website Portal Data</span>
                <div className="flex gap-2">
                  {websiteData && stepData['obom'] && (
                    <button onClick={handleCompare} className={`text-xs px-4 py-1.5 rounded-lg transition-all shadow-lg flex items-center gap-2 font-bold ${comparisonResult?.status === 'MATCH' ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105'}`}>
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
                          <th className="py-3 px-4">TLS ID</th><th className="py-3 px-4 text-right">Count</th>
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
                      <div className="text-center animate-pulse"><Loader size={48} className="mb-4 mx-auto animate-spin text-blue-500"/><p>Fetching from Portal...</p></div>
                    ) : (
                      <><Globe size={48} className="mb-4 opacity-20"/>
                        <button onClick={handleFetchWebsiteData} disabled={!startTls || !endTls} className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-colors border ${(!startTls || !endTls) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200'}`}>Fetch Website Data</button>
                      </>
                    )}
                  </div>
                )}
            </div>
            
            {comparisonResult && comparisonResult.status === 'ERROR' && (
                <div className="mt-2 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 shadow-sm">
                <strong>Discrepancies found:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    {comparisonResult.details.map((d, i) => (<li key={i}><span className="font-mono font-bold">{d.part}:</span> {d.issue}</li>))}
                </ul>
                </div>
            )}
          </div>
      </div>
    </div>
  </div>
);

export default ObomValidationStep;