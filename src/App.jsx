import React, { useState } from 'react';
import SidebarNavigation from './components/SidebarNavigation';
import Header from './components/Header';
import WorkflowTab from './components/WorkflowTab';
import QueryManagerTab from './components/QueryManagerTab';
import UtilityModal from './components/UtilityModal';
import Login from './components/Login';
import { useTheme } from './hooks/useTheme';
import { useWorkflowLogic } from './hooks/useWorkflowLogic';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('workflow'); 
  const { darkMode, setDarkMode, theme } = useTheme();
  const workflowState = useWorkflowLogic(); // Brings in all logic & state from the hook

  // Show the Login screen if the user is not authenticated yet
  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={() => setIsAuthenticated(true)} 
        theme={theme} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans flex transition-colors duration-300 ${theme.bg} ${theme.text}`}>
      <SidebarNavigation 
        activeTab={activeTab} setActiveTab={setActiveTab} 
        handleRunQuery={workflowState.handleRunQuery} 
        startTls={workflowState.startTls} endTls={workflowState.endTls} 
        loading={workflowState.loading} theme={theme} darkMode={darkMode} 
        utilityResult={workflowState.utilityResult} 
        setIsUtilityModalOpen={workflowState.setIsUtilityModalOpen} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          theme={theme} 
          onLogout={() => setIsAuthenticated(false)} 
        />

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {activeTab === 'workflow' ? (
            <WorkflowTab 
              {...workflowState} // Passes down all workflow states and functions cleanly
              darkMode={darkMode} 
              theme={theme}
            />
          ) : (
            <QueryManagerTab 
              queries={workflowState.queries} 
              updateQuerySql={workflowState.updateQuerySql} 
              theme={theme} 
              darkMode={darkMode} 
            />
          )}
        </div>
        
        <UtilityModal 
            isOpen={workflowState.isUtilityModalOpen} 
            onClose={() => workflowState.setIsUtilityModalOpen(false)}
            result={workflowState.utilityResult} 
            darkMode={darkMode} 
            theme={theme}
        />
      </main>
    </div>
  );
};

export default App;