import { strictEqual, notEqual, deepStrictEqual } from "assert";
import { describe, test } from "mocha";
import { getAccounts, getDatabase, getValidator } from "@tableland/local";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
describe("index", function () {
  // Note that we're using the second account here
  const [, signer] = getAccounts();
  const db = getDatabase(signer);
  const validator = getValidator();

  test("create", async function () {
    const { meta } = await db
      .prepare("CREATE TABLE my_table (counter integer);")
      .run();
    strictEqual(meta.txn?.name, "my_table_31337_2");
  });

  test("insert", async function () {
    const { meta } = await db
      .prepare("insert into my_table_31337_2 values (1);")
      .run();

    notEqual(meta.txn, null);
    notEqual(meta.txn, undefined);

    strictEqual(typeof meta.txn.transactionHash, "string");
    strictEqual(typeof meta.txn.chainId, "number");

    const txnReceipt = await validator.receiptByTransactionHash({
      transactionHash: meta.txn.transactionHash,
      chainId: meta.txn.chainId,
    });
    strictEqual(txnReceipt?.chainId, 31337);
  });

  test("update", async function () {
    const { meta } = await db
      .prepare("update my_table_31337_2 set counter=2;")
      .run();

    strictEqual(typeof meta.txn?.transactionHash, "string");
    strictEqual(typeof meta.txn?.chainId, "number");

    const txnReceipt = await validator.receiptByTransactionHash({
      transactionHash: meta.txn!.transactionHash,
      chainId: meta.txn!.chainId,
    });
    strictEqual(txnReceipt?.chainId, 31337);
  });

  test("query", async function () {
    const { results } = await db
      .prepare("select * from my_table_31337_2;")
      .all();
    deepStrictEqual(results, [{ counter: 2 }]);
  });
});
