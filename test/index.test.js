import assert, { strictEqual } from "assert";
import { describe, test } from "mocha";
import { getDefaultProvider } from "ethers";
import { getAccounts } from "@tableland/local";
import { hello } from "../src/index.js";

describe("hello", function () {
  // Set a timeout for spinning up the Local Tableland instance during setup
  this.timeout(10000);

  // Retrieve accounts from Local Tableland & create a signer
  const accounts = getAccounts();
  const wallet = accounts[1]; // Note that we're using the second account here
  const provider = getDefaultProvider("http://127.0.0.1:8545");
  const signer = wallet.connect(provider);

  // Run your tests, such as passing the signer to `hello()`
  test("should return 'world'", async function () {
    const data = await hello(signer);
    assert(data != null);
    strictEqual(data, "world");
  });
});
