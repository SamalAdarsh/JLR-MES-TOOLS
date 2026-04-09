import { useState } from 'react';
import { INITIAL_QUERIES } from '../utils/constants';
import { mockBackendService, mockWebsiteService } from '../utils/api';

export const useWorkflowLogic = () => {
  const [startTls, setStartTls] = useState('');
  const [endTls, setEndTls] = useState('');
  const [queries, setQueries] = useState(INITIAL_QUERIES);
  
  const [workflowStarted, setWorkflowStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepData, setStepData] = useState({});
  const [loading, setLoading] = useState(false);
  
  const [websiteData, setWebsiteData] = useState(null);
  const [isFetchingWeb, setIsFetchingWeb] = useState(false);
  const [comparisonResult, setComparisonResult] = useState(null);

  const [utilityResult, setUtilityResult] = useState(null);
  const [isUtilityModalOpen, setIsUtilityModalOpen] = useState(false);

  const handleRunQuery = async (queryIndex) => {
    const query = queries[queryIndex];
    setLoading(true);
    
    try {
      const result = await mockBackendService.executeQuery(query.id, { start: startTls, end: endTls }, query.sql);
      
      if (query.id === 'duplicates') {
        setUtilityResult({
           query: query.name, result, timestamp: new Date().toLocaleTimeString(),
           hasDuplicates: result.length > 0, startTls, endTls
        });
        setIsUtilityModalOpen(true);
      } else {
        setStepData(prev => ({
          ...prev,
          [query.id]: { result, timestamp: new Date().toLocaleTimeString(), status: 'executed' }
        }));

        if (query.id !== 'obom' && result.length === 0) {
          if(currentStep === queryIndex + 1) setCurrentStep(currentStep + 1);
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
      console.error("Web fetch failed: ",e);
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
      if (!webItem) mismatches.push({ part: sqlItem.tls_id, issue: 'Missing in Website Data' });
      else if (webItem.part_count !== sqlItem.part_count) {
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

  const updateQuerySql = (id, newSql) => setQueries(prev => prev.map(q => q.id === id ? { ...q, sql: newSql } : q));

  const handleEnterBatch = () => {
    if (startTls && endTls) {
      setStepData({}); setWebsiteData(null); setComparisonResult(null);
      setCurrentStep(0); setWorkflowStarted(true); handleRunQuery(0); 
    }
  };

  const resetWorkflow = () => {
    setStartTls(''); setEndTls(''); setCurrentStep(0); setStepData({});
    setWebsiteData(null); setComparisonResult(null); setUtilityResult(null);
    setIsUtilityModalOpen(false); setWorkflowStarted(false);
  };

  const getBatchCount = () => {
    if(!startTls || !endTls) return 0;
    const s = parseInt(startTls); const e = parseInt(endTls);
    return (isNaN(s) || isNaN(e)) ? 0 : e - s + 1;
  };

  return {
    startTls, setStartTls, endTls, setEndTls, queries, workflowStarted, currentStep,
    stepData, loading, websiteData, isFetchingWeb, comparisonResult, utilityResult,
    isUtilityModalOpen, setIsUtilityModalOpen, handleRunQuery, handleFetchWebsiteData,
    handleCompare, updateQuerySql, handleEnterBatch, resetWorkflow, getBatchCount
  };
};