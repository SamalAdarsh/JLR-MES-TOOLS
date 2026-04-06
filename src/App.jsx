import React, { useState } from 'react';
import SidebarNavigation from './components/SidebarNavigation';
import Header from './components/Header';
import WorkflowTab from './components/WorkflowTab';
import QueryManagerTab from './components/QueryManagerTab';
import UtilityModal from './components/UtilityModal';
import { INITIAL_QUERIES } from './utils/constants';
import { mockBackendService, mockWebsiteService } from './utils/api';

const App = () => {
  const [activeTab, setActiveTab] = useState('workflow'); 
  const [startTls, setStartTls] = useState('');
  const [endTls, setEndTls] = useState('');
  const [queries, setQueries] = useState(INITIAL_QUERIES);
  const [darkMode, setDarkMode] = useState(false);
  
  // Workflow State
  const [workflowStarted, setWorkflowStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Comparison State
  const [websiteData, setWebsiteData] = useState(null);
  const [isFetchingWeb, setIsFetchingWeb] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);

  // Utility State for Duplicates Check
  const [utilityResult, setUtilityResult] = useState(null);
  const [isUtilityModalOpen, setIsUtilityModalOpen] = useState(false);

  const theme = {
    bg: darkMode 
      ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950' 
      : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50',
    text: darkMode ? 'text-slate-100' : 'text-slate-800',
    card: darkMode 
      ? 'bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl shadow-black/20' 
      : 'bg-white/80 backdrop-blur-sm border-white shadow-xl shadow-indigo-100/50',
    cardHeader: darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/80 border-slate-100',
    input: darkMode 
      ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-600 focus:border-blue-500' 
      : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-100',
    subText: darkMode ? 'text-slate-400' : 'text-slate-500',
    tableHeader: darkMode ? 'text-slate-500 border-slate-700' : 'text-slate-400 border-slate-100',
    tableRow: darkMode ? 'border-slate-800' : 'border-slate-100',
    codeBlock: darkMode ? 'bg-black/30 border-slate-800 text-green-400' : 'bg-slate-50 border-slate-200 text-slate-700',
    navItemActive: 'bg-blue-600 text-white shadow-lg shadow-blue-900/20',
    navItemInactive: darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-white hover:text-indigo-600',
  };

  const handleRunQuery = async (queryIndex) => {
    const query = queries[queryIndex];
    setLoading(true);
    
    try {
      const result = await mockBackendService.executeQuery(query.id, { start: startTls, end: endTls }, query.sql);
      
      if (query.id === 'duplicates') {
        setUtilityResult({
           query: query.name,
           result: result,
           timestamp: new Date().toLocaleTimeString(),
           hasDuplicates: result.length > 0,
           startTls,
           endTls
        });
        setIsUtilityModalOpen(true);
      } else {
        setStepData(prev => ({
          ...prev,
          [query.id]: {
            result: result,
            timestamp: new Date().toLocaleTimeString(),
            status: 'executed'
          }
        }));

        if (query.id !== 'obom') {
          const isEmpty = result.length === 0;
          if (isEmpty) {
             if(currentStep === queryIndex + 1) setCurrentStep(currentStep + 1);
          }
        }
      }
    } catch (error) {
      console.error("Query failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchWebsiteData = async () => {
    setIsFetchingWeb(true);
    try {
      const data = await mockWebsiteService.fetchData({ start: startTls, end: endTls });
      setWebsiteData(data);
    } catch (e) {
      console.error("Web fetch failed");
    } finally {
      setIsFetchingWeb(false);
    }
  };

  const handleCompare = () => {
    const sqlData = stepData['obom']?.result || [];
    const webData = websiteData || [];
    const mismatches = [];
    
    sqlData.forEach(sqlItem => {
      const webItem = webData.find(w => w.tls_id === sqlItem.tls_id);
      if (!webItem) {
        mismatches.push({ part: sqlItem.tls_id, issue: 'Missing in Website Data' });
      } else if (webItem.part_count !== sqlItem.part_count) {
        mismatches.push({ part: sqlItem.tls_id, issue: `Count Mismatch (SQL: ${sqlItem.part_count}, Web: ${webItem.part_count})` });
      }
    });

    if (mismatches.length === 0 && webData.length === sqlData.length) {
      setComparisonResult({ status: 'MATCH', message: 'All TLS Counts match perfectly.' });
      setCurrentStep(1); 
    } else {
      setComparisonResult({ status: 'ERROR', message: 'Discrepancies found.', details: mismatches });
    }
  };

  const updateQuerySql = (id, newSql) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, sql: newSql } : q));
  };

  const handleEnterBatch = () => {
    if (startTls && endTls) {
      setStepData({});
      setWebsiteData(null);
      setComparisonResult(null);
      setCurrentStep(0);
      setWorkflowStarted(true);
      
      // Automatically trigger the first OBOM query
      handleRunQuery(0); 
    }
  };

  const resetWorkflow = () => {
    setStartTls('');
    setEndTls('');
    setCurrentStep(0);
    setStepData({});
    setWebsiteData(null);
    setComparisonResult(null);
    setUtilityResult(null);
    setIsUtilityModalOpen(false);
    setWorkflowStarted(false);
  };

  const getBatchCount = () => {
    if(!startTls || !endTls) return 0;
    const s = parseInt(startTls);
    const e = parseInt(endTls);
    if(isNaN(s) || isNaN(e)) return 0;
    return e - s + 1;
  }

  return (
    <div className={`min-h-screen font-sans flex transition-colors duration-300 ${theme.bg} ${theme.text}`}>
      <SidebarNavigation 
        activeTab={activeTab} setActiveTab={setActiveTab} 
        handleRunQuery={handleRunQuery} startTls={startTls} endTls={endTls} 
        loading={loading} theme={theme} darkMode={darkMode} 
        utilityResult={utilityResult} setIsUtilityModalOpen={setIsUtilityModalOpen} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} theme={theme} />

        <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {activeTab === 'workflow' ? (
            <WorkflowTab 
              startTls={startTls} setStartTls={setStartTls} endTls={endTls} setEndTls={setEndTls}
              workflowStarted={workflowStarted} handleEnterBatch={handleEnterBatch}
              getBatchCount={getBatchCount} resetWorkflow={resetWorkflow} stepData={stepData}
              loading={loading} handleRunQuery={handleRunQuery} websiteData={websiteData}
              isFetchingWeb={isFetchingWeb} handleFetchWebsiteData={handleFetchWebsiteData}
              comparisonResult={comparisonResult} handleCompare={handleCompare}
              currentStep={currentStep} queries={queries} darkMode={darkMode} theme={theme}
            />
          ) : (
            <QueryManagerTab 
              queries={queries} updateQuerySql={updateQuerySql} 
              theme={theme} darkMode={darkMode} 
            />
          )}
        </div>
        
        <UtilityModal 
            isOpen={isUtilityModalOpen} onClose={() => setIsUtilityModalOpen(false)}
            result={utilityResult} darkMode={darkMode} theme={theme}
        />
      </main>
    </div>
  );
};

export default App;