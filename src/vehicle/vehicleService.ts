// vehicle.service.ts

import { db } from "../db/client.js";
import { vehicles } from "../db/schema.js";

export async function serviceGetVehicles() {
  return db.select().from(vehicles);
}