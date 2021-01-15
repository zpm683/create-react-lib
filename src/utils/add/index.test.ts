import { add } from ".";

describe("add unit test", () => {
  it("1+1", async () => {
    expect(add(1, 1)).toBe(2);
  });
});
