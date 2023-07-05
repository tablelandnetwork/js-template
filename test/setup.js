import { after, before } from "mocha";
import { LocalTableland } from "@tableland/local";

// Set up a Local Tableland instance
const lt = new LocalTableland({ silent: true });

// Set up before and after hooks to start and stop the instance
before(async function () {
  this.timeout(15000);
  await lt.start();
});

after(async function () {
  await lt.shutdown();
});
