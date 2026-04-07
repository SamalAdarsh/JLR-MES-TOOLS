import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import Header from './components/Header';
import WorkflowTab from './components/WorkflowTab';
import QueryManagerTab from './components/QueryManagerTab';
import UtilityModal from './components/UtilityModal';
import Login from './components/Login';
import { useTheme } from './hooks/useTheme';
import { useWorkflowLogic } from './hooks/useWorkflowLogic';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('jlr_auth') === 'true';
  });
  
  const [activeTab, setActiveTab] = useState('workflow'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Manages sidebar expansion
  
  const { darkMode, setDarkMode, theme } = useTheme();
  const workflowState = useWorkflowLogic();

  const handleLogin = () => {
    localStorage.setItem('jlr_auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jlr_auth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} theme={theme} darkMode={darkMode} setDarkMode={setDarkMode} />
          } 
        />
        
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <div className={`min-h-screen font-sans flex transition-colors duration-300 ${theme.bg} ${theme.text}`}>
                <SidebarNavigation 
                  isSidebarOpen={isSidebarOpen} 
                  activeTab={activeTab} setActiveTab={setActiveTab} 
                  handleRunQuery={workflowState.handleRunQuery} 
                  startTls={workflowState.startTls} endTls={workflowState.endTls} 
                  loading={workflowState.loading} theme={theme} darkMode={darkMode} 
                  utilityResult={workflowState.utilityResult} 
                  setIsUtilityModalOpen={workflowState.setIsUtilityModalOpen} 
                />

                <main className="flex-1 flex flex-col h-screen overflow-hidden">
                  <Header 
                    isSidebarOpen={isSidebarOpen} 
                    setIsSidebarOpen={setIsSidebarOpen} 
                    darkMode={darkMode} 
                    setDarkMode={setDarkMode} 
                    theme={theme} 
                    onLogout={handleLogout} 
                  />

                  <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
                    {activeTab === 'workflow' ? (
                      <WorkflowTab 
                        {...workflowState}
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
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;