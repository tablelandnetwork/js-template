import { after, before } from "mocha";
import { LocalTableland } from "@tableland/local";

const lt = new LocalTableland({ silent: true });

before(async function () {
  this.timeout(15000);
  await lt.start();
  await lt.isReady();
});

after(async function () {
  await lt.shutdown();
});
