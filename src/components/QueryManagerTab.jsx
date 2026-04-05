import React from 'react';
import { Database, Save } from 'lucide-react';

const QueryManagerTab = ({ queries, updateQuerySql, theme, darkMode }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className={`text-xl font-bold ${theme.text}`}>SQL Query Configuration</h2>
        <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
          Restore Defaults
        </button>
      </div>
      
      <div className="grid gap-6">
        {queries.map((q) => (
          <div key={q.id} className={`${theme.card} p-6 rounded-2xl border`}>
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-blue-50 text-blue-500'}`}>
                <Database size={24}/>
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${theme.text}`}>{q.name}</h3>
                <p className={`text-sm mb-4 ${theme.subText}`}>{q.description}</p>
                
                <div className="relative group">
                  <textarea
                    className="w-full bg-slate-950 text-green-400 font-mono text-sm p-6 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 border border-slate-800 shadow-inner"
                    rows={4}
                    value={q.sql}
                    onChange={(e) => updateQuerySql(q.id, e.target.value)}
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 shadow-lg" title="Save Changes">
                      <Save size={16}/>
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-500 flex gap-4 font-mono">
                  <span className="bg-slate-100 px-2 py-1 rounded dark:bg-slate-800">In: <strong>@startTls, @endTls</strong></span>
                  <span className="bg-slate-100 px-2 py-1 rounded dark:bg-slate-800">Exp: <strong>{q.expectedResult}</strong></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryManagerTab;