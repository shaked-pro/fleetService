//helper util file containing formated types for responses for the frontend side

export interface Vehicle {
  id: string;
  name: string;
  type: string;
}

export interface Trip {
  id: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  distance: string;
  energyUsed: string;
}

export interface VehicleSummaryFields {
  vehicleId: string;
  tripCount: number;
  totalDistance: number;
  averageTripDurationMinutes: number;
}