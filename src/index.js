import { Database } from "@tableland/sdk";

export async function hello(signer) {
  // Create a database connection
  const db = new Database({ signer });

  // Create a table
  const tablePrefix = "starter_table";
  const createStmt = `CREATE TABLE ${tablePrefix} (id integer primary key, val text)`;
  const { meta: create } = await db.prepare(createStmt).run();
  const tableName = create.txn?.name;
  await create.txn?.wait();

  // Write to the table
  const writeStmt = `INSERT INTO ${tableName} (id, val) VALUES (?, ?)`;
  const { meta: write } = await db.prepare(writeStmt).bind(1, "world").run();
  await write.txn?.wait();

  // Read from the table
  const readStmt = `SELECT val FROM ${tableName}`;
  const { results } = await db.prepare(readStmt).all();
  return results[0].val;
}
