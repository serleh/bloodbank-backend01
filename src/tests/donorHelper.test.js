import test, { describe } from "node:test";
import assert from "node:assert";
import { dummy, totalDonors } from "../utils/donorHelper.js";

test("dummy returns 1", () => {
  const donor = [];
  const result = dummy(donor);
  assert.strictEqual(result, 1);
});

describe("total donors", () => {
  test("of an empty list", () => {
    const donors = [];
    const result = totalDonors(donors);
    assert.strictEqual(result, 0);
  });

  test("when we have 3 donors", () => {
    const donors = [{ name: "Amina" }, { name: "Ali" }, { name: "Saleh" }];
    const result = totalDonors(donors);
    assert.strictEqual(result, 3);
  });
});
