/* sql.js is generated third-party code copied by scripts/sync-sql-runtime.mjs. */
importScripts('/sql-wasm.js');

const runtimePromise = initSqlJs({ locateFile: () => '/sql-wasm.wasm' });

self.onmessage = async (event) => {
  const { id, source, seed, maxRows } = event.data ?? {};
  let database;

  try {
    if (!Number.isInteger(id) || typeof source !== 'string' || typeof seed !== 'string') {
      throw new Error('Invalid SQL worker request.');
    }

    const rowLimit = Math.max(1, Math.min(Number(maxRows) || 100, 500));
    const SQL = await runtimePromise;
    database = new SQL.Database();
    database.run(seed);

    const results = [];
    let statementsExecuted = 0;
    let rowsModified = 0;

    for (const statement of database.iterateStatements(source)) {
      statementsExecuted += 1;
      const columns = statement.getColumnNames();

      if (columns.length === 0) {
        statement.step();
        rowsModified = database.getRowsModified();
        continue;
      }

      const values = [];
      while (values.length <= rowLimit && statement.step()) {
        values.push(statement.get());
      }
      const truncated = values.length > rowLimit;
      if (truncated) values.length = rowLimit;
      results.push({ columns, values, truncated });
    }

    self.postMessage({ id, ok: true, results, statementsExecuted, rowsModified });
  } catch (error) {
    self.postMessage({
      id: Number.isInteger(id) ? id : -1,
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    database?.close();
  }
};
