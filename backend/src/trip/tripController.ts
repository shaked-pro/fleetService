import type { Request, Response } from "express";

import { serviceGetTrips,serviceCreateTrip } from "./tripService.js";

type TripQuery = {
  vehicleId?: string;
  from?: string;
  to?: string;
  page?: string;
  pageSize?: string;
};

type CreateTripRequest = {
  vehicleId: string;
  startTime: string;
  endTime: string;
  distance: number;
  energyUsed: number;
};

export async function createTrip(req: Request<{}, {}, CreateTripRequest>,res: Response) {
  const {
    vehicleId,
    startTime,
    endTime,
    distance,
    energyUsed,
  } = req.body;

  if (
    !vehicleId ||
    !startTime ||
    !endTime ||
    distance == null ||
    energyUsed == null
  ) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  if (new Date(endTime) <= new Date(startTime)) {
    return res.status(400).json({
      error: "endTime must be after startTime",
    });
  }

  try {
    const trip = await serviceCreateTrip(
      vehicleId,
      new Date(startTime),
      new Date(endTime),
      distance,
      energyUsed
    );

    return res.status(201).json(trip);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create trip",
    });
  }
}

export async function getTrips(req: Request<{}, {}, {}, TripQuery>,res: Response) {
  const {
    vehicleId,
    from,
    to,
    page,
    pageSize,
  } = req.query;

  try {
    const result = await serviceGetTrips({
      vehicleId,
      from,
      to,
      page: Number(page ?? 1),
      pageSize: Number(pageSize ?? 20),
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to retrieve trips",
    });
  }
}