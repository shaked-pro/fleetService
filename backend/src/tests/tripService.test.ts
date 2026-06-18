import { describe, it, expect } from "vitest";

import { calculateOffset , validateTrip } from "../trip/tripService.js";

describe("pagination", () => {
  it("calculates page 1 offset", () => {
    expect(
      calculateOffset(1, 10)
    ).toBe(0);
  });

  it("calculates page 2 offset", () => {
    expect(
      calculateOffset(2, 10)
    ).toBe(10);
  });

  it("calculates page 3 offset", () => {
    expect(
      calculateOffset(3, 10)
    ).toBe(20);
  });
});
describe("trip validation", () => {
  it("rejects end time before start time", () => {
    expect(() =>
      validateTrip(
        new Date("2026-01-01T10:00:00"),
        new Date("2026-01-01T09:00:00"),
        100,
        10
      )
    ).toThrow();
  });

  it("rejects negative distance", () => {
    expect(() =>
      validateTrip(
        new Date("2026-01-01T09:00:00"),
        new Date("2026-01-01T10:00:00"),
        -100,
        10
      )
    ).toThrow();
  });

  it("rejects negative energy usage", () => {
    expect(() =>
      validateTrip(
        new Date("2026-01-01T09:00:00"),
        new Date("2026-01-01T10:00:00"),
        100,
        -10
      )
    ).toThrow();
  });
});