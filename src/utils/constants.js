export const INITIAL_QUERIES = [
  {
    id: 'obom',
    name: '1. Fetch OBOM Data',
    sql: "SELECT tls_id, COUNT(part_id) as part_count FROM BOM_TABLE WHERE tls_id BETWEEN @startTls AND @endTls GROUP BY tls_id;",
    description: "Retrieves the Total Part Count per TLS ID for the given range.",
    expectedResult: "TLS List & Counts"
  },
  {
    id: 'subassembly',
    name: '2. Check Previous Sub-Assembly',
    sql: "SELECT batch_id, status FROM SUB_ASSEMBLY_LOG WHERE status != 'COMPLETED' AND batch_order < (SELECT batch_order FROM BATCHES WHERE tls_id = @startTls);",
    description: "Ensures the previous batch is fully completed before starting this one.",
    expectedResult: "Empty Set"
  },
  {
    id: 'missing',
    name: '3. Check is AG Processing done',
    sql: "SELECT part_id FROM COMPONENT_TRACKING WHERE tls_id BETWEEN @startTls AND @endTls AND scan_status = 'MISSING';",
    description: "Verifies that all physical parts have been scanned/accounted for.",
    expectedResult: "Empty Set"
  },
  {
    id: 'ag_processing',
    name: '4. Verify there are no missing Sub Assembly',
    sql: "SELECT process_id FROM AG_QUEUE WHERE status = 'PROCESSING';",
    description: "Checks if the Automated Guide processing queue is clear.",
    expectedResult: "Empty Set"
  },
  {
    id: 'duplicates',
    name: '5. Check Duplicates (Utility)',
    sql: "SELECT serial_no, COUNT(*) FROM TLS_LOGS WHERE batch_id BETWEEN @startTls AND @endTls GROUP BY serial_no HAVING COUNT(*) > 1;",
    description: "Optional check to ensure no serial number duplications exist.",
    expectedResult: "Empty Set"
  }
];