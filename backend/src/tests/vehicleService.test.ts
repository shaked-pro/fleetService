import {describe,it,expect,} from "vitest";

import {
  calculateVehicleSummary,
} from "../vehicle/vehicleService.js";

describe("vehicle summary", () => {
  it("returns zero values for no trips", () => {
    const result =
      calculateVehicleSummary([]);

    expect(
      result.tripCount
    ).toBe(0);

    expect(
      result.totalDistance
    ).toBe(0);

    expect(
      result.averageTripDurationMinutes
    ).toBe(0);
  });

  it("calculates summary for one trip", () => {
    const result =
      calculateVehicleSummary([
        {
          distance: "100",
          startTime: new Date(
            "2026-01-01T10:00:00"
          ),
          endTime: new Date(
            "2026-01-01T11:00:00"
          ),
        },
      ]);

    expect(
      result.tripCount
    ).toBe(1);

    expect(
      result.totalDistance
    ).toBe(100);

    expect(
      result.averageTripDurationMinutes
    ).toBe(60);
  });

  it("calculates summary for multiple trips", () => {
    const result =
      calculateVehicleSummary([
        {
          distance: "100",
          startTime: new Date(
            "2026-01-01T10:00:00"
          ),
          endTime: new Date(
            "2026-01-01T11:00:00"
          ),
        },
        {
          distance: "200",
          startTime: new Date(
            "2026-01-01T12:00:00"
          ),
          endTime: new Date(
            "2026-01-01T14:00:00"
          ),
        },
      ]);

    expect(
      result.tripCount
    ).toBe(2);

    expect(
      result.totalDistance
    ).toBe(300);

    expect(
      result.averageTripDurationMinutes
    ).toBe(90);
  });
});