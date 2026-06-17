// src/trip/tripService.ts

import { randomUUID } from "crypto";

import {
  and,
  eq,
  gte,
  lte,
  count,
} from "drizzle-orm";

import { db } from "../db/client.js";
import { trips, vehicles } from "../db/schema.js";

type GetTripsParams = {
  vehicleId?: string| undefined;
  from?: string| undefined;
  to?: string| undefined;
  page?: number;
  pageSize?: number;
};

export async function serviceCreateTrip(
  vehicleId: string,
  startTime: Date,
  endTime: Date,
  distance: number,
  energyUsed: number
) {
  const vehicle = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, vehicleId));

  if (vehicle.length === 0) {
    throw new Error("VEHICLE_NOT_FOUND");
  }

  const trip = {
    id: randomUUID(),
    vehicleId,
    startTime,
    endTime,
    distance: distance.toString(),
    energyUsed: energyUsed.toString(),
  };

  await db.insert(trips).values(trip);

  return trip;
}

export async function serviceGetTrips({
  vehicleId,
  from,
  to,
  page = 1,
  pageSize = 20,
}: GetTripsParams) {
  const conditions = [];

  if (vehicleId) {
    conditions.push(eq(trips.vehicleId, vehicleId));
  }

  if (from) {
    conditions.push(
      gte(trips.startTime, new Date(from))
    );
  }

  if (to) {
    conditions.push(
      lte(trips.startTime, new Date(to))
    );
  }

  const whereClause =  //building this condition dynamically according to the user selection of filtering
    conditions.length > 0
      ? and(...conditions)
      : undefined;

  const offset = (page - 1) * pageSize;

  const items = await db
    .select()
    .from(trips)
    .where(whereClause)
    .limit(pageSize)
    .offset(offset);

  const totalResult = await db
    .select({ count: count() })
    .from(trips)
    .where(whereClause);

  return {
    items,
    page,
    pageSize,
    total: totalResult[0]?.count??0,
  };
}