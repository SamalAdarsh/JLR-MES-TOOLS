import React from 'react';
import { AlertTriangle, Zap, CheckCircle, X } from 'lucide-react';

const UtilityModal = ({ isOpen, onClose, result, darkMode, theme }) => {
  if (!isOpen || !result) return null;

  const isError = result.hasDuplicates;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl transition-all ${theme.card}`}>
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isError ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
              {isError ? <AlertTriangle size={24} /> : <Zap size={24} />}
            </div>
            <h2 className={`text-xl font-bold ${theme.text}`}>{result.query} Result</h2>
          </div>
          <button onClick={onClose} className={`p-1 rounded-full ${darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'}`}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {isError ? (
            <>
              <p className="text-lg font-bold text-red-500">FAILURE: Duplicates Found!</p>
              <p className={`${theme.subText}`}>The database check identified the following duplicated serial numbers:</p>
              <div className="rounded-xl overflow-hidden border">
                <table className="w-full text-left text-sm">
                  <thead className={`border-b ${theme.tableHeader}`}>
                    <tr>
                      <th className="py-2 px-4">Serial No.</th>
                      <th className="py-2 px-4 text-right">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.result.map((row, i) => (
                      <tr key={i} className={`border-b last:border-0 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                        <td className="py-2 px-4 font-mono font-bold">{row.serial_no}</td>
                        <td className="py-2 px-4 text-right">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={`text-sm ${theme.subText}`}>Timestamp: {result.timestamp}</p>
            </>
          ) : (
            <div className="text-center p-6 bg-green-50/20 rounded-xl border border-green-100 dark:border-green-800">
              <CheckCircle size={40} className="mx-auto mb-3 text-green-500"/>
              <p className="text-lg font-bold text-green-500">SUCCESS: No Duplicates Found.</p>
              <p className={`text-sm ${theme.subText} mt-1`}>The range **{result.startTls} to {result.endTls}** is clean.</p>
              <p className={`text-xs ${theme.subText} mt-3`}>Timestamp: {result.timestamp}</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UtilityModal;