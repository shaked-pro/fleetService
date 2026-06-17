export interface Trip {
  id: string;
  vehicleId: string; // Foreign key -> Vehicle.id
  startTime: Date;
  endTime: Date;
  distance: number; // Distance covered (e.g. kilometers)
  energyUsed: number; // Fuel or energy consumed
}