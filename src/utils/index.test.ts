import { describe, expect, it } from "vitest";
import { truncateCharsFrom } from ".";

describe("truncateCharsFrom", () => {
  it("truncate chars", () => {
    const from = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const to = "aaaaaaaaaa";
    expect(truncateCharsFrom(from)).toMatchObject(to);
  });
});
