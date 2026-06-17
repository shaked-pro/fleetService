export enum VehicleType {
  CAR = "CAR",
  TRUCK = "TRUCK",
  VAN = "VAN",
  MOTORCYCLE = "MOTORCYCLE",
  ELECTRIC = "ELECTRIC",
}

export interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
}