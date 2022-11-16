import assert from "assert";
import { describe, test } from "mocha";

import { hello } from "../src/index.js";

describe("index", function () {
  test("hello", async function () {
    assert.strictEqual(await hello(), "world");
  });
});
