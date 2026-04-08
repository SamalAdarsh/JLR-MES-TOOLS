import React, { useState } from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

// Imports from the same folder
import RangeInputHeader from './RangeInputHeader';
import ObomValidationStep from './ObomValidationStep';
import VerificationStep from './VerificationStep';
import SequenceCompletionStep from './SequenceCompletionStep';

const WorkflowTab = (props) => {
  const { startTls, queries, darkMode, stepData } = props; 

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSequencing, setIsSequencing] = useState(false);

  const handleFinalSequence = () => {
    setIsSequencing(true);
    setTimeout(() => {
      console.log(`Sequencing batch ${startTls} to database...`);
      setIsSequencing(false);
      setShowConfirmModal(false);
    }, 1500);
  };

  const renderStatusBadge = (data, expectedEmpty) => {
    if (!data) return <span className={`${darkMode ? 'text-slate-500' : 'text-gray-400'} text-sm font-medium`}>Not Run</span>;
    const isEmpty = data.result.length === 0;
    
    if (expectedEmpty) {
      return isEmpty 
        ? <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-green-200"><CheckCircle size={14}/> PASSED</span>
        : <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm border border-red-200"><AlertTriangle size={14}/> FAILED</span>;
    } else {
      return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold shadow-sm border border-blue-200">Data Loaded</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto relative">
      
      <RangeInputHeader {...props} />

      <ObomValidationStep {...props} renderStatusBadge={renderStatusBadge} />

      <div className="space-y-6">
          {[queries[1], queries[2], queries[3]].map((query, index) => (
             <VerificationStep 
                key={query.id} 
                query={query} 
                index={index} 
                {...props} 
                renderStatusBadge={renderStatusBadge} 
             />
          ))}
      </div>

      <SequenceCompletionStep 
         {...props}
         showConfirmModal={showConfirmModal}
         setShowConfirmModal={setShowConfirmModal}
         isSequencing={isSequencing}
         handleFinalSequence={handleFinalSequence}
      />

    </div>
  );
};

export default WorkflowTab;