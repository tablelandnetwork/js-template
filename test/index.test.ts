import assert from "assert";
import { describe, test } from "mocha";
import { getAccounts } from "@tableland/local";
import { Wallet, providers, Signer } from "ethers";
import { connect } from "@tableland/sdk";

describe("index", function () {
  let signer: Signer;
  this.beforeAll(async function () {
    const [account] = getAccounts();
    const privateKey = account.privateKey.slice(2);
    const wallet = new Wallet(privateKey);
    const provider = new providers.JsonRpcProvider(); // Defaults to localhost
    signer = wallet.connect(provider);
  });
  test("update", async function () {
    const sdk = connect({ signer, chain: "local-tableland" });
    const { hash } = await sdk.write("update healthbot_31337_1 set counter=1;");
    const txnReceipt = await sdk.receipt(hash);

    assert.strictEqual(txnReceipt?.chainId, 31337);
  });

  test("query", async function () {
    const sdk = connect({ signer, chain: "local-tableland" });
    const { rows } = await sdk.read("select * from healthbot_31337_1;");

    assert.deepStrictEqual(rows[0], [1]);
  });
});
