import {serviceGetVehicles} from "./vehicleService.js"

export async function getVehicles(req, res) {
  const vehicles = await serviceGetVehicles();

  res.json(vehicles);
}