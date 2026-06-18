// src/vehicle/vehicleService.ts

import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "../db/client.js";
import { vehicles, trips } from "../db/schema.js";

export async function serviceCreateVehicle(
  name: string,
  type: string
) {
  const vehicle = {
    id: randomUUID(),
    name,
    type,
  };

  await db.insert(vehicles).values(vehicle);

  return vehicle;
}

export async function serviceGetVehicles() {
  return db.select().from(vehicles);
}

export function calculateVehicleSummary(
  vehicleTrips: {
    distance: string;
    startTime: Date;
    endTime: Date;
  }[]
) {
  const tripCount = vehicleTrips.length;

  const totalDistance = vehicleTrips.reduce(
    (sum, trip) => sum + Number(trip.distance),
    0
  );

  const totalDurationMinutes =
    vehicleTrips.reduce((sum, trip) => {
      const duration =
        (trip.endTime.getTime() -
          trip.startTime.getTime()) /
        (1000 * 60);

      return sum + duration;
    }, 0);

  const averageTripDurationMinutes =
    tripCount === 0
      ? 0
      : totalDurationMinutes /
        tripCount;

  return {
    tripCount,
    totalDistance,
    averageTripDurationMinutes,
  };
}

export async function serviceGetVehicleSummary(
  vehicleId: string
) {
  const vehicle = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));

  if (vehicle.length === 0) {
    return null;
  }

  const vehicleTrips = await db
    .select()
    .from(trips)
    .where(eq(trips.vehicleId, vehicleId));

  const summary =
    calculateVehicleSummary(vehicleTrips);

  return {
    vehicleId,
    ...summary,
  };
}
