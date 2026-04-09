import React, { useState } from 'react';
import TlsHeader from './TlsHeader';
import TlsStatusOverview from './TlsStatusOverview';
import TlsQuantitiesPanel from './TlsQuantitiesPanel';
import TlsConfigPanel from './TlsConfigPanel';
import TlsFooter from './TlsFooter';
import TlsEnableModal from './TlsEnableModal';

const TlsSequencingControl = ({ darkMode, setDarkMode, user, onLogout }) => {
  const [isAutoSequenceEnabled, setIsAutoSequenceEnabled] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);
  
  const [metrics, setMetrics] = useState({
    tlsMinQty: 109,
    ordersMinQty: 105,
    ordersInTnf: 35,
    ordersInTls: 109,
    lastGenerated: '00519917'
  });

  const handleToggleClick = () => {
    if (!isAutoSequenceEnabled) {
      setShowEnableModal(true);
    } else {
      setIsAutoSequenceEnabled(false);
    }
  };

  const handleConfirmEnable = () => {
    setIsEnabling(true);
    setTimeout(() => {
      setIsAutoSequenceEnabled(true);
      setIsEnabling(false);
      setShowEnableModal(false);
    }, 1200);
  };

  const handleMetricChange = (key, value) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`h-screen w-full overflow-hidden transition-colors duration-300 flex flex-col ${darkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      
      <TlsHeader 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        user={user} 
        onLogout={onLogout} 
      />

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 lg:p-6 flex flex-col justify-center gap-4 lg:gap-6 overflow-y-auto">
        <TlsStatusOverview 
          darkMode={darkMode}
          isAutoSequenceEnabled={isAutoSequenceEnabled}
          onToggleClick={handleToggleClick}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 shrink-0">
          <TlsQuantitiesPanel 
            darkMode={darkMode}
            metrics={metrics}
            onMetricChange={handleMetricChange}
          />
          <TlsConfigPanel darkMode={darkMode} />
        </div>
      </main>

      <TlsFooter 
        darkMode={darkMode} 
        isAutoSequenceEnabled={isAutoSequenceEnabled} 
      />

      <TlsEnableModal 
        darkMode={darkMode}
        isOpen={showEnableModal}
        onClose={() => setShowEnableModal(false)}
        onConfirm={handleConfirmEnable}
        isEnabling={isEnabling}
      />

      <style dangerouslySetInnerHTML={{__html: `
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        .hide-arrows { -moz-appearance: textfield; }
      `}} />
    </div>
  );
};

export default TlsSequencingControl;