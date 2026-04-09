import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import Header from './components/Header';
import WorkflowTab from './components/WorkflowTab';
import QueryManagerTab from './components/QueryManagerTab';
import UtilityModal from './components/UtilityModal';
import Login from './components/Login';
import TlsSequencingControl from './components/TlsSequencingControl';
import ProductionOrders from './components/ProductionOrders'; // <-- NEW IMPORT
import { useTheme } from './hooks/useTheme';
import { useWorkflowLogic } from './hooks/useWorkflowLogic';

const App = () => {
  // Add state to track the logged-in user
  const [user, setUser] = useState(() => {
    return localStorage.getItem('jlr_user') || 'Operator';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('jlr_auth') === 'true';
  });
  
  const [activeTab, setActiveTab] = useState('workflow'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  
  const { darkMode, setDarkMode, theme } = useTheme();
  const workflowState = useWorkflowLogic();

  // Accept username from the Login component
  const handleLogin = (username) => {
    localStorage.setItem('jlr_auth', 'true');
    if (username) {
        localStorage.setItem('jlr_user', username);
        setUser(username);
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jlr_auth');
    localStorage.removeItem('jlr_user');
    setUser('Operator');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* LOGIN ROUTE */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/" replace /> 
            ) : (
              <Login 
                onLogin={handleLogin} 
                theme={theme} 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
              />
            )
          } 
        />
        
        {/* MAIN DASHBOARD ROUTE */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <div className={`min-h-screen font-sans flex transition-colors duration-300 ${theme.bg} ${theme.text}`}>
                <SidebarNavigation 
                  isSidebarOpen={isSidebarOpen} 
                  setIsSidebarOpen={setIsSidebarOpen}
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
                    onLogout={handleLogout} 
                    user={user} 
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

        {/* --- TLS CONTROL SCREEN ROUTE --- */}
        <Route 
          path="/tls-control"
          element={
            isAuthenticated ? (
              <TlsSequencingControl 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
                user={user}               
                onLogout={handleLogout}   
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* --- NEW PRODUCTION ORDERS ROUTE --- */}
        <Route 
          path="/production-orders"
          element={
            isAuthenticated ? (
              <ProductionOrders 
                darkMode={darkMode} 
                user={user}               
                onLogout={handleLogout}   
              />
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