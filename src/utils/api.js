export const mockBackendService = {
  executeQuery: async (queryId, range) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { start, end } = range;
        const startNum = parseInt(start) || 50100101;
        const endNum = parseInt(end) || startNum + 4;
        const count = endNum - startNum + 1;

        switch (queryId) {
          case 'obom': { 
            const sqlResults = [];
            for (let i = 0; i < count; i++) {
              const currentId = startNum + i;
              sqlResults.push({ 
                tls_id: currentId.toString(), 
                part_count: 2000 + (i * 15)
              });
            }
            resolve(sqlResults);
            break;
          }
          
          case 'subassembly': { 
            const isReady = Math.random() > 0.3; 
            resolve(isReady ? [] : [{ batch_id: `PREV-${startNum - 1}`, status: 'IN_PROGRESS' }]);
            break;
          } 
          
          case 'missing':
            resolve([]); 
            break;
            
          case 'ag_processing':
            resolve([]); 
            break;
            
          case 'duplicates': { 
            const hasDuplicates = Math.random() < 0.2; 
            if (hasDuplicates) {
                resolve([
                    { serial_no: 'SN1234567890', count: 2 },
                    { serial_no: 'SN0987654321', count: 3 }
                ]);
            } else {
                resolve([]); 
            }
            break;
          } 
          
          default:
            resolve([]);
        }
      }, 800); 
    });
  }
};

export const mockWebsiteService = {
  fetchData: async (range) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const { start, end } = range;
        const startNum = parseInt(start) || 50100101;
        const endNum = parseInt(end) || startNum + 4;
        const count = endNum - startNum + 1;

        const webResults = [];
        for (let i = 0; i < count; i++) {
          const currentId = startNum + i;
          webResults.push({ 
            tls_id: currentId.toString(), 
            part_count: 2000 + (i * 15) 
          });
        }
        resolve(webResults);
      }, 1500);
    });
  }
};