import React from 'react';
import { LayoutDashboard, Settings, Copy } from 'lucide-react';

const SidebarNavigation = ({ activeTab, setActiveTab, handleRunQuery, startTls, endTls, loading, theme, darkMode, utilityResult, setIsUtilityModalOpen }) => {
  return (
    <aside className={`w-64 flex flex-col sticky top-0 h-screen border-r ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50/50 backdrop-blur border-slate-200'}`}>
      <div className={`p-6 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <h1 className="text-2xl font-bold bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          JLR MES TOOLS
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <button 
          onClick={() => setActiveTab('workflow')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'workflow' ? theme.navItemActive : theme.navItemInactive}`}
        >
          <LayoutDashboard size={20}/>
          Workflow
        </button>
        <button 
           onClick={() => setActiveTab('queries')}
           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'queries' ? theme.navItemActive : theme.navItemInactive}`}
        >
          <Settings size={20}/>
          Query Manager
        </button>
        
        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
           <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Utility</div>
           <button 
             onClick={() => handleRunQuery(4)} // Duplicates (Index 4)
             disabled={!startTls || !endTls || loading}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${theme.navItemInactive} ${(!startTls || !endTls || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
           >
             <Copy size={20}/>
             {loading ? 'Running Check...' : 'Check Duplicates'}
           </button>
           {utilityResult && (
             <div className="mt-2 px-4 py-2 text-xs font-mono rounded-lg border text-center opacity-70 cursor-pointer" 
                 onClick={() => setIsUtilityModalOpen(true)}
                 style={{
                     backgroundColor: utilityResult.hasDuplicates ? '#fee2e2' : '#dcfce7',
                     color: utilityResult.hasDuplicates ? '#b91c1c' : '#15803d',
                     borderColor: utilityResult.hasDuplicates ? '#fca5a5' : '#86efad',
                     ...(darkMode && {
                         backgroundColor: utilityResult.hasDuplicates ? '#450a0a' : '#042f2e',
                         color: utilityResult.hasDuplicates ? '#fca5a5' : '#6ee7b7',
                         borderColor: utilityResult.hasDuplicates ? '#7f1d1d' : '#14532d',
                     })
                 }}
             >
                 {utilityResult.hasDuplicates ? 'DUPLICATES FOUND!' : 'DUP Check: CLEAN'}
             </div>
           )}
        </div>
      </nav>

      <div className={`p-6 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
         <div className={`text-xs ${theme.subText}`}>System Status</div>
         <div className="flex items-center gap-2 mt-1">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-sm font-medium text-green-600">Online</span>
         </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;