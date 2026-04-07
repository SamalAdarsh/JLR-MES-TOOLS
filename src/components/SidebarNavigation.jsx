import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Settings, Copy, Menu } from 'lucide-react';

const SidebarNavigation = ({ isSidebarOpen, setIsSidebarOpen, activeTab, setActiveTab, handleRunQuery, startTls, endTls, loading, theme, darkMode, utilityResult, setIsUtilityModalOpen }) => {
  
  // State to hold the current time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format the date and time explicitly for UK Time (Europe/London)
  const datePart = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', day: '2-digit', month: 'short' }).format(currentTime);
  const timePart = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(currentTime);
  const ukTimeString = `${datePart}, ${timePart} UK`;

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col sticky top-0 h-screen border-r transition-all duration-300 ease-in-out z-40 overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50/50 backdrop-blur border-slate-200'}`}>
      
      {/* Top Header Area for Hamburger Menu (Aligns with main header height) */}
      <div className={`h-[73px] flex items-center border-b flex-shrink-0 ${darkMode ? 'border-slate-800' : 'border-slate-200'} ${isSidebarOpen ? 'px-6 justify-start' : 'justify-center'}`}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-200 text-slate-600'}`}
          title="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
      </div>

      <nav className={`flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden pt-6`}>
        <button 
          onClick={() => setActiveTab('workflow')}
          className={`w-full flex items-center gap-3 py-3 rounded-xl font-medium transition-all duration-200 ${isSidebarOpen ? 'px-4 justify-start' : 'justify-center'} ${activeTab === 'workflow' ? theme.navItemActive : theme.navItemInactive}`}
          title={!isSidebarOpen ? "Workflow" : ""}
        >
          <LayoutDashboard size={20} className="flex-shrink-0" />
          {isSidebarOpen && <span className="truncate">Workflow</span>}
        </button>
        <button 
           onClick={() => setActiveTab('queries')}
           className={`w-full flex items-center gap-3 py-3 rounded-xl font-medium transition-all duration-200 ${isSidebarOpen ? 'px-4 justify-start' : 'justify-center'} ${activeTab === 'queries' ? theme.navItemActive : theme.navItemInactive}`}
           title={!isSidebarOpen ? "Query Manager" : ""}
        >
          <Settings size={20} className="flex-shrink-0" />
          {isSidebarOpen && <span className="truncate">Query Manager</span>}
        </button>
        
        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
           {isSidebarOpen && <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 truncate">Utility</div>}
           <button 
             onClick={() => handleRunQuery(4)} // Duplicates (Index 4)
             disabled={!startTls || !endTls || loading}
             className={`w-full flex items-center gap-3 py-3 rounded-xl font-medium transition-all duration-200 ${isSidebarOpen ? 'px-4 justify-start' : 'justify-center'} ${theme.navItemInactive} ${(!startTls || !endTls || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
             title={!isSidebarOpen ? "Check Duplicates" : ""}
           >
             <Copy size={20} className="flex-shrink-0" />
             {isSidebarOpen && <span className="truncate">{loading ? 'Running Check...' : 'Check Duplicates'}</span>}
           </button>
           
           {utilityResult && isSidebarOpen && (
             <div className="mt-2 px-4 py-2 text-xs font-mono rounded-lg border text-center opacity-70 cursor-pointer truncate" 
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

      {/* Footer Area with System Status and UK Time */}
      <div className={`p-6 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'} ${isSidebarOpen ? '' : 'flex flex-col items-center'}`}>
         {isSidebarOpen && <div className={`text-xs ${theme.subText} truncate`}>System Status</div>}
         
         <div className={`flex items-center justify-between ${isSidebarOpen ? 'mt-1 w-full' : ''}`} title={!isSidebarOpen ? `System Online\n${ukTimeString}` : ""}>
           
           <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
             {isSidebarOpen && <span className="text-sm font-medium text-green-600 truncate">Online</span>}
           </div>

           {/* UK Date & Time injected here */}
           {isSidebarOpen && (
             <div className={`text-[12px] font-mono font-medium ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
               {ukTimeString}
             </div>
           )}

         </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;